import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

interface GeminiMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

interface GeminiRequest {
  contents: GeminiMessage[];
  generationConfig?: {
    temperature?: number;
    topP?: number;
    topK?: number;
    maxOutputTokens?: number;
  };
}

interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{ text: string }>;
      role: string;
    };
    finishReason: string;
  }>;
  error?: {
    message: string;
    code: number;
  };
}

export class GeminiService {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
    });
  }

  async generateContent(
    model: string = 'gemini-pro',
    messages: Array<{ role: string; content: string }>,
    options: { temperature?: number; maxTokens?: number } = {}
  ): Promise<string> {
    const contents: GeminiMessage[] = messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const request: GeminiRequest = {
      contents,
      generationConfig: {
        temperature: options.temperature ?? 0.9,
        maxOutputTokens: options.maxTokens ?? 2048,
      },
    };

    try {
      const response = await this.client.post<GeminiResponse>(
        `/models/${model}:generateContent?key=${this.apiKey}`,
        request
      );

      if (response.data.error) {
        throw new Error(response.data.error.message);
      }

      const candidate = response.data.candidates?.[0];
      if (!candidate) {
        throw new Error('No response from Gemini');
      }

      return candidate.content.parts[0]?.text || '';
    } catch (error: any) {
      if (error.response) {
        throw new Error(`Gemini API Error: ${error.response.data.error?.message || error.message}`);
      }
      throw error;
    }
  }

  async listModels(): Promise<string[]> {
    try {
      const response = await this.client.get(`/models?key=${this.apiKey}`);
      return response.data.models?.map((m: any) => m.name.split('/').pop()) || [];
    } catch (error) {
      console.error('Failed to list models:', error);
      return [];
    }
  }
}

export default GeminiService;