import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import DeleteIcon from "@mui/icons-material/Delete"
import {
  SelectionState,
  PagingState,
  IntegratedPaging,
  IntegratedSelection,
  EditingState,
} from "@devexpress/dx-react-grid"
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
} from "@devexpress/dx-react-grid-material-ui"
import { RootState, useAppDispatch } from "../../store"
import {
  fetchTransactions,
  removeTransactions,
  Transaction,
  updateTransactionAsync,
} from "../../store/transactionSlice"
import Button from "@mui/material/Button"

const COLUMNS = [
  { name: "createdAt", title: "Date" },
  { name: "type", title: "Type" },
  { name: "category", title: "Category" },
  { name: "description", title: "Description" },
  { name: "amount", title: "Amount" },
]

interface TableComponentProps {}

const TableComponent: React.FC<TableComponentProps> = () => {
  const dispatch = useAppDispatch()
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  )
  const loading = useSelector((state: RootState) => state.transactions.loading)
  const error = useSelector((state: RootState) => state.transactions.error)
  const [selection, setSelection] = useState<(string | number)[]>([])
  const [editingRowIds, setEditingRowIds] = useState<(string | number)[]>([])
  const [addedRows, setAddedRows] = useState<Transaction[]>([])

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [dispatch])

  const handleDeleteSelected = () => {
    const selectedTransactionIds = selection.map((id) => id.toString())
    dispatch(removeTransactions(selectedTransactionIds))
    setSelection([])
  }

  const handleCommitChanges = ({ added, changed, deleted }: any) => {
    let changedRows = [...transactions]

    if (added) {
      added.forEach((row: any) => {
        // Perform any necessary validations or transformations here
        changedRows.push(row)
      })
    }

    if (changed) {
      changedRows = changedRows.map((row) =>
        changed[row.transactionId]
          ? { ...row, ...changed[row.transactionId] }
          : row
      )
      changedRows.forEach((transaction) =>
        dispatch(updateTransactionAsync(transaction))
      )
    }

    if (deleted) {
      const deletedSet = new Set(deleted)
      changedRows = changedRows.filter(
        (row) => !deletedSet.has(row.transactionId)
      )
    }

    // Dispatch an action to update the transactions in the store
    // Example: dispatch(updateTransactions(changedRows));
    // setTransactions(changedRows); // Update local state
  }

  const logSelectedTransactions = () => {
    console.log("Current selection:", selection) // Debug: log current selection
    const selectedTransactions = transactions.filter((transaction) =>
      selection.includes(transaction.transactionId)
    )
    console.log("Selected Transactions:", selectedTransactions)
  }

  useEffect(() => {
    logSelectedTransactions()
  }, [selection])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <Grid
        rows={transactions}
        columns={COLUMNS}
        getRowId={(row) => row.transactionId}
      >
        <PagingState defaultCurrentPage={0} pageSize={6} />
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />
        <EditingState
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={setEditingRowIds}
          addedRows={addedRows}
          onAddedRowsChange={setAddedRows}
          onCommitChanges={handleCommitChanges}
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
        sx={{ display: selection.length > 0 ? "inline-flex" : "none" }}
        onClick={handleDeleteSelected}
        disabled={selection.length === 0}
      >
        Delete Selected
      </Button>
    </>
  )
}

export default TableComponent
