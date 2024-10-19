// components/chat/ChatForm.tsx

'use client';

import React, { ChangeEvent, FormEvent } from 'react';
import { Spinner } from '@/components/common';

interface Props {
  userMessage: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export default function ChatForm({
  userMessage,
  onChange,
  onSubmit,
  isLoading,
}: Props) {
  return (
    <form className="flex items-center" onSubmit={onSubmit}>
      <input
        type="text"
        name="message"
        value={userMessage}
        onChange={onChange}
        placeholder="Type your message..."
        className="flex-1 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="ml-2 rounded-md bg-blue-800 px-3 py-1.5 font-semibold leading-6 text-white"
        disabled={isLoading}
      >
        {isLoading ? <Spinner sm /> : 'Send'}
      </button>
    </form>
  );
}
