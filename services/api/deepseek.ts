import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'https://api.deepseek.com/v1';

interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface DeepSeekRequest {
  model: string;
  messages: DeepSeekMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

interface DeepSeekResponse {
  id: string;
  model: string;
  choices: Array<{
    message: DeepSeekMessage;
    finish_reason: string;
    index: number;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class DeepSeekService {
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
    model: string = 'deepseek-chat',
    messages: Array<{ role: string; content: string }>,
    options: { temperature?: number; maxTokens?: number } = {}
  ): Promise<string> {
    const request: DeepSeekRequest = {
      model,
      messages: messages as DeepSeekMessage[],
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 2048,
    };

    try {
      const response = await this.client.post<DeepSeekResponse>('/chat/completions', request);

      const choice = response.data.choices[0];
      if (!choice) {
        throw new Error('No response from DeepSeek');
      }

      return choice.message.content;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`DeepSeek API Error: ${error.response.data.error?.message || error.message}`);
      }
      throw error;
    }
  }

  async listModels(): Promise<string[]> {
    // DeepSeek models
    return ['deepseek-chat', 'deepseek-coder'];
  }
}

export default DeepSeekService;