export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

export interface ChatThread {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatState {
  threads: ChatThread[];
  activeThreadId: string | null;
}

export interface SendMessagePayload {
  content: string;
  model?: string;
}