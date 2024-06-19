import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

interface TransactionModalProps {
  open: boolean
  handleClose: () => void
  handleSubmit: (transaction: { name: string; amount: number }) => void
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  open,
  handleClose,
  handleSubmit,
}) => {
  const [name, setName] = React.useState('')
  const [amount, setAmount] = React.useState<number | string>('')

  const onSubmit = () => {
    handleSubmit({ name, amount: Number(amount) })
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Transaction</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create a new transaction, please enter the transaction name and
          amount here.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Transaction Name"
          fullWidth
          variant="outlined"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Amount"
          type="number"
          fullWidth
          variant="outlined"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TransactionModal