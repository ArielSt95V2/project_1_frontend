// hooks/useChat.ts

'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  useCreateThreadMutation,
  useUpdateThreadMutation,
  useDeleteThreadMutation,
  useFetchThreadsQuery,
  useFetchThreadMessagesQuery,
  useSendMessageMutation,
} from '@/redux/features/chat/chatApiSlice';
import { setThreads, setCurrentThread, setMessages, addMessage } from '@/redux/features/chat/chatSlice';
import { ChatThread, ChatMessage } from '@/types/chat';

export default function useChat() {
  const dispatch = useAppDispatch();
  const [userMessage, setUserMessage] = useState<string>('');
  const currentThread = useAppSelector((state) => state.chatbot.currentThread);
  const threads = useAppSelector((state) => state.chatbot.threads);

  // Thread operations
  const { data: fetchedThreads, isLoading: isLoadingThreads } = useFetchThreadsQuery();
  const [createThreadMutation] = useCreateThreadMutation();
  const [updateThreadMutation] = useUpdateThreadMutation();
  const [deleteThreadMutation] = useDeleteThreadMutation();

  // Message operations
  const { data: messages, isLoading: isLoadingMessages, error: messagesError } = useFetchThreadMessagesQuery(
    currentThread?.id ?? 0,
    { skip: !currentThread }
  );
  const [sendMessageMutation, { isLoading: isSending }] = useSendMessageMutation();

  // Update threads when fetched
  useEffect(() => {
    if (fetchedThreads) {
      dispatch(setThreads(fetchedThreads));
    }
  }, [fetchedThreads, dispatch]);

  // Update messages when fetched
  useEffect(() => {
    if (messages) {
      dispatch(setMessages(messages));
    }
  }, [messages, dispatch]);

  const createThread = async ({ title }: { title: string }) => {
    try {
      const thread = await createThreadMutation({ title }).unwrap();
      dispatch(setCurrentThread(thread));
      toast.success('Chat created successfully!');
    } catch (error) {
      console.error('Failed to create thread:', error);
      toast.error('Failed to create chat. Please try again.');
    }
  };

  const updateThread = async ({ threadId, title }: { threadId: number; title: string }) => {
    try {
      const updatedThread = await updateThreadMutation({ id: threadId, data: { title } }).unwrap();
      if (currentThread?.id === threadId) {
        dispatch(setCurrentThread(updatedThread));
      }
      toast.success('Chat updated successfully!');
    } catch (error) {
      console.error('Failed to update thread:', error);
      toast.error('Failed to update chat. Please try again.');
    }
  };

  const deleteThread = async (threadId: number) => {
    try {
      await deleteThreadMutation(threadId).unwrap();
      if (currentThread?.id === threadId) {
        dispatch(setCurrentThread(null));
      }
      toast.success('Chat deleted successfully!');
    } catch (error) {
      console.error('Failed to delete thread:', error);
      toast.error('Failed to delete chat. Please try again.');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserMessage(event.target.value);
  };

  const sendMessage = async ({ threadId, message }: { threadId: number; message: string }) => {
    if (!message.trim()) {
      toast.error('Message cannot be empty!');
      return;
    }

    try {
      const timestamp = new Date().toISOString();
      
      // Add user message to state immediately
      const userChatMessage: ChatMessage = {
        id: Date.now(),
        message: message.trim(),
        timestamp,
        role: 'user',
        thread: threadId,
      };
      dispatch(addMessage(userChatMessage));

      // Send message to backend
      const response = await sendMessageMutation({ thread_id: threadId, message: message.trim() }).unwrap();

      // Add assistant's reply to state
      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        message: response.message,
        timestamp,
        role: 'assistant',
        thread: threadId,
      };
      dispatch(addMessage(assistantMessage));

      toast.success('Message sent successfully!');
      setUserMessage('');
    } catch (error: any) {
      console.error('Error sending message:', error);
      if (error?.status === 429) {
        toast.error('Rate limit exceeded. Please try again later.');
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    }
  };

  return {
    threads,
    currentThread,
    messages: messages || [],
    userMessage,
    loading: isLoadingThreads || isLoadingMessages || isSending,
    error: messagesError ? 'Failed to load messages' : null,
    handleInputChange,
    createThread,
    updateThread,
    deleteThread,
    sendMessage,
  };
}
