export interface LangChainThread {
  id: string;
  title: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  model_name: string;
  metadata: Record<string, any>;
}

export interface LangChainMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: string;
  thread_id: string;
  metadata: Record<string, any>;
}

export interface ThreadCreateRequest {
  title: string;
  model_name?: string;
}

export interface ThreadResponse {
  thread: LangChainThread;
  messages: LangChainMessage[];
}

export interface ThreadState {
  threads: LangChainThread[];
  activeThread: string | null;
  loading: boolean;
  error: string | null;
} 