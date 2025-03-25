import { AuthState, LoginModel, UserModel, UserRoleModel } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { showAlert } from "./notificationSlice";
import { ResponseStatus, Screens } from "@/enums";

const initialState: AuthState = {
  role: null,
  userInfo: null,
  isAuthenticated: false,
  isLoading: false,
};

const USERS = {
  "admin@legaltech.com": {
    password: "admin123",
    role: "admin" as UserRoleModel,
    name: "Admin User",
  },
  "user@legaltech.com": {
    password: "user123",
    role: "standard" as UserRoleModel,
    name: "Standard User",
  },
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginModel, { rejectWithValue, dispatch }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const userInfo = USERS[credentials.email as keyof typeof USERS];

      if (!userInfo || userInfo.password !== credentials.password) {
        dispatch(
          showAlert({
            message: "Invalid email or password",
            type: ResponseStatus.error,
            component: Screens.login,
          })
        );
        return rejectWithValue("Invalid email or password");
      }
      const user: UserModel = {
        email: credentials.email,
        role: userInfo.role,
        name: userInfo.name,
      };
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      dispatch(
        showAlert({
          message: error,
          type: ResponseStatus.error,
          component: Screens.login,
        })
      );
      return rejectWithValue("Login failed. Please try again.");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem("user");
    dispatch(
      showAlert({
        message: "You have been logged out successfully",
        type: ResponseStatus.info,
        component: Screens.login,
      })
    );
    return true;
  }
);

export const checkAuth = createAsyncThunk("auth/check", async () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    return JSON.parse(storedUser) as UserModel;
  }
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserModel>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.userInfo = action.payload;
          state.isAuthenticated = true;
        }
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
