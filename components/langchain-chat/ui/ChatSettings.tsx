import { FC, useState, useEffect } from 'react';

interface ChatSettingsProps {
  threadId: string | null;
}

export const ChatSettings: FC<ChatSettingsProps> = ({ threadId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [temperature, setTemperature] = useState(() => {
    if (typeof window !== 'undefined' && threadId) {
      const saved = localStorage.getItem(`chatTemperature_${threadId}`);
      return saved ? parseFloat(saved) : 0.7;
    }
    return 0.7;
  });

  useEffect(() => {
    if (threadId) {
      const saved = localStorage.getItem(`chatTemperature_${threadId}`);
      setTemperature(saved ? parseFloat(saved) : 0.7);
    }
  }, [threadId]);

  useEffect(() => {
    if (threadId) {
      localStorage.setItem(`chatTemperature_${threadId}`, temperature.toString());
    }
  }, [temperature, threadId]);

  return (
    <div className="border-b dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
      <div className="relative">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span className="font-medium text-gray-900 dark:text-gray-100">LangChain Chat</span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Temperature: {temperature}</span>
          </button>
        </div>

        {isOpen && (
          <div className="absolute right-0 top-full mt-1 w-64 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-md p-4 z-50">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="temperature"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Temperature: {temperature}
                </label>
                <input
                  type="range"
                  id="temperature"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full mt-1"
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Lower values make responses more focused and deterministic. Higher values make responses more creative and varied.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 