'use client';

import { store } from './store';
import { Provider } from 'react-redux';

interface Props {
	children: React.ReactNode;
}

// CustomProvider: A custom provider component to wrap the application with Redux store
export default function CustomProvider({ children }: Props) {
	return <Provider store={store}>{children}</Provider>;
}
