import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiSlice } from '../../services/apiSlice';
import type { 
  LangChainThread, 
  ThreadCreateRequest, 
  ThreadResponse,
  LangChainMessage
} from '@/types/langchain-chat';

interface SendMessageRequest {
  content: string;
  temperature?: number;
}

// Inject endpoints into the main apiSlice instead of creating a new API
export const langchainApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getThreads: builder.query<LangChainThread[], void>({
      query: () => '/langchain/threads/',
      providesTags: ['Thread']
    }),
    getThread: builder.query<ThreadResponse, string>({
      query: (threadId) => `/langchain/threads/${threadId}/`,
      providesTags: (result, error, threadId) => [
        { type: 'Thread', id: threadId },
        { type: 'Message', id: threadId }
      ]
    }),
    createThread: builder.mutation<LangChainThread, ThreadCreateRequest>({
      query: (body) => ({
        url: '/langchain/threads/',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Thread']
    }),
    deleteThread: builder.mutation<void, string>({
      query: (threadId) => ({
        url: `/langchain/threads/${threadId}/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Thread']
    }),
    sendMessage: builder.mutation<LangChainMessage[], { threadId: string; message: SendMessageRequest }>({
      query: ({ threadId, message }) => ({
        url: `/langchain/threads/${threadId}/message/`,
        method: 'POST',
        body: message
      }),
      invalidatesTags: (result, error, { threadId }) => [
        { type: 'Message', id: threadId }
      ]
    }),
    getMessages: builder.query<LangChainMessage[], string>({
      query: (threadId) => `/langchain/threads/${threadId}/history/`,
      providesTags: (result, error, threadId) => [
        { type: 'Message', id: threadId }
      ]
    })
  })
});

export const {
  useGetThreadsQuery,
  useGetThreadQuery,
  useCreateThreadMutation,
  useDeleteThreadMutation,
  useSendMessageMutation,
  useGetMessagesQuery
} = langchainApi; 