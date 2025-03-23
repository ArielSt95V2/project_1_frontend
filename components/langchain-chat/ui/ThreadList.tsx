import { FC, useState } from 'react';
import { ThreadCard } from '../common/ThreadCard';
import { useThread } from '@/hooks/langchain/useThread';
import { useAppSelector } from '@/redux/hooks';

interface ThreadListProps {
  activeThread: string | null;
  onSelectThread: (threadId: string) => void;
}

export const ThreadList: FC<ThreadListProps> = ({ activeThread, onSelectThread }) => {
  const { threads, isLoadingThreads, createThread, deleteThread } = useThread();
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle.trim() || !isAuthenticated) return;

    try {
      setIsCreating(true);
      await createThread({ title: newThreadTitle.trim() });
      setNewThreadTitle('');
    } catch (error) {
      console.error('Failed to create thread:', error);
    } finally {
      setIsCreating(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-800">
        <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400 p-4 text-center">
          Please log in to view and create chat threads
        </div>
      </div>
    );
  }

  if (isLoadingThreads) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-800">
      <div className="p-4">
        <button
          onClick={() => setNewThreadTitle('New Chat')}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          New Chat
        </button>
      </div>
      
      {newThreadTitle && (
        <div className="px-4 pb-4">
          <form onSubmit={handleCreateThread} className="flex flex-col gap-2">
            <input
              type="text"
              value={newThreadTitle}
              onChange={(e) => setNewThreadTitle(e.target.value)}
              placeholder="Enter chat title..."
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setNewThreadTitle('')}
                className="flex-1 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newThreadTitle.trim() || isCreating}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto">
        {threads?.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8 px-4">
            No chats yet. Create one to get started!
          </div>
        ) : (
          <div className="space-y-1">
            {threads?.map((thread) => (
              <ThreadCard
                key={thread.id}
                thread={thread}
                isActive={thread.id === activeThread}
                onSelect={onSelectThread}
                onDelete={deleteThread}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 