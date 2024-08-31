// Importing the useEffect hook from React to perform side effects in the component
import { useEffect } from 'react';
// Importing the useAppDispatch hook to dispatch actions to the Redux store
import { useAppDispatch } from '@/redux/hooks';
// Importing actions from the auth slice to set authentication state and finish initial load
import { setAuth, finishInitialLoad } from '@/redux/features/authSlice';
// Importing the useVerifyMutation hook to call the verify endpoint
import { useVerifyMutation } from '@/redux/features/authApiSlice';

export default function useVerify() {
	const dispatch = useAppDispatch(); // Initializing the dispatch function

	const [verify] = useVerifyMutation(); // Initializing the verify mutation hook

	useEffect(() => {
		// Calling the verify mutation when the component mounts
		verify(undefined)
			.unwrap()
			.then(() => {
				// If verification is successful, dispatch the setAuth action
				dispatch(setAuth());
			})
			.finally(() => {
				// Whether successful or not, dispatch the finishInitialLoad action
				dispatch(finishInitialLoad());
			});
	}, []); // Empty dependency array ensures this effect runs only once on mount
}
