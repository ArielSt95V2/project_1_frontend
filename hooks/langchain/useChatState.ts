import { useState, useCallback } from 'react';

export const useChatState = () => {
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

  const selectThread = useCallback((threadId: string) => {
    setActiveThreadId(threadId);
  }, []);

  const clearActiveThread = useCallback(() => {
    setActiveThreadId(null);
  }, []);

  return {
    activeThreadId,
    selectThread,
    clearActiveThread,
  };
}; 