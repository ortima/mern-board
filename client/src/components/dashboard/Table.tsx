import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  SelectionState,
  PagingState,
  IntegratedPaging,
  IntegratedSelection,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
} from "@devexpress/dx-react-grid-material-ui";
import { RootState, useAppDispatch } from "../../store";
import {
  fetchTransactions,
  removeTransactions,
  Transaction,
  updateTransactionAsync,
} from "../../store/transactionSlice";
import Button from "@mui/material/Button";
import { formatTransaction } from "../../utils/transactionsUtils";
import EditModal from "./EditModal";

const COLUMNS = [
  { name: "createdAt", title: "Дата" },
  { name: "type", title: "Тип" },
  { name: "category", title: "Категория" },
  { name: "description", title: "Описание" },
  { name: "amount", title: "Сумма" },
];

interface TableComponentProps {}

const TableComponent: React.FC<TableComponentProps> = () => {
  const dispatch = useAppDispatch();
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions,
  );
  const loading = useSelector((state: RootState) => state.transactions.loading);
  const error = useSelector((state: RootState) => state.transactions.error);
  const [selection, setSelection] = useState<(string | number)[]>([]);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleDeleteSelected = () => {
    const selectedTransactionIds = selection.map((id) => id.toString());
    dispatch(removeTransactions(selectedTransactionIds));
    setSelection([]);
  };

  const handleEditSelected = () => {
    if (selection.length === 1) {
      const selectedTransaction = transactions.find(
        (transaction) => transaction.transactionId === selection[0],
      );
      if (selectedTransaction) {
        setSelectedTransaction(selectedTransaction);
        setEditPopupOpen(true);
      }
    }
  };

  const formattedTransactions = transactions.map((transaction) =>
    formatTransaction(transaction),
  );

  const handleCloseEditPopup = () => {
    setEditPopupOpen(false);
    setSelectedTransaction(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Grid
        rows={formattedTransactions}
        columns={COLUMNS}
        getRowId={(row) => row.transactionId}
      >
        <PagingState defaultCurrentPage={0} pageSize={6} />
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />
        <IntegratedPaging />
        <IntegratedSelection />
        <Table />
        <TableHeaderRow />
        <TableSelection showSelectAll />
        <PagingPanel />
      </Grid>
      <Button
        startIcon={<DeleteIcon />}
        sx={{ display: selection.length > 0 ? "inline-flex" : "none", ml: 1 }}
        onClick={handleDeleteSelected}
        disabled={selection.length === 0}
      >
        Delete Selected
      </Button>
      <Button
        startIcon={<EditIcon />}
        sx={{ display: selection.length === 1 ? "inline-flex" : "none", ml: 1 }}
        onClick={handleEditSelected}
        disabled={selection.length !== 1}
      >
        Edit Selected
      </Button>
      {editPopupOpen && (
        <EditModal
          transaction={selectedTransaction}
          open={editPopupOpen}
          onClose={handleCloseEditPopup}
          onSave={(updatedTransaction) => {
            dispatch(updateTransactionAsync(updatedTransaction));
            handleCloseEditPopup();
          }}
        />
      )}
    </>
  );
};

export default TableComponent;
