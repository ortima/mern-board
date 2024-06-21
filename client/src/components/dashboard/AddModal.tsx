import { useState } from "react";
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
import CustomSelectFormControl from "../shared/CustomSelectFormControl";

interface FormElements extends HTMLFormControlsCollection {
  type: HTMLSelectElement | HTMLInputElement | any;
  category: HTMLSelectElement;
  description: HTMLInputElement;
  amount: HTMLInputElement;
}

interface Form extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function AddModal() {
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);

  async function submitHandler(event: React.FormEvent<Form>) {
    event.preventDefault();
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const userId = userData ? userData.userId : null;

    if (!userId) {
      console.error("userId not found in localStorage");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const data: any = {
      userId: userId,
      type: formJson.type,
      category: formJson.category,
      description: formJson.description,
      amount: formJson.amount,
    };

    try {
      const response = await dispatch(addTransaction(data));
      if (response.meta.requestStatus === "fulfilled") {
        setOpen(false);
      } else {
        console.error("Failed to add transaction");
      }
    } catch (error) {
      console.error(error, "Error");
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
              options={[
                { value: "expense", label: "Расходы" },
                { value: "income", label: "Доходы" },
              ]}
            />
            <CustomSelectFormControl
              label="Category"
              name="category"
              defaultValue="school"
              options={[
                { value: "school", label: "Школа" },
                { value: "work", label: "Работа" },
                { value: "university", label: "Университет" },
              ]}
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
    </>
  );
}
