import { Snackbar, Alert } from "@mui/material";

export interface CustomAlertProps {
  open: boolean;
  severity: "error" | "warning" | "info" | "success";
  message: string;
  onClose?: () => void;
}

export function CustomAlert({
  open,
  severity,
  message,
  onClose,
}: CustomAlertProps) {
  return (
    <Snackbar open={open} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
