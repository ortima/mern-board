import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { closeAlert } from "../../store/alertSlice";

export const CustomAlert: React.FC = () => {
  const dispatch = useDispatch();
  const { message, open, severity } = useSelector(
    (state: RootState) => state.alert,
  );

  const handleClose = (
    event?: React.SyntheticEvent<Element, Event> | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeAlert());
  };

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};
