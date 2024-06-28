import { useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import {
  addTransaction,
  updateTransactionAsync,
} from "../store/transactionSlice";
import { NewTransaction, Transaction } from "../@types/stateInterfaces";
import { SelectChangeEvent } from "@mui/material";
import { showAlert } from "../store/alertSlice";
import { Form } from "../@types/componentsInterfaces";

export const useTransactionForm = (isEdit: boolean) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);

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

  const handleSubmit = async (event: React.FormEvent<Form>) => {
    event.preventDefault();
    if (!transaction) {
      return;
    }

    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const userId = userData ? userData.userId : null;

    if (!userId) {
      dispatch(
        showAlert({
          message: "User ID not found. Please log in again.",
          open: true,
          severity: "warning",
        }),
      );
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
        dispatch(
          showAlert({
            message: `Transaction ${isEdit ? "updated" : "added"} successfully!`,
            severity: "success",
            open: true,
          }),
        );
      } else {
        dispatch(
          showAlert({
            message: `Failed to ${isEdit ? "update" : "add"} transaction. Please try again.`,
            severity: "error",
            open: true,
          }),
        );
      }
    } catch (error) {
      dispatch(
        showAlert({
          message: "An error occurred. Please try again.",
          severity: "error",
          open: true,
        }),
      );
    }
  };

  return {
    open,
    setOpen,
    alert,
    transaction,
    setTransaction,
    handleFieldChange,
    handleSubmit,
    selectedTransactionIds,
    transactions,
  };
};
