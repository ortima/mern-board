import React, { ChangeEvent, useState } from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Transaction } from "../../store/transactionSlice"
import CustomSelectFormControl from "../shared/CustomSelectFormControl"
import { SelectChangeEvent } from "@mui/material/Select"

interface EditModalProps {
  transaction: Transaction | null
  open: boolean
  onClose: () => void
  onSave: (updatedTransaction: Transaction) => void
}

const EditModal: React.FC<EditModalProps> = ({
  transaction,
  open,
  onClose,
  onSave,
}) => {
  const [editedTransaction, setEditedTransaction] =
    useState<Transaction | null>(transaction)

  const handleFieldChange = (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    if (!editedTransaction) return
    const { name, value } = e.target
    setEditedTransaction({
      ...editedTransaction,
      [name]: value,
    })
  }

  const handleSave = () => {
    if (editedTransaction) {
      onSave(editedTransaction)
    }
  }

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
              options={[
                { value: "expense", label: "Расходы" },
                { value: "income", label: "Доходы" },
              ]}
              onChange={handleFieldChange}
            />
            <CustomSelectFormControl
              label="Category"
              name="category"
              defaultValue={editedTransaction.category}
              options={[
                { value: "school", label: "Школа" },
                { value: "work", label: "Работа" },
                { value: "university", label: "Университет" },
              ]}
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
  )
}

export default EditModal
