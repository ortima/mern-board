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
import axios from 'axios';

interface FormElements extends HTMLFormControlsCollection {
  type: HTMLSelectElement | HTMLInputElement | any;
  category: HTMLSelectElement;
  description: HTMLInputElement;
  amount: HTMLInputElement
}

interface Form extends HTMLFormElement {
  readonly elements: FormElements;
}

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
  const data = { ...formJson, userId };

  console.log(data)

  try {
    const response = await axios.post('/api/transactions', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(response)
  }
  catch (error) {
    console.log(error, 'Error')
  }

}

export default function BasicModalDialog() {


  const [open, setOpen] = React.useState<boolean>(false);
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
                <Input type='number' name='amount' required />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
