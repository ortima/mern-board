import { useCallback } from "react";
import { useAppDispatch } from "../store";
import { AlertState } from "../@types/stateInterfaces";
import { showAlert } from "../store/alertSlice";

const useAlert = () => {
  const dispatch = useAppDispatch();

  const triggerAlert = useCallback(
    (alert: AlertState) => {
      dispatch(showAlert(alert));
    },
    [dispatch],
  );

  const successAlert = useCallback(
    (message: string) => {
      triggerAlert({ open: true, message, severity: "success" });
    },
    [triggerAlert],
  );

  const errorAlert = useCallback(
    (message: string) => {
      triggerAlert({ open: true, message, severity: "error" });
    },
    [triggerAlert],
  );

  const warningAlert = useCallback(
    (message: string) => {
      triggerAlert({ open: true, message, severity: "warning" });
    },
    [triggerAlert],
  );

  const infoAlert = useCallback(
    (message: string) => {
      triggerAlert({ open: true, message, severity: "info" });
    },
    [triggerAlert],
  );
  return { successAlert, errorAlert, warningAlert, infoAlert };
};

export default useAlert;
