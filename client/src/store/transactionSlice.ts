import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export interface Transaction {
  transactionId: string;
  type: string;
  category: string;
  description: string;
  amount: string;
  createdAt: string;
}

interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: null,
};

export const fetchTransactions = createAsyncThunk('transactions/fetchTransactions', async () => {
  const response = await axios.get('/api/transactions');
  return response.data;
});

export const addTransaction = createAsyncThunk('transactions/addTransaction', async (transaction: Omit<Transaction, 'transactionId'>) => {
  const response = await axios.post('/api/transactions', transaction, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
});

export const removeTransactions = createAsyncThunk('transactions/removeTransactions', async (transactionIds: string[]) => {
  const response = await axios.delete('/api/transactions', {
    data: { transactionIds },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return transactionIds;
});

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    removeTransaction(state, action: PayloadAction<string>) {
      state.transactions = state.transactions.filter(transaction => transaction.transactionId !== action.payload);
    },
    removeTransactions(state, action: PayloadAction<string[]>) {
      state.transactions = state.transactions.filter(transaction => !action.payload.includes(transaction.transactionId));
    },
    updateTransaction(state, action: PayloadAction<Transaction>) {
      const index = state.transactions.findIndex(transaction => transaction.transactionId === action.payload.transactionId);
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch transactions';
      })
      .addCase(addTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
        state.transactions.push(action.payload);
      })
      .addCase(removeTransactions.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.transactions = state.transactions.filter(
          (transaction) => !action.payload.includes(transaction.transactionId)
        )
      })
  },
});

export const { removeTransaction, updateTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
