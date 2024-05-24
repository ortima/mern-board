import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

interface UserData {
  token: string;
  userId: string;
  email?: string;
}

interface AuthState {
  userData: UserData | null
  loading: boolean
}

const loadUserDataFromLocalStorage = (): UserData | null => {
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
    return JSON.parse(userDataString);
  }
  return null;
};

const initialState: AuthState = {
  userData: loadUserDataFromLocalStorage(),
  loading: false
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: { email: string; password: string }) => {
    try {
      const response = await axios.post('/api/registration', userData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData: { email: string; password: string }, { dispatch }) => {
    try {
      const response = await axios.post('/api/login', userData);
      const { token, userId, email } = response.data;
      localStorage.setItem('userData', JSON.stringify({ token, userId, email }));
      dispatch(login({ token, userId, email }));
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    try {
      localStorage.removeItem('userData');
      dispatch(logout());
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload
    },
    logout: (state) => {
      state.userData = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log('User logged in successfully');
    })
  }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;