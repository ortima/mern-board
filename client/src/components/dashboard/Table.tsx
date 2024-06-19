import React from 'react'
import {
  SelectionState,
  PagingState,
  IntegratedPaging,
  IntegratedSelection,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui'
import { Transaction } from '../../store/transactionSlice'

const COLUMNS = [
  { name: 'createdAt', title: 'Date' },
  { name: 'type', title: 'Type' },
  { name: 'category', title: 'Category' },
  { name: 'description', title: 'Description' },
  { name: 'amount', title: 'Amount' },
]

interface TableComponentProps {
  transactions: Transaction[]
}

const TableComponent: React.FC<TableComponentProps> = ({ transactions }) => {
  const [selection, setSelection] = React.useState<(string | number)[]>([])

  return (
    <Grid rows={transactions} columns={COLUMNS}>
      <PagingState defaultCurrentPage={0} pageSize={6} />
      <SelectionState selection={selection} onSelectionChange={setSelection} />
      <IntegratedPaging />
      <IntegratedSelection />
      <Table />
      <TableHeaderRow />
      <TableSelection showSelectAll />
      <PagingPanel />
    </Grid>
  )
}

export default TableComponent