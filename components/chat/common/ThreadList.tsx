import React from 'react';
import { ChatThread } from '@/types/chat';
import { useAppDispatch } from '@/redux/hooks';
import { setCurrentThread } from '@/redux/features/chat/chatSlice';

interface ThreadListProps {
  threads: ChatThread[];
  currentThread: ChatThread | null;
  onCreateThread: () => void;
  onEditThread: (thread: ChatThread) => void;
  onDeleteThread: (threadId: number) => void;
}

export default function ThreadList({
  threads,
  currentThread,
  onCreateThread,
  onEditThread,
  onDeleteThread,
}: ThreadListProps) {
  const dispatch = useAppDispatch();

  const handleThreadClick = (thread: ChatThread) => {
    dispatch(setCurrentThread(thread));
  };

  return (
    <div className="w-64 h-full bg-gray-100 border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <button
          onClick={onCreateThread}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          New Chat
        </button>
      </div>
      
      <div className="space-y-1">
        {threads.map((thread) => (
          <div
            key={thread.id}
            className={`flex items-center justify-between p-3 cursor-pointer hover:bg-gray-200 ${
              currentThread?.id === thread.id ? 'bg-gray-200' : ''
            }`}
            onClick={() => handleThreadClick(thread)}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {thread.title}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(thread.updated_at).toLocaleDateString()}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 ml-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditThread(thread);
                }}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteThread(thread.id);
                }}
                className="p-1 text-gray-500 hover:text-red-600"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 