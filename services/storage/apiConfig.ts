import AsyncStorage from '@react-native-async-storage/async-storage';
import { APIKeys } from '@/contexts/APIContext';

const API_CONFIG_KEY = 'api_config';

interface APIConfig {
  keys: APIKeys;
  activeProvider: string;
  lastUpdated: string;
}

export class APIConfigStorage {
  async saveAPIKeys(keys: APIKeys): Promise<void> {
    try {
      const config: APIConfig = {
        keys,
        activeProvider: this.getPrimaryProvider(keys),
        lastUpdated: new Date().toISOString(),
      };
      await AsyncStorage.setItem(API_CONFIG_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Failed to save API keys:', error);
      throw error;
    }
  }

  async loadAPIKeys(): Promise<APIKeys | null> {
    try {
      const data = await AsyncStorage.getItem(API_CONFIG_KEY);
      if (!data) return null;
      
      const config: APIConfig = JSON.parse(data);
      return config.keys;
    } catch (error) {
      console.error('Failed to load API keys:', error);
      return null;
    }
  }

  async clearAPIKeys(): Promise<void> {
    try {
      await AsyncStorage.removeItem(API_CONFIG_KEY);
    } catch (error) {
      console.error('Failed to clear API keys:', error);
      throw error;
    }
  }

  async hasAPIKeys(): Promise<boolean> {
    const keys = await this.loadAPIKeys();
    if (!keys) return false;
    
    return Object.values(keys).some((key) => key && key.length > 0);
  }

  private getPrimaryProvider(keys: APIKeys): string {
    const order = ['deepseek', 'openai', 'gemini', 'perplexity'] as const;
    
    for (const provider of order) {
      if (keys[provider] && keys[provider].length > 0) {
        return provider;
      }
    }
    
    return 'deepseek';
  }

  async getActiveProvider(): Promise<string> {
    try {
      const data = await AsyncStorage.getItem(API_CONFIG_KEY);
      if (!data) return 'deepseek';
      
      const config: APIConfig = JSON.parse(data);
      return config.activeProvider || 'deepseek';
    } catch (error) {
      return 'deepseek';
    }
  }
}

export default APIConfigStorage;