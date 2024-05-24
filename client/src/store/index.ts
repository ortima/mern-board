import { configureStore } from '@reduxjs/toolkit'
import transactionSlice from './transactionSlice'
import { useDispatch } from 'react-redux'
import authSlice from './authSlice'


export const store = configureStore({
  reducer: {
    transactions: transactionSlice,
    auth: authSlice,

  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch = () => useDispatch<AppDispatch>();

