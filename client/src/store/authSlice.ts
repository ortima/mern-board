import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthState, UserData } from "../@types/stateInterfaces";
import { showAlert } from "./alertSlice";

const loadUserDataFromLocalStorage = (): UserData | null => {
  const userDataString = localStorage.getItem("userData");
  if (userDataString) {
    return JSON.parse(userDataString);
  }
  return null;
};

const initialState: AuthState = {
  userData: loadUserDataFromLocalStorage(),
  loading: false,
  message: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    userData: { name: string; email: string; password: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await axios.post("/api/registration", userData);
      dispatch(
        showAlert({
          message: "User registered successfully!",
          severity: "success",
          open: true,
        }),
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      dispatch(
        showAlert({ message: errorMessage, severity: "error", open: true }),
      );
      return rejectWithValue(errorMessage);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    userData: { email: string; password: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await axios.post("/api/login", userData);
      const { token, userId, email, name } = response.data;
      localStorage.setItem(
        "userData",
        JSON.stringify({ token, userId, email, name }),
      );
      dispatch(login({ token, userId, email, name }));
      dispatch(
        showAlert({
          message: "User logged in successfully",
          severity: "success",
          open: true,
        }),
      );
      return { token, userId, email, name };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      dispatch(
        showAlert({ message: errorMessage, severity: "error", open: true }),
      );
      return rejectWithValue(errorMessage);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    localStorage.removeItem("userData");
    dispatch(logout());
    dispatch(
      showAlert({
        message: "User logged out successfully",
        severity: "success",
        open: true,
      }),
    );
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload as string;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as string;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload as string;
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.userData = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.message = "Error logging out: " + action.error.message;
    });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
