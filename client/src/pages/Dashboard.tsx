import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Layout from '../components/Layout'
import TableComponent from '../components/dashboard/Table'
import TransactionModal from '../components/dashboard/AddModal'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function Dashboard() {
  const { transactions, loading, error } = useSelector(
    (state: RootState) => state.transactions,
  )
  const [modalOpen, setModalOpen] = React.useState(false)

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const handleTransactionSubmit = (transaction: {
    name: string
    amount: number
  }) => {
    console.log('New Transaction:', transaction)
    // Add logic to handle the new transaction
  }

  return (
    <Layout>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" gutterBottom>
                Transactions
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleModalOpen}>
                Add Transaction
              </Button>
              <TransactionModal
                open={modalOpen}
                handleClose={handleModalClose}
                handleSubmit={handleTransactionSubmit}
              />
            </Box>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
                mt: 2,
              }}>
              <TableComponent transactions={transactions} />
            </Paper>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </Layout>
  )
}