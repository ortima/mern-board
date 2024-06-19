import axios from 'axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Transaction {
  transactionId: string
  type: string
  category: string
  description: string
  amount: number
  createdAt: string
}

interface TransactionsState {
  transactions: Transaction[]
  loading: boolean
  error: string | null
}

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: null,
}

const getAuthToken = () => {
  const userDataString = localStorage.getItem('userData')
  if (userDataString) {
    const userData = JSON.parse(userDataString)
    return userData.token
  }
  return null
}

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const token = getAuthToken()
    const response = await axios.get('/api/transactions', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  },
)

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (transaction: Omit<Transaction, 'transactionId'>) => {
    const token = getAuthToken()
    const response = await axios.post('/api/transactions', transaction, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  },
)

export const updateTransactionAsync = createAsyncThunk(
  'transactions/updateTransaction',
  async (transaction: Transaction) => {
    const token = getAuthToken()
    const response = await axios.put(
      `/api/transactions/${transaction.transactionId}`,
      transaction,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  },
)

export const removeTransactions = createAsyncThunk(
  'transactions/removeTransactions',
  async (transactionIds: string[]) => {
    const token = getAuthToken()
    const response = await axios.delete('/api/transactions', {
      data: { transactionIds },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return transactionIds
  },
)

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    removeTransaction(state, action: PayloadAction<string>) {
      state.transactions = state.transactions.filter(
        transaction => transaction.transactionId !== action.payload,
      )
    },
    removeTransactions(state, action: PayloadAction<string[]>) {
      state.transactions = state.transactions.filter(
        transaction => !action.payload.includes(transaction.transactionId),
      )
    },
    updateTransaction(state, action: PayloadAction<Transaction>) {
      const index = state.transactions.findIndex(
        transaction =>
          transaction.transactionId === action.payload.transactionId,
      )
      if (index !== -1) {
        state.transactions[index] = action.payload
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchTransactions.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.transactions = action.payload
          state.loading = false
        },
      )
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch transactions'
      })
      .addCase(
        addTransaction.fulfilled,
        (state, action: PayloadAction<Transaction>) => {
          state.transactions.push(action.payload)
        },
      )
      .addCase(
        removeTransactions.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.transactions = state.transactions.filter(
            transaction => !action.payload.includes(transaction.transactionId),
          )
        },
      )
      .addCase(
        updateTransactionAsync.fulfilled,
        (state, action: PayloadAction<Transaction>) => {
          const index = state.transactions.findIndex(
            transaction =>
              transaction.transactionId === action.payload.transactionId,
          )
          if (index !== -1) {
            state.transactions[index] = action.payload
          }
        },
      )
      .addCase(updateTransactionAsync.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update transaction'
      })
  },
})

export const { removeTransaction, updateTransaction } =
  transactionsSlice.actions

export default transactionsSlice.reducer
