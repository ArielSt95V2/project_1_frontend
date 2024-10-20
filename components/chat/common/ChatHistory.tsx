// components/chat/ChatHistory.tsx

import React from 'react';
import UserMessage from './UserMessage';
import BotResponse from './BotResponse';

// Define Message type here
interface Message {
  id: number;
  content: string;
  timestamp: string;
  role: 'user' | 'assistant';
}

interface Props {
  messages: Message[];
}

export default function ChatHistory({ messages }: Props) {
  return (
    <div className="flex flex-col space-y-2 p-4 overflow-y-auto">
      {messages.map((message) =>
        message.role === 'user' ? (
          <UserMessage
            key={message.id}
            content={message.content}
            timestamp={message.timestamp}
          />
        ) : (
          <BotResponse
            key={message.id}
            content={message.content}
            timestamp={message.timestamp}
          />
        )
      )}
    </div>
  );
}
