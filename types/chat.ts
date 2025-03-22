export interface Assistant {
  id: string;
  name: string;
  instructions: string;
  model: string;
  tools: any[];
  created_at: number;
}

export interface ChatMessage {
  id: number;
  message: string;
  timestamp: string;
  role: 'user' | 'assistant';
  thread: number;
  openai_message_id: string;
}

export interface ChatThread {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  openai_assistant_id: string;
  openai_thread_id: string;
  last_message: ChatMessage | null;
}

export interface CreateThreadRequest {
  title: string;
  assistant_id: string;
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
  run_id: string;
}

export interface ChatState {
  messages: ChatMessage[];
  threads: ChatThread[];
  currentThread: ChatThread | null;
  selectedAssistant: Assistant | null;
  loading: boolean;
  error: string | null;
} 