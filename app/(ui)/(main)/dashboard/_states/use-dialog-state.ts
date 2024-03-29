import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  addServiceRecord,
  getServiceRecords,
} from "../actions/service-records";
import { LocalStorage } from "#/utils/local-storage";
import useServiceRecordState from "./use-service-records-state";
import useCurrentUserInfoState from "#/hooks/use-current-user-info-state";
import { useState } from "react";

const schema = yup.object({
  customer_name: yup.string().required("Customer name is required"),
  service: yup.string().required("Service is required"),
  payment_type: yup.string(),
  amount: yup
    .number()
    .positive("Invalid number")
    .min(0)
    .typeError("Amount must be a number")
    .required("Amount is required"),
  tip: yup
    .number()
    .positive("Invalid number")
    .min(0)
    .typeError("Tip must be a number")
    .required("Tip is required"),
});

type CustomerRecord = yup.InferType<typeof schema>;

const useDialogState = () => {
  const { refetch } = useServiceRecordState();

  const { user } = useCurrentUserInfoState();

  const form = useForm<CustomerRecord>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      customer_name: "",
      service: "",
      payment_type: "Cash",
      amount: 0,
      tip: 0,
    },
  });

  const onSubmit: SubmitHandler<CustomerRecord> = async (formData) => {
    const token = LocalStorage.getAccessToken();

    try {
      await addServiceRecord({
        token: token,
        customerName: formData.customer_name,
        serviceName: formData.service,
        amount: formData.amount,
        tip: formData.tip,
        rate: user?.rate ?? 0,
        paymentMethodName: formData.payment_type ?? "Cash",
      });

      refetch();
    } catch (e) {
      form.setError("root", {
        type: "manual",
        message: JSON.stringify(e),
      });
    }
  };

  return { form, onSubmit };
};

export default useDialogState;
