// Importing the createSlice function from Redux Toolkit to create a slice of the Redux state
import { createSlice } from '@reduxjs/toolkit';

// Defining the shape of the auth state using a TypeScript interface
interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
}

// Initial state: The starting state of the auth slice
const initialState = {
	isAuthenticated: false,
	isLoading: true,
} as AuthState;

// Creating the auth slice: This function generates action creators and action types automatically
const authSlice = createSlice({
	name: 'auth', // Name of the slice
	initialState, // Initial state of the slice
	reducers: {
		// Reducer to set the authenticated state to true
		setAuth: state => {
			state.isAuthenticated = true;
		},
		// Reducer to set the authenticated state to false
		logout: state => {
			state.isAuthenticated = false;
		},
		// Reducer to set the loading state to false
		finishInitialLoad: state => {
			state.isLoading = false;
		},
	},
});

// Exporting the action creators generated by createSlice
export const { setAuth, logout, finishInitialLoad } = authSlice.actions;
// Exporting the reducer function to be included in the Redux store
export default authSlice.reducer;