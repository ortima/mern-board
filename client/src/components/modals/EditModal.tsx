import { ChangeEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import { CustomSelectFormControl } from "../shared";
import { categoryOptions, typeOptions } from "../../constants";
import { Transaction } from "../../@types/stateInterfaces";
import { Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { updateTransactionAsync } from "../../store/transactionSlice";

export const EditModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const [editedTransaction, setEditedTransaction] =
    useState<Transaction | null>(null);

  const selectedTransactionIds = useSelector(
    (state: RootState) => state.transactions.selectedTransactionIds,
  );

  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions,
  );

  useEffect(() => {
    if (selectedTransactionIds.length == 1) {
      const transaction = transactions.find(
        (transaction) =>
          transaction.transactionId === selectedTransactionIds[0],
      );

      setEditedTransaction(transaction || null);
    } else {
      setEditedTransaction(null);
    }
  }, [selectedTransactionIds, transactions]);

  const handleFieldChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>,
  ) => {
    if (!editedTransaction) {
      return;
    }
    const { name, value } = e.target;
    setEditedTransaction({
      ...editedTransaction,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (editedTransaction) {
      dispatch(updateTransactionAsync(editedTransaction));
      setOpen(false);
    }
  };

  return (
    <>
      {selectedTransactionIds.length == 1 && (
        <Button
          variant="outlined"
          startIcon={<Edit />}
          onClick={() => setOpen(true)}
        >
          Edit Transaction
        </Button>
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Transaction</DialogTitle>

        <DialogContent>
          <>
            <CustomSelectFormControl
              label="Type"
              value={editedTransaction ? editedTransaction.type : ""}
              name="type"
              options={typeOptions}
              onChange={handleFieldChange}
            />

            <CustomSelectFormControl
              label="Category"
              name="category"
              value={editedTransaction ? editedTransaction.category : ""}
              options={categoryOptions}
              onChange={handleFieldChange}
            />

            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              defaultValue={
                editedTransaction ? editedTransaction.description : ""
              }
              onChange={handleFieldChange}
            />

            <TextField
              name="amount"
              label="Amount"
              type="number"
              fullWidth
              defaultValue={editedTransaction ? editedTransaction.amount : ""}
              onChange={handleFieldChange}
            />
          </>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>

          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
