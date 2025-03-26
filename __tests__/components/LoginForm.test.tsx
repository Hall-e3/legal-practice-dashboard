import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import LoginForm from "@/components/auth/LoginForm";
import authReducer from "@/redux/features/authSlice";
import notificationReducer from "@/redux/features/notificationSlice";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
    };
  },
}));

const createTestStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      notification: notificationReducer,
    },
    preloadedState: {
      auth: {
        isLoading: false,
        isAuthenticated: false,
        userInfo: null,
        role: null,
      },
      notification: {
        message: "",
        type: "",
        isVisible: false,
        component: "",
        error: "",
      },
    },
  });

describe("LoginForm Component", () => {
  it("renders login form", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const emailInput = screen.getByRole("textbox");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.getAttribute("name")).toBe("email");

    const passwordInput = screen
      .getByText("Password")
      .closest("div")
      ?.parentElement?.querySelector('input[type="password"]');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput?.getAttribute("type")).toBe("password");

    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  it("validates form inputs and shows error messages", async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    await waitFor(() => {
      const errorMessages = screen.getAllByText(/required/i);
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  it("submits the form with valid credentials", async () => {
    const store = createTestStore();
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const emailInput = screen.getByRole("textbox");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const passwordInput = screen
      .getByText("Password")
      .closest("div")
      ?.parentElement?.querySelector('input[type="password"]');
    if (passwordInput) {
      fireEvent.change(passwordInput, { target: { value: "password123" } });
    }

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    await waitFor(() => {
      const errorMessages = screen.queryAllByText(/required/i);
      expect(errorMessages.length).toBe(0);
    });
  });
});
