"use client";
import React, { useState } from "react";
import { errorType, LoginModel } from "@/types/auth";

const initialLoginState: LoginModel = {
  email: "",
  password: "",
};

export default function useForm(validateOnChange = false) {
  const [errors, setErrors] = useState<errorType>({});
  const [values, setValues] = useState<LoginModel>(initialLoginState);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    if (validateOnChange) {
      if (name === "email") {
        validateInput(value);
      } else {
        validateLogin();
      }
    }
  };

  const validateInput = (value: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const temp: errorType = {};

    if (emailRegex.test(value)) {
      temp.email = "";
    } else {
      temp.email = "Invalid email";
    }

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const validateLogin = () => {
    const temp: errorType = {};
    temp.password = values.password
      ? values.password.length < 6
        ? "Password should contain at least 6 characters"
        : ""
      : "Password is required";
    temp.email = values.email ? "" : "Email is required";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleClearForm = () => {
    setValues(initialLoginState);
    setErrors({});
  };

  return {
    values,
    errors,
    setErrors,
    setValues,
    showPassword,
    validateLogin,
    handleClearForm,
    handleInputChange,
    handleShowPassword,
  };
}
