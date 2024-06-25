import { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import { Transaction } from "../../store/transactionSlice";
import CustomSelectFormControl from "../shared/CustomSelectFormControl";
import { categoryOptions, typeOptions } from "../../constants";

interface EditModalProps {
  transaction: Transaction | null;
  open: boolean;
  onClose: () => void;
  onSave: (editedTransaction: Transaction) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  transaction,
  open,
  onClose,
  onSave,
}) => {
  const [editedTransaction, setEditedTransaction] =
    useState<Transaction | null>(transaction);

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

  const handleSave = () => {
    if (editedTransaction) {
      onSave(editedTransaction);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Transaction</DialogTitle>

      <DialogContent>
        {editedTransaction && (
          <>
            <CustomSelectFormControl
              label="Type"
              defaultValue={editedTransaction.type}
              name="type"
              options={typeOptions}
              onChange={handleFieldChange}
            />

            <CustomSelectFormControl
              label="Category"
              name="category"
              defaultValue={editedTransaction.category}
              options={categoryOptions}
              onChange={handleFieldChange}
            />

            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              value={editedTransaction.description}
              onChange={handleFieldChange}
            />

            <TextField
              name="amount"
              label="Amount"
              type="number"
              fullWidth
              value={editedTransaction.amount}
              onChange={handleFieldChange}
            />
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>

        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
