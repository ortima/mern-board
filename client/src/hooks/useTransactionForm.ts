import { useState, ChangeEvent, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import {
  addTransaction,
  updateTransactionAsync,
} from "../store/transactionSlice";
import { NewTransaction, Transaction } from "../@types/stateInterfaces";
import { CustomAlertProps, Form } from "../@types/componentsInterfaces";
import { SelectChangeEvent } from "@mui/material";

export const useTransactionForm = (isEdit: boolean) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState<CustomAlertProps>({
    open: false,
    severity: "info",
    message: "",
  });
  const [transaction, setTransaction] = useState<
    NewTransaction | Transaction | null
  >(null);

  const selectedTransactionIds = useSelector(
    (state: RootState) => state.transactions.selectedTransactionIds,
  );
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions,
  );

  const handleFieldChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>,
  ) => {
    if (!transaction) {
      return;
    }
    const { name, value } = e.target;
    setTransaction({
      ...transaction,
      [name]: value,
    });
  };

  const handleAlertClose = useCallback(() => {
    setAlert({ ...alert, open: false });
  }, [alert]);

  const handleSubmit = async (event: React.FormEvent<Form>) => {
    event.preventDefault();
    if (!transaction) {
      return;
    }

    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const userId = userData ? userData.userId : null;

    if (!userId) {
      setAlert({
        open: true,
        severity: "error",
        message: "User ID not found. Please log in again.",
      });
      return;
    }

    const amount =
      transaction.amount !== null
        ? parseFloat(transaction.amount.toString())
        : 0;

    const data = {
      ...transaction,
      userId,
      amount: amount,
    };

    try {
      let response;
      if (isEdit && "transactionId" in transaction) {
        response = await dispatch(updateTransactionAsync(data as Transaction));
      } else {
        response = await dispatch(addTransaction(data as NewTransaction));
      }

      if (response.meta.requestStatus === "fulfilled") {
        setOpen(false);
        setAlert({
          open: true,
          severity: "success",
          message: `Transaction ${isEdit ? "updated" : "added"} successfully!`,
        });
      } else {
        setAlert({
          open: true,
          severity: "error",
          message: `Failed to ${isEdit ? "update" : "add"} transaction. Please try again.`,
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
        message: "An error occurred. Please try again.",
      });
    }
  };

  return {
    open,
    setOpen,
    alert,
    handleAlertClose,
    transaction,
    setTransaction,
    handleFieldChange,
    handleSubmit,
    selectedTransactionIds,
    transactions,
  };
};
