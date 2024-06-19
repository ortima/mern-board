import React, { ChangeEvent, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import TextField from '@mui/material/TextField'
import { Transaction } from '../../store/transactionSlice'
import { NumericFormatAdapter } from '../../utils/numericFormat'

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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!editedTransaction) return
    setEditedTransaction({
      ...editedTransaction,
      [e.target.name]: e.target.value,
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
            <TextField
              autoFocus
              margin="dense"
              name="createdAt"
              label="Date"
              type="text"
              fullWidth
              value={editedTransaction.createdAt}
              onChange={handleFieldChange}
            />
            <TextField
              margin="dense"
              name="type"
              label="Type"
              type="text"
              fullWidth
              value={editedTransaction.type}
              onChange={handleFieldChange}
            />
            <TextField
              margin="dense"
              name="category"
              label="Category"
              type="text"
              fullWidth
              value={editedTransaction.category}
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
              InputProps={{
                inputComponent: NumericFormatAdapter as any,
              }}
              fullWidth
              value={editedTransaction.amount}
              onChange={handleFieldChange}
            />
            <Input
              name="amount"
              required
              value={editedTransaction.amount}
              onChange={handleFieldChange}
              inputComponent={NumericFormatAdapter as any}
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
