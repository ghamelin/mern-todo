import { apiSlice } from './apiSlice';
import Cookies from 'universal-cookie';
const USERS_URL = 'api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: `${USERS_URL}/auth`,
				method: 'POST',
				body: credentials,
			}),
		}),
		register: builder.mutation({
			query: (credentials) => ({
				url: `${USERS_URL}`,
				method: 'POST',
				body: credentials,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: 'POST',
			}),
		}),
		updateUser: builder.mutation({
			query: (credentials) => ({
				url: `${USERS_URL}/profile`,
				method: 'PUT',
				body: credentials,
				header:credentials.headers = {
					sessiontoken: new Cookies().get('sessionToken').session_token,
				},
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useUpdateUserMutation,
} = usersApiSlice;
