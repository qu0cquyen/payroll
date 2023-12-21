"use client";

import { Button } from "#/components/ui/button";
import InputControl from "#/components/ui/input-control";
import {
  EyeNoneIcon,
  EyeOpenIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import useLoginState from "./use-login-state";
import { Form } from "#/components/ui/form";
import { useState } from "react";

const Login = () => {
  const { form, onSubmit } = useLoginState();

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className="text-center">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputControl
            control={form.control}
            name={"user_name"}
            placeholder="User name"
            prefix={
              <PersonIcon className="text-neutral-tints w-[20px] h-[20px]" />
            }
          />
          <InputControl
            control={form.control}
            type={isVisible ? "text" : "password"}
            name={"password"}
            placeholder="Password"
            prefix={
              <LockClosedIcon className="text-neutral-tints w-[20px] h-[20px]" />
            }
            suffix={
              !isVisible ? (
                <EyeNoneIcon
                  className="text-neutral-tints w-[20px] h-[20px]"
                  onClick={() => setIsVisible(true)}
                />
              ) : (
                <EyeOpenIcon
                  className="text-neutral-tints w-[20px] h-[20px]"
                  onClick={() => setIsVisible(false)}
                />
              )
            }
          />
          {errors && (
            <p className="mb-2 text-state-negative">{errors.root?.message}</p>
          )}
          <Button className="w-3/4" name="login" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
