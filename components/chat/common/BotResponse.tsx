// components/chat/BotResponse.tsx

import React from 'react';

interface Props {
  content: string;
  timestamp: string;
}

export default function BotResponse({ content, timestamp }: Props) {
  return (
    <div className="flex justify-start mb-2">
      <div className="bg-gray-300 text-black rounded-lg p-2 max-w-xs">
        <div>{content}</div>
        <div className="text-xs text-gray-600 text-right">
          {new Date(timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
