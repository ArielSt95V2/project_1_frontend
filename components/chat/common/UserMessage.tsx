// components/chat/UserMessage.tsx

import React from 'react';

interface Props {
  content: string;
  timestamp: string;
}

export default function UserMessage({ content, timestamp }: Props) {
  return (
    <div className="flex justify-end mb-2">
      <div className="bg-blue-500 text-white rounded-lg p-2 max-w-xs">
        <div>{content}</div>
        <div className="text-xs text-gray-200 text-right">
          {new Date(timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
