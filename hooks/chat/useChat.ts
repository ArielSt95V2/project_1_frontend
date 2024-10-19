// hooks/useChat.ts

'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSendMessageMutation, useFetchChatHistoryQuery } from '@/redux/features/chat/chatApiSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setMessages, addMessage } from '@/redux/features/chat/chatSlice';

// Define Message type inside useChat.ts
interface Message {
  id: number;
  content: string; // Use 'content' for consistency
  timestamp: string;
  role: 'user' | 'assistant';
}

export default function useChat() {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chatbot.messages) as Message[];
  const [userMessage, setUserMessage] = useState<string>('');

  const { data: chatHistory, isLoading: isHistoryLoading } = useFetchChatHistoryQuery();
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
  const isLoading = isHistoryLoading || isSending;

  useEffect(() => {
    if (chatHistory) {
      console.log("Fetched chat history:", chatHistory);

      // Map the fetched data to match the expected message structure
      const formattedMessages = chatHistory.map((msg: any) => ({
        id: msg.id,
        content: msg.message, // Map 'message' to 'content'
        timestamp: msg.timestamp,
        role: msg.role || (msg.id % 2 === 0 ? 'assistant' : 'user'), // Assign role if missing
      }));

      dispatch(setMessages(formattedMessages));
    }
  }, [chatHistory, dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("User input:", event.target.value);
    setUserMessage(event.target.value);
  };

  const sendChatMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("Form submitted with message:", userMessage);
    event.preventDefault();

    if (userMessage.trim() === '') {
      toast.error('Message cannot be empty!');
      return;
    }

    try {
      console.log("Sending message to backend:", userMessage);
      // Send the message to the backend
      const response = await sendMessage({ message: userMessage }).unwrap();

      console.log("Received response from backend:", response);

      const timestamp = new Date().toISOString();

      // Add user message to Redux state
      dispatch(
        addMessage({
          id: Date.now(),
          content: userMessage,
          timestamp,
          role: 'user',
        })
      );

      // Add assistant's reply to Redux state
      dispatch(
        addMessage({
          id: Date.now() + 1,
          content: response.message,
          timestamp,
          role: 'assistant',
        })
      );

      toast.success('Message sent successfully!');
    } catch (error: any) {
      console.error("Error sending message:", error);
      if (error?.status === 429) {
        toast.error('Rate limit exceeded. Please try again later.');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setUserMessage('');
    }
  };

  return {
    messages,
    userMessage,
    isLoading,
    handleInputChange,
    sendChatMessage,
  };
}
