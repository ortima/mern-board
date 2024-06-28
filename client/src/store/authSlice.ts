import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthState, UserData } from "../@types/stateInterfaces";

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
  errorMessage: null,
  successMessage: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: { name: string; email: string; password: string }) => {
    const response = await axios.post("/api/registration", userData);
    return response.data;
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
      return { token, userId, email, name };
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An unexpected error occurred.");
      }
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    localStorage.removeItem("userData");
    dispatch(logout());
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
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    setSuccessMessage: (state, action: PayloadAction<string | null>) => {
      state.successMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state) => {
      state.successMessage = "User registered successfully!";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.errorMessage = "Error registering user: " + action.error.message;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.successMessage = "User logged in successfully";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.errorMessage = action.payload as string;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.userData = null;
      state.successMessage = "User logged out successfully";
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.errorMessage = "Error logging out: " + action.error.message;
    });
  },
});

export const { login, logout, setErrorMessage, setSuccessMessage } =
  authSlice.actions;

export default authSlice.reducer;
