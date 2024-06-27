import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface AlertState {
  open: boolean;
  severity: "success" | "info" | "warning" | "error";
  message: string;
}
const initialState: AlertState = {
  message: "",
  severity: "info",
  open: false,
};

const AlertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<AlertState>) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    closeAlert: (state) => {
      state.open = false;
    },
  },
});

export const { showAlert, closeAlert } = AlertSlice.actions;

export const selectAlert = (state: RootState): AlertState => state.alert;

export default AlertSlice.reducer;
