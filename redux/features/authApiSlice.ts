// ////////////////////////////////////////////////////////////////////
// This is where the USER INPUT is TRANSFERD to the API ENDPOINT
/////////////////////////////////////////////////////////////////////

// THE AUTHENTICATION ENDPOINTS FILE
// FOR EACH API SERCVICE SHOULD BE A DEDICATED FILE LIKE THIS `spotifyApiSlice.ts`



// Importing the apiSlice from the services directory, which is the base API slice created using RTK Query
import { apiSlice } from '../services/apiSlice';

// Defining the User interface to type the user object
interface User {
	first_name: string;
	last_name: string;
	email: string;
}

// Defining the arguments for social authentication
interface SocialAuthArgs {
	provider: string;
	state: string;
	code: string;
}

// Defining the response structure for creating a user
interface CreateUserResponse {
	success: boolean;
	user: User;
}

// Injecting endpoints into the apiSlice
const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		// Endpoint to retrieve the current authenticated user
		retrieveUser: builder.query<User, void>({
			query: () => '/users/me/',
		}),
		// Endpoint for social authentication
		socialAuthenticate: builder.mutation<CreateUserResponse, SocialAuthArgs>({
			query: ({ provider, state, code }) => ({
				// Constructing the URL dynamically based on the provider, state, and code parameters
				url: `/o/${provider}/?state=${encodeURIComponent(state)}&code=${encodeURIComponent(code)}`,
				// Specifying the HTTP method for the request
				method: 'POST',
				// Setting the headers for the request to accept JSON and use URL-encoded form data
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}),
		}),
		
		// Endpoint for user login
		login: builder.mutation({
			query: ({ email, password }) => ({
				url: '/jwt/create/',
				method: 'POST',
				body: { email, password },
			}),
		}),
		// Endpoint for user registration
		register: builder.mutation({
			query: ({ first_name, last_name, email, password, re_password }) => ({
				url: '/users/',
				method: 'POST',
				body: { first_name, last_name, email, password, re_password },
			}),
		}),
		// Endpoint to verify the JWT token
		verify: builder.mutation({
			query: () => ({
				url: '/jwt/verify/',
				method: 'POST',
			}),
		}),
		// Endpoint to log out the user
		logout: builder.mutation({
			query: () => ({
				url: '/logout/',
				method: 'POST',
			}),
		}),
		// Endpoint to activate the user account
		activation: builder.mutation({
			query: ({ uid, token }) => ({
				url: '/users/activation/',
				method: 'POST',
				body: { uid, token },
			}),
		}),
		// Endpoint to request a password reset
		resetPassword: builder.mutation({
			query: email => ({
				url: '/users/reset_password/',
				method: 'POST',
				body: { email },
			}),
		}),
		// Endpoint to confirm the password reset
		resetPasswordConfirm: builder.mutation({
			query: ({ uid, token, new_password, re_new_password }) => ({
				url: '/users/reset_password_confirm/',
				method: 'POST',
				body: { uid, token, new_password, re_new_password },
			}),
		}),
	}),
});

// Exporting hooks for each of the defined endpoints -- ALL OF THEM ARE INJECTED INTO ```endpoints: builder => ({}),``` IN   SERVICES/apiSlice.ts
export const {
	useRetrieveUserQuery,
	useSocialAuthenticateMutation,
	useLoginMutation,
	useRegisterMutation,
	useVerifyMutation,
	useLogoutMutation,
	useActivationMutation,
	useResetPasswordMutation,
	useResetPasswordConfirmMutation,
} = authApiSlice;
