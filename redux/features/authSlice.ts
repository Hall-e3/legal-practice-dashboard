import { AuthState, LoginModel, UserModel, UserRoleModel } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  role: null,
  userInfo: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
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
  async (credentials: LoginModel, { rejectWithValue }) => {
    console.log(credentials);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const userInfo = USERS[credentials.email as keyof typeof USERS];

      if (!userInfo || userInfo.password !== credentials.password) {
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
      console.log(error);
      return rejectWithValue("Login failed. Please try again.");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
  return true;
});

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
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUserData: (state, { payload }) => {
      if (payload !== null) {
        state.userInfo = payload;
      }
    },
    setRole: (state, { payload }) => {
      state.role = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserModel>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
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

export const { clearError, setRole, setUserData } = authSlice.actions;
export default authSlice.reducer;
