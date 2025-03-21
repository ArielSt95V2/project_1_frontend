import React, { useState, useEffect } from 'react';
import { ChatThread } from '@/types/chat';

interface ThreadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
  thread?: ChatThread;
}

export default function ThreadModal({
  isOpen,
  onClose,
  onSubmit,
  thread,
}: ThreadModalProps) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (thread) {
      setTitle(thread.title);
    } else {
      setTitle('');
    }
  }, [thread]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {thread ? 'Edit Chat' : 'New Chat'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter chat title"
              autoFocus
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={!title.trim()}
            >
              {thread ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 