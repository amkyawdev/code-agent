export interface APIKeyConfig {
  key: string;
  isValid: boolean;
  lastValidated?: Date;
}

export interface APIProvider {
  id: string;
  name: string;
  key: string;
  endpoint: string;
  models: string[];
  status: 'active' | 'inactive' | 'error';
}

export interface APIConfig {
  providers: {
    gemini: APIKeyConfig;
    openai: APIKeyConfig;
    perplexity: APIKeyConfig;
    deepseek: APIKeyConfig;
  };
  defaultProvider: string;
  fallbackEnabled: boolean;
}

export interface ChatCompletionRequest {
  model: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  temperature?: number;
  max_tokens?: number;
}

export interface ChatCompletionResponse {
  id: string;
  model: string;
  choices: Array<{
    message: {
      role: 'assistant';
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}