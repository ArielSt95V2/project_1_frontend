import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: number;
  content: string;
  timestamp: string;
  role: 'user' | 'assistant';
}

interface ChatbotState {
  messages: Message[];
}

const initialState: ChatbotState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      console.log("Message added to state:", action.payload);
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      console.log('Setting messages in state:', action.payload); // Add this log
      state.messages = action.payload;
    },
  },
});

export const { addMessage, clearMessages, setMessages } = chatSlice.actions;

export default chatSlice.reducer;
