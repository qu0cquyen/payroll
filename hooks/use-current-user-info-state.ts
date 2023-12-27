import { AppUser } from "#/models/user-model";
import { sliceResetFns } from "#/providers/reset-app-states";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IUseCurrentUserInfoState {
  user: AppUser | null;
}

const defaultUseCurrentUserInfoState = {
  user: null,
};

const store = create(
  immer<IUseCurrentUserInfoState>(() => ({
    ...defaultUseCurrentUserInfoState,
  }))
);

const useCurrentUserInfoState = () => {
  sliceResetFns.add(() => {
    store.setState({ ...defaultUseCurrentUserInfoState });
  });

  const { user } = store();

  const updateCurrentUser = (currentUser: AppUser | null) => {
    store.setState({
      user: currentUser,
    });
  };

  return { user, updateCurrentUser };
};

export default useCurrentUserInfoState;
