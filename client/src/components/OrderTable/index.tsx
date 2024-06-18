/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';


import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/index';

import { fetchTransactions, removeTransactions } from '../../store/transactionSlice';
import ChangeModal from '../Modal/changeTransaction';
import TableSkeleton from '../Skeleton';
import { Snackbar } from '@mui/joy';
import { Delete, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import BasicModalDialog from '../Modal';


export default function OrderTable() {
  const dispatch = useAppDispatch()
  const transactions = useSelector((state: RootState) => state.transactions.transactions)
  const loading = useSelector((state: RootState) => state.transactions.loading);

  const [openSnack, setOpenSnack] = React.useState(false);
  const [deletedCount, setDeletedCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);



  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);

  const handleChangeRowsPerPage = (event: any, newValue: number | null) => {
    if (newValue !== null) {
      setRowsPerPage(parseInt(newValue.toString(), 10));
      setPage(0);
    }
  };


  React.useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  function labelDisplayedRows({
    from,
    to,
    count,
  }: {
    from: number;
    to: number;
    count: number;
  }) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
  }

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const getLabelDisplayedRowsTo = () => {
    if (transactions.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? transactions.length
      : Math.min(transactions.length, (page + 1) * rowsPerPage);
  };


  const handleDeleteSelected = async () => {
    try {
      await dispatch(removeTransactions(selected));
      setDeletedCount(selected.length)
      setSelected([]);
      setOpenSnack(true)
    } catch (error) {
      console.error('Failed to delete transactions', error);
    }
  };


  return (
    <React.Fragment>
      <Box display={'flex'} justifyContent={'space-between'} my={3}>
        <Button
          startDecorator={<Delete />}
          variant="outlined"
          color="neutral"
          onClick={handleDeleteSelected}
          sx={selected.length === 0 ? { display: 'none' } : { display: 'inline-flex' }}
        >
          Remove item
        </Button>
        <BasicModalDialog />
      </Box>
      {transactions.length > 0 ?
        <Sheet
          className="OrderTableContainer"
          variant="outlined"
          sx={{
            display: { xs: 'none', sm: 'initial' },
            width: '100%',
            borderRadius: 'sm',
            flexShrink: 1,
            overflow: 'auto',
            minHeight: 0,
          }}
        >
          <Table
            aria-labelledby="tableTitle"
            stickyHeader
            hoverRow
            sx={{
              '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
              '--Table-headerUnderlineThickness': '1px',
              '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
              '--TableCell-paddingY': '4px',
              '--TableCell-paddingX': '8px',
            }}
          >
            <thead>
              <tr>
                <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
                  <Checkbox
                    size="sm"
                    indeterminate={
                      selected.length > 0 && selected.length !== transactions.length
                    }
                    checked={selected.length === transactions.length}
                    onChange={(event) => {
                      setSelected(
                        event.target.checked ? transactions.map((transaction) => transaction.transactionId) : [],
                      );
                    }}
                    color={
                      selected.length > 0 || selected.length === transactions.length
                        ? 'primary'
                        : undefined
                    }
                    sx={{ verticalAlign: 'text-bottom' }}
                  />
                </th>
                <th style={{ width: 120, padding: '12px 6px' }}>Date</th>
                <th style={{ width: 120, padding: '12px 6px' }}>Type</th>
                <th style={{ width: 120, padding: '12px 6px' }}>Category</th>
                <th style={{ width: 300, padding: '12px 6px', textAlign: "center" }}>Description</th>
                <th style={{ width: 120, padding: '12px 6px' }}>Amount</th>
                <th style={{ width: 50 }}></th>
              </tr>
            </thead>
            <tbody>
              {loading ? <TableSkeleton /> : (
                transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((transaction) => (
                    <tr key={transaction.transactionId}>
                      <td style={{ textAlign: 'center', width: 120 }}>
                        <Checkbox
                          size="sm"
                          checked={selected.includes(transaction.transactionId)}
                          color={selected.includes(transaction.transactionId) ? 'primary' : undefined}
                          onChange={(event) => {
                            setSelected((ids) =>
                              event.target.checked
                                ? ids.concat(transaction.transactionId)
                                : ids.filter((itemId) => itemId !== transaction.transactionId),
                            );
                          }}
                          slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                          sx={{ verticalAlign: 'text-bottom' }}
                        />
                      </td>
                      <td>
                        <Typography level="body-xs">{new Date(transaction.createdAt).toLocaleDateString()}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{transaction.type}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{transaction.category}</Typography>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <Typography level="body-xs">{transaction.description}</Typography>
                      </td>
                      <td>
                        <Typography level="body-xs">{transaction.amount}</Typography>
                      </td>
                      <td>
                        <ChangeModal transactionToEdit={transaction} />
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={7}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <FormControl orientation="horizontal" size="sm">
                      <FormLabel>Rows per page:</FormLabel>
                      <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                        <Option value={3}>3</Option>
                        <Option value={5}>5</Option>
                        <Option value={10}>10</Option>
                      </Select>
                    </FormControl>
                    <Typography textAlign="center" sx={{ minWidth: 80 }}>
                      {labelDisplayedRows({
                        from: transactions.length === 0 ? 0 : page * rowsPerPage + 1,
                        to: getLabelDisplayedRowsTo(),
                        count: transactions.length === -1 ? -1 : transactions.length,
                      })}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="sm"
                        color="neutral"
                        variant="outlined"
                        disabled={page === 0}
                        onClick={() => handleChangePage(page - 1)}
                        sx={{ bgcolor: 'background.surface' }}
                      >
                        <KeyboardArrowLeft />
                      </IconButton>
                      <IconButton
                        size="sm"
                        color="neutral"
                        variant="outlined"
                        disabled={
                          transactions.length !== -1
                            ? page >= Math.ceil(transactions.length / rowsPerPage) - 1
                            : false
                        }
                        onClick={() => handleChangePage(page + 1)}
                        sx={{ bgcolor: 'background.surface' }}
                      >
                        <KeyboardArrowRight />
                      </IconButton>
                    </Box>
                  </Box>
                </td>
              </tr>
            </tfoot>
          </Table>
        </Sheet>
        : <Typography level='h2'>You can create your fist transaction!</Typography>}
      <Snackbar
        autoHideDuration={2000}
        onClose={() => setOpenSnack(false)}
        open={openSnack}
        color='danger'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        {deletedCount > 1 ? `Deleted ${deletedCount} items` : `Deleted item`}
      </Snackbar>
    </React.Fragment>
  );
}