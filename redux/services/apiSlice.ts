// Importing necessary functions and types from Redux Toolkit's RTK Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
// Importing actions from the auth slice for setting authentication state and logging out
import { setAuth, logout } from '../features/authSlice';
// Importing Mutex from async-mutex for handling concurrent requests
import { Mutex } from 'async-mutex';


console.log('NEXT_PUBLIC_HOST: ', process.env.NEXT_PUBLIC_HOST);


// Creating a mutex to prevent multiple concurrent refresh token requests
const mutex = new Mutex();

// Defining the base query with base URL and credentials configuration
const baseQuery = fetchBaseQuery({
	baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api`,
	credentials: 'include',
});

// Enhancing the base query to handle re-authentication when a 401 status error occurs
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
	// Waiting for any ongoing mutex locks to be released
	await mutex.waitForUnlock();
	// Making the initial API request
	let result = await baseQuery(args, api, extraOptions);

	// If the request fails with a 401 Unauthorized status
	if (result.error && result.error.status === 401) {
		// If the mutex is not already locked, proceed with re-authentication
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				// Attempting to refresh the token
				const refreshResult = await baseQuery(
					{
						url: '/jwt/refresh/',
						method: 'POST',
					},
					api,
					extraOptions
				);
				// If the token refresh is successful, set the authentication state
				if (refreshResult.data) {
					api.dispatch(setAuth());
					// Retry the original request with the new token
					result = await baseQuery(args, api, extraOptions);
				} else {
					// If the token refresh fails, log out the user
					api.dispatch(logout());
				}
			} finally {
				// Release the mutex lock
				release();
			}
		} else {
			// If the mutex is locked, wait for it to be released and retry the original request
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}
	return result;
};

// Creating an API slice with RTK Query, using the enhanced base query for re-authentication
export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({}), // Placeholder for endpoints to be defined elsewhere
});
