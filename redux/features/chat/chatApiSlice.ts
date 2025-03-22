import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { 
  ChatMessage, 
  ChatThread, 
  CreateThreadRequest, 
  UpdateThreadRequest, 
  SendMessageRequest, 
  SendMessageResponse,
  Assistant
} from '@/types/chat';

// Tag types for cache invalidation
type ChatMessageTag = { type: 'ChatMessage'; id: number | 'LIST' };

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_HOST + '/api/chat/',
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  tagTypes: ['Thread', 'Message', 'Assistant'],
  endpoints: (builder) => ({
    // Assistant endpoints
    fetchAssistants: builder.query<Assistant[], void>({
      query: () => ({
        url: 'assistants/',
        method: 'GET',
      }),
      providesTags: ['Assistant'],
    }),

    // Thread endpoints
    fetchThreads: builder.query<ChatThread[], void>({
      query: () => ({
        url: 'threads/',
        method: 'GET',
      }),
      providesTags: ['Thread'],
    }),

    createThread: builder.mutation<ChatThread, CreateThreadRequest>({
      query: (data) => ({
        url: 'threads/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Thread'],
    }),

    updateThread: builder.mutation<ChatThread, { id: number; data: UpdateThreadRequest }>({
      query: ({ id, data }) => ({
        url: `threads/${id}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Thread'],
    }),

    deleteThread: builder.mutation<void, number>({
      query: (id) => ({
        url: `threads/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Thread'],
    }),

    // Message endpoints
    fetchThreadMessages: builder.query<ChatMessage[], number>({
      query: (threadId) => ({
        url: `threads/${threadId}/messages/`,
        method: 'GET',
      }),
      providesTags: ['Message'],
    }),

    sendMessage: builder.mutation<SendMessageResponse, SendMessageRequest>({
      query: (data) => ({
        url: 'messages/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Message'],
    }),
  }),
});

export const {
  useFetchAssistantsQuery,
  useFetchThreadsQuery,
  useCreateThreadMutation,
  useUpdateThreadMutation,
  useDeleteThreadMutation,
  useFetchThreadMessagesQuery,
  useSendMessageMutation,
} = chatApi;
