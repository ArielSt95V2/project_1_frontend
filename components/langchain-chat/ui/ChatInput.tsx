import { FC, useState, FormEvent } from 'react';
import { useSendMessageMutation } from '@/redux/features/langchain/langchainApiSlice';

interface ChatInputProps {
  threadId: string;
}

export const ChatInput: FC<ChatInputProps> = ({ threadId }) => {
  const [message, setMessage] = useState('');
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    try {
      const temperature = localStorage.getItem(`chatTemperature_${threadId}`);
      await sendMessage({
        threadId,
        message: {
          content: message.trim(),
          temperature: temperature ? parseFloat(temperature) : 0.7,
        },
      });
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="w-full p-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
        rows={3}
        disabled={isLoading}
      />
      <button
        type="submit"
        className="absolute right-3 bottom-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!message.trim() || isLoading}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        )}
      </button>
    </form>
  );
}; 