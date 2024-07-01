import { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { CustomSelectFormControl } from "../shared";
import {
  categoryOptions,
  initialTransactionState,
  typeOptions,
} from "../../constants";
import { useTransactionForm } from "../../hooks/useTransactionForm";
import { TransactionModalProps } from "../../@types/componentsInterfaces";

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isEdit,
}) => {
  const {
    open,
    setOpen,
    transaction,
    handleFieldChange,
    handleSubmit,
    setTransaction,
    selectedTransactionIds,
    transactions,
  } = useTransactionForm(isEdit);

  useEffect(() => {
    if (isEdit && selectedTransactionIds.length === 1) {
      const transaction = transactions.find(
        (transaction) =>
          transaction.transactionId === selectedTransactionIds[0],
      );
      setTransaction(transaction || null);
    } else {
      setTransaction(initialTransactionState);
    }
  }, [isEdit, selectedTransactionIds, transactions, setTransaction]);

  return (
    <>
      <Button
        variant="outlined"
        startIcon={isEdit ? <Edit /> : <Add />}
        onClick={() => setOpen(true)}
        disabled={isEdit && selectedTransactionIds.length !== 1}
      >
        {isEdit ? "Edit Transaction" : "New Transaction"}
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {isEdit ? "Edit Transaction" : "Create New Transaction"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ width: 400 }}>
            <Stack spacing={3}>
              <CustomSelectFormControl
                label="Type"
                name="type"
                value={transaction?.type || ""}
                options={typeOptions}
                onChange={handleFieldChange}
              />

              <CustomSelectFormControl
                label="Category"
                name="category"
                value={transaction?.category || ""}
                options={categoryOptions}
                onChange={handleFieldChange}
              />

              <FormControl fullWidth>
                <TextField
                  label="Description"
                  name="description"
                  value={transaction?.description || ""}
                  onChange={handleFieldChange}
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Amount"
                  type="number"
                  name="amount"
                  value={transaction?.amount || ""}
                  onChange={handleFieldChange}
                  required
                />
              </FormControl>
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              {isEdit ? "Save" : "Submit"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
