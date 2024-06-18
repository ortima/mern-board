import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Transaction, updateTransactionAsync } from '../../store/transactionSlice';
import { IconButton, Tooltip } from '@mui/joy';
import { MoreVert } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { NumericFormatAdapter } from '../../utils/numericFormat';
import { Snackbar } from '@mui/joy';


interface FormElements extends HTMLFormControlsCollection {
  type: HTMLSelectElement | HTMLInputElement | any;
  category: HTMLSelectElement;
  description: HTMLInputElement;
  amount: HTMLInputElement
}

interface Form extends HTMLFormElement {
  readonly elements: FormElements;
}


interface ChangeModalProps {
  transactionToEdit: Transaction;
}

export default function BasicModalDialog({ transactionToEdit }: ChangeModalProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openSnack, setOpenSnack] = React.useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const [formData, setFormData] = React.useState({
    type: transactionToEdit.type,
    category: transactionToEdit.category,
    description: transactionToEdit.description,
    amount: transactionToEdit.amount,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "amount") {
      const formattedValue = `₽${value.replace(/\D/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (name: string, value: string | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value || "",
    }));
  };

  async function submitHandler(event: React.FormEvent<Form>) {
    event.preventDefault();
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const userId = userData ? userData.userId : null;

    if (!userId) {
      console.error('userId not found in localStorage');
      return;
    }

    const data: any = {
      transactionId: transactionToEdit.transactionId,
      userId: userId,
      ...formData
    };
    try {
      const response = await dispatch(updateTransactionAsync(data));
      if (response) {
        setOpen(false);
        setOpenSnack(true)
        console.log(data)
      } else {
        console.error('Failed to update transaction');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <React.Fragment>
      <Tooltip title="change" color="warning" placement="left" size="sm">
        <IconButton size="sm" onClick={() => setOpen(true)}>
          <MoreVert />
        </IconButton>
      </Tooltip>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Change transaction</DialogTitle>
          <form onSubmit={submitHandler}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={(event, value) => handleSelectChange("type", value)}
                >
                  <Option value="expense">Расходы</Option>
                  <Option value="income">Доходы</Option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={(event, value) => handleSelectChange("category", value)}
                >
                  <Option value="school">Школа</Option>
                  <Option value="work">Работа</Option>
                  <Option value="university">Университет</Option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input slotProps={{ input: { component: NumericFormatAdapter } }}
                  name="amount"
                  required
                  value={formData.amount}
                  onChange={handleInputChange}
                />
              </FormControl>
              <Button type="submit">Change</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
      <Snackbar
        autoHideDuration={2000}
        onClose={() => setOpenSnack(false)}
        open={openSnack}
        color='success'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        Transaction changed
      </Snackbar>
    </React.Fragment>
  );
}
