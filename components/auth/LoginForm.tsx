"use client";

import React, { useEffect } from "react";
import { ButtonType, InputType, Screens } from "@/enums";
import useForm from "@/hooks/useForm";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useNotification } from "@/hooks/useNotification";
import useAuth from "@/hooks/useAuth";
import { Form, TextInput, Button, Spinner, Notification } from "@/components";

export default function LoginForm() {
  const { message, hideAlert, component } = useNotification();
  const { isLoading, isAuthenticated, authenticate, navigation } = useAuth();

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
      navigation.push("/dashboard");
    }
  }, [isAuthenticated, navigation]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateLogin()) {
      authenticate(values);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        hideAlert();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hideAlert, message]);

  return (
    <div className="flex flex-col space-y-6">
      <div>{component === Screens.login && message && <Notification />}</div>
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
          error={errors?.email}
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
          error={errors?.password}
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
