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

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  type: HTMLSelectElement;
  category: HTMLSelectElement;
  description: HTMLInputElement;
  amount: HTMLInputElement
}

interface Form extends HTMLFormElement {
  readonly elements: FormElements;
}

function submitHandler(event: React.FormEvent<Form>) {
  event.preventDefault()

  const formElements = event.currentTarget.elements
  const data = {
    name: formElements.name.value,
    type: formElements.type.value,
    category: formElements.category.value,
    description: formElements.description.value,
    amount: formElements.amount.value
  };
  console.log(data)

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
                <FormLabel>Name</FormLabel>
                <Input autoFocus required name='name' />
              </FormControl>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Select defaultValue="expenses" name='type'>
                  <Option value="expenses">Расходы</Option>
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
