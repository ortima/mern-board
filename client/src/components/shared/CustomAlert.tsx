import { Snackbar, Alert } from "@mui/material";
import { CustomAlertProps } from "../../@types/componentsInterfaces";

export const CustomAlert = ({
  open,
  severity,
  message,
  onClose,
}: CustomAlertProps) => {
  return (
    <Snackbar open={open} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
