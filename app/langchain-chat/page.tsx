'use client';

import { ThreadList } from '@/components/langchain-chat/ui/ThreadList';
import { ChatWindow } from '@/components/langchain-chat/ui/ChatWindow';
import { useChatState } from '@/hooks/langchain/useChatState';
import { useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';

export default function LangChainChatPage() {
  const { activeThreadId, selectThread, clearActiveThread } = useChatState();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Clear active thread when user logs out
  useEffect(() => {
    if (!isAuthenticated && activeThreadId) {
      clearActiveThread();
    }
  }, [isAuthenticated, activeThreadId, clearActiveThread]);

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <aside className="w-[300px] border-r dark:border-gray-700">
        <ThreadList activeThread={activeThreadId} onSelectThread={selectThread} />
      </aside>
      <main className="flex-1 flex flex-col">
        <ChatWindow threadId={activeThreadId} />
      </main>
    </div>
  );
} 