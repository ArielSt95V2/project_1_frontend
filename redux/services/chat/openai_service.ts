import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const openaiApi = createApi({
  reducerPath: 'openaiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api`, // Ensure this points to your backend API
    credentials: 'include',
  }),
  tagTypes: ['ChatMessage'], // Define any tag types for cache invalidation
  endpoints: () => ({}), // We'll inject endpoints in other files
});

export const { usePrefetch } = openaiApi;
