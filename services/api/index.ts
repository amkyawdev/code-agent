import GeminiService from './gemini';
import OpenAIService from './openai';
import PerplexityService from './perplexity';
import DeepSeekService from './deepseek';

export type AIProvider = 'gemini' | 'openai' | 'perplexity' | 'deepseek';

export interface AIResponse {
  content: string;
  provider: AIProvider;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export class AIServiceRouter {
  private services: Record<AIProvider, any>;
  private activeProvider: AIProvider;
  private apiKeys: Record<AIProvider, string>;

  constructor(apiKeys: Record<AIProvider, string>) {
    this.apiKeys = apiKeys;
    this.activeProvider = 'deepseek';
    
    this.services = {
      gemini: apiKeys.gemini ? new GeminiService(apiKeys.gemini) : null,
      openai: apiKeys.openai ? new OpenAIService(apiKeys.openai) : null,
      perplexity: apiKeys.perplexity ? new PerplexityService(apiKeys.perplexity) : null,
      deepseek: apiKeys.deepseek ? new DeepSeekService(apiKeys.deepseek) : null,
    };
  }

  setActiveProvider(provider: AIProvider) {
    if (!this.services[provider]) {
      throw new Error(`${provider} is not configured`);
    }
    this.activeProvider = provider;
  }

  getActiveProvider(): AIProvider {
    return this.activeProvider;
  }

  getAvailableProviders(): AIProvider[] {
    return Object.entries(this.services)
      .filter(([_, service]) => service !== null)
      .map(([name]) => name as AIProvider);
  }

  async sendMessage(
    messages: Array<{ role: string; content: string }>,
    provider?: AIProvider,
    options?: { temperature?: number; maxTokens?: number }
  ): Promise<AIResponse> {
    const targetProvider = provider || this.activeProvider;
    const service = this.services[targetProvider];

    if (!service) {
      throw new Error(`${targetProvider} is not configured`);
    }

    try {
      let content: string;
      let model: string;

      switch (targetProvider) {
        case 'gemini':
          content = await service.generateContent('gemini-pro', messages, options);
          model = 'gemini-pro';
          break;
        case 'openai':
          content = await service.chat('gpt-4', messages, options);
          model = 'gpt-4';
          break;
        case 'perplexity':
          content = await service.chat('sonar', messages, options);
          model = 'sonar';
          break;
        case 'deepseek':
          content = await service.chat('deepseek-chat', messages, options);
          model = 'deepseek-chat';
          break;
        default:
          throw new Error('Unknown provider');
      }

      return {
        content,
        provider: targetProvider,
        model,
      };
    } catch (error) {
      console.error(`${targetProvider} error:`, error);
      throw error;
    }
  }

  async sendMessageWithFallback(
    messages: Array<{ role: string; content: string }>,
    options?: { temperature?: number; maxTokens?: number }
  ): Promise<AIResponse> {
    const providers = this.getAvailableProviders();
    
    for (const provider of providers) {
      try {
        return await this.sendMessage(messages, provider, options);
      } catch (error) {
        console.warn(`Fallback: ${provider} failed, trying next...`);
        continue;
      }
    }

    throw new Error('All AI providers failed');
  }
}

export { GeminiService, OpenAIService, PerplexityService, DeepSeekService };
export default AIServiceRouter;