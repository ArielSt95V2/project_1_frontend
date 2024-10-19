import { openaiApi } from '@/redux/services/chat/openai_service';

// Defining the interface for a chat message
interface ChatMessage {
  id: number;
  content: string;
  timestamp: string;
  role: 'user' | 'assistant'; // Add role here
}

// Defining the interface for the chat response
interface ChatResponse {
  message: string;
}

// Defining the arguments for sending a message to the chatbot
interface SendMessageArgs {
  message: string;
}

// Defining the tag type
type ChatMessageTag = { type: 'ChatMessage'; id: number | 'LIST' };

// Injecting endpoints into the openaiApi
export const chatApiSlice = openaiApi.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint to fetch chat history
    fetchChatHistory: builder.query<ChatMessage[], void>({
      query: () => '/chat/history/',
      providesTags: (result): ChatMessageTag[] =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'ChatMessage', id } as const)),
              { type: 'ChatMessage', id: 'LIST' },
            ]
          : [{ type: 'ChatMessage', id: 'LIST' }],
    }),

    // Endpoint to send a message to the chatbot and receive a response
    sendMessage: builder.mutation<ChatResponse, SendMessageArgs>({
      query: ({ message }) => {
        console.log('Sending API Request:', { message }); // Log request details
        return {
          url: '/chat/message/', // Backend endpoint
          method: 'POST',
          body: { message },
        };
      },
      invalidatesTags: [{ type: 'ChatMessage', id: 'LIST' }], // Invalidate cache
      onQueryStarted: (arg, { queryFulfilled }) => {
        queryFulfilled.then(
          ({ data }) => console.log('API Success:', data), // Log success
          (error) => console.error('API Error:', error) // Log any error
        );
      },
    }),
  }),
  overrideExisting: false, // Prevent overwriting existing endpoints
});

export const { useFetchChatHistoryQuery, useSendMessageMutation } = chatApiSlice;
