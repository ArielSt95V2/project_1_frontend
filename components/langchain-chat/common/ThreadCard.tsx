import { FC } from 'react';
import { LangChainThread } from '@/types/langchain-chat';

interface ThreadCardProps {
  thread: LangChainThread;
  isActive: boolean;
  onSelect: (threadId: string) => void;
  onDelete: (threadId: string) => void;
}

export const ThreadCard: FC<ThreadCardProps> = ({
  thread,
  isActive,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className={`flex items-center justify-between p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
        isActive ? 'bg-gray-200 dark:bg-gray-700' : ''
      }`}
      onClick={() => onSelect(thread.id)}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {thread.title}
          </p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {new Date(thread.updated_at).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm('Are you sure you want to delete this chat?')) {
              onDelete(thread.id);
            }
          }}
          className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
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
  );
}; 