import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { categoryOptions, typeOptions } from "../constants";
import {
  Transaction,
  NewTransaction,
  TransactionsState,
  UploadStatus,
} from "../@types/stateInterfaces";
import { getAuthToken } from "../utils/transactionsUtils";

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: null,
  uploadStatus: [],
  selectedTransactionIds: [],
};

const getAuthHeaders = () => ({
  Authorization: `Bearer ${getAuthToken()}`,
  "Content-Type": "application/json",
});

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const response = await axios.get("/api/transactions", {
      headers: getAuthHeaders(),
    });
    return response.data;
  },
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction: NewTransaction) => {
    const response = await axios.post("/api/transactions", transaction, {
      headers: getAuthHeaders(),
    });
    return response.data;
  },
);

export const updateTransactionAsync = createAsyncThunk(
  "transactions/updateTransaction",
  async (transaction: Transaction) => {
    const response = await axios.put(
      `/api/transactions/${transaction.transactionId}`,
      transaction,
      {
        headers: getAuthHeaders(),
      },
    );
    return response.data;
  },
);

export const removeTransactions = createAsyncThunk(
  "transactions/removeTransactions",
  async (transactionIds: string[]) => {
    await axios.delete("/api/transactions", {
      data: { transactionIds },
      headers: getAuthHeaders(),
    });
    return transactionIds;
  },
);

export const uploadFile = createAsyncThunk<
  UploadStatus[],
  any[],
  { state: RootState }
>("transactions/uploadFile", async (jsonData, { rejectWithValue }) => {
  let statuses: UploadStatus[] = [];

  const isValidType = (type: string) =>
    typeOptions.some((option) => option.value === type);
  const isValidCategory = (category: string) =>
    categoryOptions.some((option) => option.value === category);

  try {
    for (let i = 0; i < jsonData.length; i++) {
      const item = jsonData[i];
      const amount = parseFloat(item.amount);
      const getFailedData = (record: number, error: string) => ({
        record,
        status: "failed",
        error,
      });
      const getSuccessData = (record: number) => ({
        record,
        status: "success",
      });
      if (isNaN(amount) || amount <= 0) {
        statuses.push(getFailedData(i + 1, "Invalid amount"));
      } else if (!isValidType(item.type)) {
        statuses.push(getFailedData(i + 1, "Invalid type"));
      } else if (!isValidCategory(item.category)) {
        statuses.push(getFailedData(i + 1, "Invalid category"));
      } else {
        const response = await axios.post(
          "/api/transactions/upload-data",
          [item],
          {
            headers: getAuthHeaders(),
          },
        );
        if (!response.status.toString().startsWith("2")) {
          throw new Error(`Server error: ${response.statusText}`);
        }
        statuses.push(getSuccessData(i + 1));
      }
    }
    return statuses;
  } catch (error: any) {
    return rejectWithValue(
      statuses.map((status, index) => ({
        record: index + 1,
        status: "failed",
        error: error.message,
      })),
    );
  }
});

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setSelectedTransactionIds(
      state,
      action: PayloadAction<(string | number)[]>,
    ) {
      state.selectedTransactionIds = action.payload;
    },
    removeTransaction(state, action: PayloadAction<string>) {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.transactionId !== action.payload,
      );
    },
    removeTransactions(state, action: PayloadAction<string[]>) {
      state.transactions = state.transactions.filter(
        (transaction) => !action.payload.includes(transaction.transactionId),
      );
    },
    updateTransaction(state, action: PayloadAction<Transaction>) {
      const index = state.transactions.findIndex(
        (transaction) =>
          transaction.transactionId === action.payload.transactionId,
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    clearUploadStatus(state) {
      state.uploadStatus = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTransactions.fulfilled,
        (state, action: PayloadAction<Transaction[]>) => {
          state.transactions = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch transactions";
      })
      .addCase(
        addTransaction.fulfilled,
        (state, action: PayloadAction<Transaction>) => {
          state.transactions.push(action.payload);
        },
      )
      .addCase(
        removeTransactions.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.transactions = state.transactions.filter(
            (transaction) =>
              !action.payload.includes(transaction.transactionId),
          );
        },
      )
      .addCase(
        updateTransactionAsync.fulfilled,
        (state, action: PayloadAction<Transaction>) => {
          const index = state.transactions.findIndex(
            (transaction) =>
              transaction.transactionId === action.payload.transactionId,
          );
          if (index !== -1) {
            state.transactions[index] = action.payload;
          }
        },
      )
      .addCase(updateTransactionAsync.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update transaction";
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadStatus = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.uploadStatus = [];
      });
  },
});

export const {
  setSelectedTransactionIds,
  removeTransaction,
  updateTransaction,
  clearUploadStatus,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
