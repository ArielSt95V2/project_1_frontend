export interface ChatMessage {
  id: number;
  message: string;
  timestamp: string;
  role: 'user' | 'assistant';
  thread: number;
}

export interface ChatThread {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface CreateThreadRequest {
  title: string;
}

export interface UpdateThreadRequest {
  title: string;
}

export interface SendMessageRequest {
  thread_id: number;
  message: string;
}

export interface SendMessageResponse {
  message: string;
  thread_id: number;
}

export interface ChatState {
  messages: ChatMessage[];
  threads: ChatThread[];
  currentThread: ChatThread | null;
  loading: boolean;
  error: string | null;
} 