import { openaiApi } from '@/redux/services/chat/openai_service';
import { 
  ChatMessage, 
  ChatThread, 
  CreateThreadRequest, 
  UpdateThreadRequest, 
  SendMessageRequest, 
  SendMessageResponse 
} from '@/types/chat';

// Tag types for cache invalidation
type ChatMessageTag = { type: 'ChatMessage'; id: number | 'LIST' };

// Injecting endpoints into the openaiApi
export const chatApiSlice = openaiApi.injectEndpoints({
  endpoints: (builder) => ({
    // Thread endpoints
    fetchThreads: builder.query<ChatThread[], void>({
      query: () => '/chat/threads/',
      providesTags: (result): ChatMessageTag[] =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'ChatMessage', id } as const)),
              { type: 'ChatMessage', id: 'LIST' },
            ]
          : [{ type: 'ChatMessage', id: 'LIST' }],
    }),

    createThread: builder.mutation<ChatThread, CreateThreadRequest>({
      query: (data) => ({
        url: '/chat/threads/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'ChatMessage', id: 'LIST' }],
    }),

    updateThread: builder.mutation<ChatThread, { id: number; data: UpdateThreadRequest }>({
      query: ({ id, data }) => ({
        url: `/chat/threads/${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'ChatMessage', id: 'LIST' },
        { type: 'ChatMessage', id },
      ],
    }),

    deleteThread: builder.mutation<void, number>({
      query: (id) => ({
        url: `/chat/threads/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'ChatMessage', id: 'LIST' },
        { type: 'ChatMessage', id },
      ],
    }),

    // Message endpoints
    fetchThreadMessages: builder.query<ChatMessage[], number>({
      query: (threadId) => `/chat/threads/${threadId}/messages/`,
      providesTags: (result): ChatMessageTag[] =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'ChatMessage', id } as const)),
              { type: 'ChatMessage', id: 'LIST' },
            ]
          : [{ type: 'ChatMessage', id: 'LIST' }],
    }),

    sendMessage: builder.mutation<SendMessageResponse, SendMessageRequest>({
      query: (data) => ({
        url: '/chat/message/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'ChatMessage', id: 'LIST' }],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          console.log('Message sent successfully:', data);
        } catch (error) {
          console.error('Error sending message:', error);
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchThreadsQuery,
  useCreateThreadMutation,
  useUpdateThreadMutation,
  useDeleteThreadMutation,
  useFetchThreadMessagesQuery,
  useSendMessageMutation,
} = chatApiSlice;
