// Importing the necessary function from Redux Toolkit to configure the store
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
// Importing the API slice and authentication reducer
import { apiSlice } from './services/apiSlice';
import authReducer from './features/authSlice';

// Importing the openaiAPI slice and authentication reducer
import { openaiApi } from './services/chat/openai_service';
import chatReducer from './features/chat/chatSlice';
import { chatApi } from './features/chat/chatApiSlice';

import langchainReducer from './features/langchain/langchainSlice';
import { langchainApi } from './features/langchain/langchainApiSlice';

// Store: The store is a JavaScript object that holds the entire state of your application.
// It is the single source of truth for your app's state.
export const store = configureStore({
	reducer: {
		// Adding the authentication reducer to the store
		auth: authReducer,
		// Adding the API slice reducer to the store
		[apiSlice.reducerPath]: apiSlice.reducer,
		
		chatbot: chatReducer,
		[openaiApi.reducerPath]: openaiApi.reducer,
		[chatApi.reducerPath]: chatApi.reducer,
		langchain: langchainReducer,
	},
	// Middleware: Extending the default middleware to include the API slice middleware
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			apiSlice.middleware,
			openaiApi.middleware,
			chatApi.middleware,
			langchainApi.middleware
		),
	// Enabling Redux DevTools only in development mode
	devTools: process.env.NODE_ENV !== 'production',
});

// RootState: TypeScript type representing the entire state of the Redux store
export type RootState = ReturnType<(typeof store)['getState']>;
// AppDispatch: TypeScript type representing the dispatch function of the Redux store
export type AppDispatch = (typeof store)['dispatch'];
