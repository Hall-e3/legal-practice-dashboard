"use client";

import { checkAuth, login, logout } from "@/redux/features/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { LoginModel } from "@/types";
import { useRouter } from "next/navigation";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useAuth() {
  const navigation = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.auth);

  const authenticate = useCallback(
    (values: LoginModel) => {
      dispatch(login(values));
    },
    [dispatch]
  );

  const signOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const checkIsAuthenticated = useCallback(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return {
    ...state,
    navigation,
    signOut,
    authenticate,
    checkIsAuthenticated,
  };
}
