import { FC, useEffect, useRef } from 'react';
import { MessageBubble } from '../common/MessageBubble';
import { useGetMessagesQuery } from '@/redux/features/langchain/langchainApiSlice';
import { ChatInput } from './ChatInput';
import { ChatSettings } from './ChatSettings';
import { useAppSelector } from '@/redux/hooks';

interface ChatWindowProps {
  threadId: string | null;
}

export const ChatWindow: FC<ChatWindowProps> = ({ threadId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  
  const { data: messages, isLoading } = useGetMessagesQuery(threadId || '', {
    skip: !threadId || !isAuthenticated,
    pollingInterval: isAuthenticated ? 3000 : 0, // Only poll when authenticated
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
        Please log in to view messages
      </div>
    );
  }

  if (!threadId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
        Select a thread to start chatting
      </div>
    );
  }

  return (
    <>
      <ChatSettings threadId={threadId} />
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages?.map((message) => (
              <MessageBubble 
                key={message.id || `${message.timestamp}-${message.content.substring(0, 10)}`} 
                message={message} 
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <div className="p-4 border-t dark:border-gray-700">
        <ChatInput threadId={threadId} />
      </div>
    </>
  );
}; 