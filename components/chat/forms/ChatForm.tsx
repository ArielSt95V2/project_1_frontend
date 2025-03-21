// components/chat/forms/ChatForm.tsx

'use client';

import React, { FormEvent, ChangeEvent } from 'react';

interface Props {
  userMessage: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (message: string) => void;
  disabled?: boolean;
}

export default function ChatForm({ userMessage, onChange, onSubmit, disabled }: Props) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userMessage.trim()) {
      onSubmit(userMessage.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <textarea
        value={userMessage}
        onChange={onChange}
        placeholder="Type your message..."
        className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows={3}
        disabled={disabled}
      />
      <button
        type="submit"
        className="absolute right-3 bottom-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!userMessage.trim() || disabled}
      >
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
      </button>
    </form>
  );
}
