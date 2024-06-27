import { useCallback, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  Dialog,
  DialogTitle,
  Stack,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addTransaction } from "../../store/transactionSlice";
import { AppDispatch } from "../../store";
import { CustomSelectFormControl } from "../shared";
import { CustomAlert } from "../shared/CustomAlert";
import { categoryOptions, typeOptions } from "../../constants";
import { Form, CustomAlertProps } from "../../@types/componentsInterfaces";

export const AddModal = () => {
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState<CustomAlertProps>({
    open: false,
    severity: "info",
    message: "",
  });

  const handleAlertClose = useCallback(() => {
    setAlert({ ...alert, open: false });
  }, [alert]);

  async function submitHandler(event: React.FormEvent<Form>) {
    event.preventDefault();
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

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const { type, category, description, amount } = formJson as {
      type: string;
      category: string;
      description: string;
      amount: string;
    };

    const data = {
      userId,
      type: type,
      category: category,
      description: description,
      amount: parseFloat(amount),
    };

    try {
      const response = await dispatch(addTransaction(data));
      if (response.meta.requestStatus === "fulfilled") {
        setOpen(false);
        setAlert({
          open: true,
          severity: "success",
          message: "Transaction added successfully!",
        });
      } else {
        setAlert({
          open: true,
          severity: "error",
          message: "Failed to add transaction. Please try again.",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        severity: "error",
        message: "An error occurred. Please try again.",
      });
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={() => setOpen(true)}
      >
        New transaction
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create new transaction</DialogTitle>
        <form onSubmit={submitHandler}>
          <Stack spacing={2} sx={{ padding: 2 }}>
            <CustomSelectFormControl
              label="Type"
              defaultValue="expense"
              name="type"
              options={typeOptions}
            />

            <CustomSelectFormControl
              label="Category"
              name="category"
              defaultValue="school"
              options={categoryOptions}
            />

            <FormControl fullWidth>
              <InputLabel>Description</InputLabel>
              <Input required name="description" />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Amount</InputLabel>
              <Input type="number" name="amount" required />
            </FormControl>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Dialog>
      <CustomAlert
        open={alert.open}
        severity={alert.severity}
        message={alert.message}
        onClose={handleAlertClose}
      />
    </>
  );
};
