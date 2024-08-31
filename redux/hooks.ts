// Importing hooks from react-redux to access the Redux store state and dispatch actions
import { useSelector, useDispatch } from 'react-redux';
// Importing TypeScript types for creating typed versions of the hooks
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// useAppDispatch: A typed version of the useDispatch hook, specific to this application's dispatch function
export const useAppDispatch: () => AppDispatch = useDispatch;
// useAppSelector: A typed version of the useSelector hook, specific to this application's state structure
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
