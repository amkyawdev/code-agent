export type AgentStatus = 'idle' | 'thinking' | 'coding' | 'executing' | 'complete' | 'error';

export interface AgentTask {
  id: string;
  description: string;
  status: AgentStatus;
  result?: string;
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
}

export interface AgentState {
  currentTask: AgentTask | null;
  taskHistory: AgentTask[];
  isProcessing: boolean;
}

export interface RunTaskPayload {
  description: string;
  options?: {
    timeout?: number;
    maxRetries?: number;
  };
}