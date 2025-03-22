// app/chat/page.tsx

'use client';

import React, { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import useChat from '@/hooks/chat/useChat';
import ThreadList from '@/components/chat/common/ThreadList';
import ThreadModal from '@/components/chat/forms/ThreadModal';
import ChatHistory from '@/components/chat/common/ChatHistory';
import ChatForm from '@/components/chat/forms/ChatForm';
import { ChatThread } from '@/types/chat';

export default function ChatPage() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState<ChatThread | undefined>(undefined);
  
  const {
    threads,
    currentThread,
    messages,
    userMessage,
    assistants,
    loading,
    isLoadingAssistants,
    error,
    handleInputChange,
    createThread,
    updateThread,
    deleteThread,
    sendMessage,
  } = useChat();

  const handleCreateThread = (title: string, assistantId: string) => {
    createThread({ title, assistantId });
  };

  const handleEditThread = (thread: ChatThread) => {
    setSelectedThread(thread);
    setIsModalOpen(true);
  };

  const handleUpdateThread = (title: string) => {
    if (selectedThread) {
      updateThread({ threadId: selectedThread.id, title });
    }
  };

  const handleDeleteThread = (threadId: number) => {
    if (window.confirm('Are you sure you want to delete this chat?')) {
      deleteThread(threadId);
    }
  };

  const handleSendMessage = (message: string) => {
    if (currentThread) {
      sendMessage({ threadId: currentThread.id, message });
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <ThreadList
        threads={threads}
        currentThread={currentThread}
        onCreateThread={() => {
          setSelectedThread(undefined);
          setIsModalOpen(true);
        }}
        onEditThread={handleEditThread}
        onDeleteThread={handleDeleteThread}
      />
      
      <div className="flex-1 flex flex-col">
        {currentThread ? (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <ChatHistory messages={messages} loading={loading} error={error} />
            </div>
            <div className="p-4 border-t">
              <ChatForm
                userMessage={userMessage}
                onChange={handleInputChange}
                onSubmit={handleSendMessage}
                disabled={loading}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat or create a new one to start messaging
          </div>
        )}
      </div>

      <ThreadModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedThread(undefined);
        }}
        onSubmit={selectedThread ? handleUpdateThread : handleCreateThread}
        thread={selectedThread}
        assistants={assistants}
        isLoadingAssistants={isLoadingAssistants}
      />
    </div>
  );
}
