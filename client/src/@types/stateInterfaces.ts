//transactionsSlice

export interface Transaction {
  transactionId: string;
  type: string;
  category: string;
  description: string;
  amount: number;
  createdAt: string;
}

export interface UploadStatus {
  record: number;
  status: string;
  error?: string;
}

export interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  uploadStatus: UploadStatus[];
}

// authSlice

export interface UserData {
  token: string;
  userId: string;
  email?: string;
  name?: string;
}

export interface AuthState {
  userData: UserData | null;
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

export interface UploadStatus {
  record: number;
  error?: string;
}
