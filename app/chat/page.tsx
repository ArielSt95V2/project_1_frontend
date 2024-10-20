// app/chat/page.tsx

'use client';

import React from 'react';
import { useChat } from '@/hooks/chat';
import ChatHistory from '@/components/chat/common/ChatHistory';  
import ChatForm from '@/components/chat/forms/ChatForm';
import Loader from '@/components/chat/common/Loader';

export default function Page() {
  const {
    messages,
    userMessage,
    isLoading,
    handleInputChange,
    sendChatMessage,
  } = useChat();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        <ChatHistory messages={messages} />
        {isLoading && <Loader />}
      </div>
      <div className="p-4">
        <ChatForm
          userMessage={userMessage}
          onChange={handleInputChange}
          onSubmit={sendChatMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
