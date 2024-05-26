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
import Add from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../store/transactionSlice';
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

export default function BasicModalDialog() {
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = React.useState<boolean>(false);
  const [openSnack, setOpenSnack] = React.useState<boolean>(false);

  async function submitHandler(event: React.FormEvent<Form>) {
    event.preventDefault()
    const userDataString = localStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const userId = userData ? userData.userId : null;


    if (!userId) {
      console.error('userId not found in localStorage');
      return
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


    console.log(data)

    try {
      const response = await dispatch(addTransaction(data))
      if (response.meta.requestStatus === 'fulfilled') {
        setOpen(false)
        setOpenSnack(true)
      } else {
        console.error('Failed to add transaction');
      }
    } catch (error) {
      console.error(error, 'Error');
    }

  }
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        New transaction
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Create new transaction</DialogTitle>
          <form
            onSubmit={submitHandler}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Select defaultValue="expense" name='type'>
                  <Option value="expense">Расходы</Option>
                  <Option value="income">Доходы</Option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select defaultValue="school" name='category'>
                  <Option value="school">Школа</Option>
                  <Option value="work">Работа</Option>
                  <Option value="university">Университет</Option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input required name='description' />
              </FormControl>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input name='amount' required slotProps={{ input: { component: NumericFormatAdapter } }} />
              </FormControl>
              <Button type="submit">Submit</Button>
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
        Transaction added
      </Snackbar>
    </React.Fragment>
  );
}
