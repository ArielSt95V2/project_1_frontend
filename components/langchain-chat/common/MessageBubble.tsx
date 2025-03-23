import { FC } from 'react';
import { format } from 'date-fns';
import { LangChainMessage } from '@/types/langchain-chat';
import ReactMarkdown from 'react-markdown';

interface MessageBubbleProps {
  message: LangChainMessage;
}

export const MessageBubble: FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
        }`}
      >
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
        <div
          className={`text-xs mt-1 ${
            isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {format(new Date(message.timestamp), 'h:mm a')}
        </div>
      </div>
    </div>
  );
}; 