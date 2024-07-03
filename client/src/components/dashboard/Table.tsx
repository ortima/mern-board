import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Delete } from "@mui/icons-material";
import { Button, CircularProgress, Typography } from "@mui/material";
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
  setSelectedTransactionIds,
} from "../../store/transactionSlice";
import { formatTransaction } from "../../utils/transactionsUtils";
import { COLUMNS } from "../../constants";
import useAlert from "../../hooks/useAlert";

export const TableComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions,
  );
  const loading = useSelector((state: RootState) => state.transactions.loading);
  const error = useSelector((state: RootState) => state.transactions.error);
  const [selection, setSelection] = useState<(string | number)[]>([]);
  const { infoAlert } = useAlert();

  dispatch(setSelectedTransactionIds(selection));

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleDeleteSelected = () => {
    const selectedTransactionIds = selection.map((id) => id.toString());
    dispatch(removeTransactions(selectedTransactionIds));
    infoAlert(
      `Deleted ${selectedTransactionIds.length} ${selectedTransactionIds.length === 1 ? `item` : `items`}`,
    );
    setSelection([]);
  };

  const formattedTransactions = transactions.map((transaction) =>
    formatTransaction(transaction),
  );

  return (
    <>
      {loading ? (
        <CircularProgress sx={{ mx: "auto" }} />
      ) : !error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : (
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
      )}

      <Button
        startIcon={<Delete />}
        sx={{
          display: selection.length > 0 ? "inline-flex" : "none",
          ml: 1,
        }}
        onClick={handleDeleteSelected}
        disabled={selection.length === 0}
      >
        Delete Selected
      </Button>
    </>
  );
};
