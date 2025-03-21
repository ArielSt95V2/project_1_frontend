import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage, ChatThread, ChatState } from '@/types/chat';

const initialState: ChatState = {
  messages: [],
  threads: [],
  currentThread: null,
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Thread actions
    setThreads: (state, action: PayloadAction<ChatThread[]>) => {
      state.threads = action.payload;
    },
    addThread: (state, action: PayloadAction<ChatThread>) => {
      state.threads.push(action.payload);
    },
    updateThread: (state, action: PayloadAction<ChatThread>) => {
      const index = state.threads.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.threads[index] = action.payload;
      }
      if (state.currentThread?.id === action.payload.id) {
        state.currentThread = action.payload;
      }
    },
    removeThread: (state, action: PayloadAction<number>) => {
      state.threads = state.threads.filter(t => t.id !== action.payload);
      if (state.currentThread?.id === action.payload) {
        state.currentThread = null;
      }
    },
    setCurrentThread: (state, action: PayloadAction<ChatThread | null>) => {
      state.currentThread = action.payload;
    },

    // Message actions
    setMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },

    // Loading and error states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setThreads,
  addThread,
  updateThread,
  removeThread,
  setCurrentThread,
  setMessages,
  addMessage,
  clearMessages,
  setLoading,
  setError,
} = chatSlice.actions;

export default chatSlice.reducer;
