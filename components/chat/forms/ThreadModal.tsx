import React, { useState, useEffect } from 'react';
import { ChatThread, Assistant } from '@/types/chat';

interface ThreadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, assistantId: string) => void;
  thread?: ChatThread;
  assistants: Assistant[];
  isLoadingAssistants?: boolean;
}

export default function ThreadModal({
  isOpen,
  onClose,
  onSubmit,
  thread,
  assistants,
  isLoadingAssistants = false,
}: ThreadModalProps) {
  const [title, setTitle] = useState('');
  const [selectedAssistantId, setSelectedAssistantId] = useState('');

  useEffect(() => {
    if (thread) {
      setTitle(thread.title);
      setSelectedAssistantId(thread.openai_assistant_id);
    } else {
      setTitle('');
      setSelectedAssistantId('');
    }
  }, [thread]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && selectedAssistantId) {
      onSubmit(title.trim(), selectedAssistantId);
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
          <div className="mb-4">
            <label
              htmlFor="assistant"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {thread ? 'Switch AI Assistant' : 'Select AI Assistant'}
            </label>
            <select
              id="assistant"
              value={selectedAssistantId}
              onChange={(e) => setSelectedAssistantId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isLoadingAssistants}
            >
              <option value="">Choose an assistant...</option>
              {assistants.map((assistant) => (
                <option key={assistant.id} value={assistant.id}>
                  {assistant.name}
                </option>
              ))}
            </select>
            {isLoadingAssistants && (
              <p className="mt-1 text-sm text-gray-500">Loading assistants...</p>
            )}
            {selectedAssistantId && !isLoadingAssistants && (
              <p className="mt-1 text-sm text-gray-500">
                {assistants.find(a => a.id === selectedAssistantId)?.instructions}
              </p>
            )}
            {thread && selectedAssistantId !== thread.openai_assistant_id && (
              <p className="mt-2 text-sm text-yellow-600">
                Note: Switching assistants will keep the conversation history but responses may vary based on the new assistant&apos;s capabilities.
              </p>
            )}
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
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!title.trim() || !selectedAssistantId || isLoadingAssistants}
            >
              {thread ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 