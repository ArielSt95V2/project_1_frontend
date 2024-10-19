// Importing the necessary function from Redux Toolkit to configure the store
import { configureStore } from '@reduxjs/toolkit';
// Importing the API slice and authentication reducer
import { apiSlice } from './services/apiSlice';
import authReducer from './features/authSlice';

// Importing the openaiAPI slice and authentication reducer
import { openaiApi } from './services/chat/openai_service';
import chatReducer from './features/chat/chatSlice';

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

		
	},
	// Middleware: Extending the default middleware to include the API slice middleware
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware, openaiApi.middleware),
	// Enabling Redux DevTools only in development mode
	devTools: process.env.NODE_ENV !== 'production',
});



// RootState: TypeScript type representing the entire state of the Redux store
export type RootState = ReturnType<(typeof store)['getState']>;
// AppDispatch: TypeScript type representing the dispatch function of the Redux store
export type AppDispatch = (typeof store)['dispatch'];
