import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'https://api.perplexity.ai';

interface PerplexityMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface PerplexityRequest {
  model: string;
  messages: PerplexityMessage[];
  temperature?: number;
  max_tokens?: number;
}

interface PerplexityResponse {
  id: string;
  model: string;
  choices: Array<{
    message: PerplexityMessage;
    finish_reason: string;
    index: number;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class PerplexityService {
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
    model: string = 'sonar',
    messages: Array<{ role: string; content: string }>,
    options: { temperature?: number; maxTokens?: number } = {}
  ): Promise<string> {
    const request: PerplexityRequest = {
      model,
      messages: messages as PerplexityMessage[],
      temperature: options.temperature ?? 0.2,
      max_tokens: options.maxTokens ?? 2048,
    };

    try {
      const response = await this.client.post<PerplexityResponse>('/chat/completions', request);

      const choice = response.data.choices[0];
      if (!choice) {
        throw new Error('No response from Perplexity');
      }

      return choice.message.content;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`Perplexity API Error: ${error.response.data.error?.message || error.message}`);
      }
      throw error;
    }
  }

  async listModels(): Promise<string[]> {
    // Perplexity uses a fixed set of models
    return ['sonar', 'sonar-pro', 'sonar-reasoning'];
  }
}

export default PerplexityService;