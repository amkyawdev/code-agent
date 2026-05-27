import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'https://api.openai.com/v1';

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIRequest {
  model: string;
  messages: OpenAIMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stream?: boolean;
}

interface OpenAIResponse {
  id: string;
  model: string;
  choices: Array<{
    message: OpenAIMessage;
    finish_reason: string;
    index: number;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class OpenAIService {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
  }

  async chat(
    model: string = 'gpt-4',
    messages: Array<{ role: string; content: string }>,
    options: { temperature?: number; maxTokens?: number } = {}
  ): Promise<string> {
    const request: OpenAIRequest = {
      model,
      messages: messages as OpenAIMessage[],
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 2048,
    };

    try {
      const response = await this.client.post<OpenAIResponse>('/chat/completions', request);

      const choice = response.data.choices[0];
      if (!choice) {
        throw new Error('No response from OpenAI');
      }

      return choice.message.content;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`OpenAI API Error: ${error.response.data.error?.message || error.message}`);
      }
      throw error;
    }
  }

  async listModels(): Promise<string[]> {
    try {
      const response = await this.client.get('/models');
      return response.data.data?.map((m: any) => m.id) || [];
    } catch (error) {
      console.error('Failed to list models:', error);
      return [];
    }
  }
}

export default OpenAIService;