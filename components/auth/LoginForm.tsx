"use client";

import React, { useEffect } from "react";
import { ButtonType, InputType, Screens } from "@/enums";
import useForm from "@/hooks/useForm";
import {
  EnvelopeIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useNotification } from "@/hooks/useNotification";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Form, TextInput, Button, Spinner } from "@/components";

export default function LoginForm() {
  const router = useRouter();
  const { error, component } = useNotification();
  const { isLoading, isAuthenticated, authenticate } = useAuth();

  const {
    handleInputChange,
    values,
    showPassword,
    errors,
    handleShowPassword,
    validateLogin,
  } = useForm(true);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateLogin()) {
      authenticate(values);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      {component === Screens.login && error && (
        <div className="p-3 ring-2 ring-red-200 bg-red-50 flex items-center space-x-3 rounded-md">
          <ExclamationCircleIcon className="w-6 h-6  text-red-300" />
          <p className="text-[13px] sm:text-[13.5px]">{error}</p>
        </div>
      )}
      <Form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center space-y-6 2xl:space-y-8 sm:space-y-8 sm:flex-1"
      >
        <TextInput
          label="Email"
          type={InputType.email}
          value={values.email}
          name="email"
          onChange={handleInputChange}
          iconLeft={<EnvelopeIcon className="w-5 h-5 ml-4" />}
          styles="ring rounded-md h-14"
          error={
            errors?.email ||
            (component === Screens.login &&
              error === "User is not registered." &&
              error)
          }
        />
        <TextInput
          label="Password"
          value={values.password}
          name="password"
          onChange={handleInputChange}
          type={showPassword ? InputType.text : InputType.password}
          iconRight={
            <div className="px-2 cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? (
                <EyeIcon className="w-5 h-5" />
              ) : (
                <EyeSlashIcon className="w-5 h-5" />
              )}
            </div>
          }
          error={
            errors?.password ||
            (component === Screens.login &&
              error === "Incorrect credentials." &&
              error)
          }
          styles="ring rounded-md h-14"
        />

        <Button
          type={ButtonType.submit}
          disabled={false}
          text={isLoading ? <Spinner styles="h-4 w-4 border-2" /> : "Login"}
          buttonStyle={`w-full shadow-lg drop-shadow-md animation-ripple h-14 text-white font-medium rounded-md text-[14px] text-white px-5 text-center bg-primary_color opacity-75 hover:opacity-65`}
        />
      </Form>
    </div>
  );
}
