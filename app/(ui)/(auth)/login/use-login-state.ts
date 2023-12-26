import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { userLogin } from "./actions/login";
import { LocalStorage } from "#/utils/local-storage";
import { useAuthContext } from "#/providers/authentication";
import { resetAllSlices } from "#/providers/reset-app-states";
import useCurrentUserInfoState from "#/hooks/use-current-user-info-state";
import { AppUser } from "#/models/user-model";

const schema = yup.object({
  user_name: yup.string().required("User name is required"),
  password: yup.string().required("Password is required"),
});

type LoginFormData = yup.InferType<typeof schema>;

const useLoginState = () => {
  const { updateAuthentication } = useAuthContext();
  const { updateCurrentUser } = useCurrentUserInfoState();

  const form = useForm<LoginFormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      user_name: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (formData) => {
    const user = await userLogin(formData.user_name, formData.password);

    if (user) {
      /// Save access token + Refresh token inside local storage
      LocalStorage.setAccessToken(user.accessToken);
      LocalStorage.setRefreshToken(user.refreshToken);

      const appUser: AppUser = {
        id: user.id,
        userName: user.user_name,
        rate: user.rate,
      };

      updateCurrentUser(appUser);

      updateAuthentication && updateAuthentication(appUser);

      return;
    }

    form.setError("root", {
      type: "manual",
      message: "Username or Password is invalid",
    });
    return;
  };

  const logOut = () => {
    LocalStorage.removeAccessToken();
    LocalStorage.removeRefreshToken();

    resetAllSlices();

    updateAuthentication && updateAuthentication(null);
  };

  return { form, onSubmit, logOut };
};

export default useLoginState;
