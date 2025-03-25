export type UserRoleModel = "admin" | "standard";

export interface UserModel {
  email: string;
  role: UserRoleModel;
  name: string;
}

export interface AuthState {
  role: string | null;
  userInfo: UserModel | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
export interface LoginModel {
  email: string;
  password: string;
}

export type errorType = Record<string, string>;
