import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ThreadState } from '@/types/langchain-chat';

const initialState: ThreadState = {
  threads: [],
  activeThread: null,
  loading: false,
  error: null
};

export const langchainSlice = createSlice({
  name: 'langchain',
  initialState,
  reducers: {
    setActiveThread: (state, action: PayloadAction<string | null>) => {
      state.activeThread = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { setActiveThread, setLoading, setError, clearError } = langchainSlice.actions;

export default langchainSlice.reducer; 