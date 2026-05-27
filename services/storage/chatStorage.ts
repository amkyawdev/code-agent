import AsyncStorage from '@react-native-async-storage/async-storage';
import { Message } from '@/types/chat';

const CHAT_HISTORY_KEY = 'chat_history';

interface ChatHistoryItem {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export class ChatStorage {
  async saveChat(chat: Omit<ChatHistoryItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const id = `chat_${Date.now()}`;
    const now = new Date().toISOString();
    
    const item: ChatHistoryItem = {
      ...chat,
      id,
      createdAt: now,
      updatedAt: now,
    };

    try {
      const existing = await this.getAllChats();
      existing.unshift(item);
      
      // Keep only last 100 chats
      const trimmed = existing.slice(0, 100);
      await AsyncStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(trimmed));
      
      return id;
    } catch (error) {
      console.error('Failed to save chat:', error);
      throw error;
    }
  }

  async updateChat(id: string, messages: Message[]): Promise<void> {
    try {
      const existing = await this.getAllChats();
      const index = existing.findIndex((chat) => chat.id === id);
      
      if (index !== -1) {
        existing[index].messages = messages;
        existing[index].updatedAt = new Date().toISOString();
        await AsyncStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(existing));
      }
    } catch (error) {
      console.error('Failed to update chat:', error);
      throw error;
    }
  }

  async getChat(id: string): Promise<ChatHistoryItem | null> {
    try {
      const existing = await this.getAllChats();
      return existing.find((chat) => chat.id === id) || null;
    } catch (error) {
      console.error('Failed to get chat:', error);
      return null;
    }
  }

  async getAllChats(): Promise<ChatHistoryItem[]> {
    try {
      const data = await AsyncStorage.getItem(CHAT_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get all chats:', error);
      return [];
    }
  }

  async deleteChat(id: string): Promise<void> {
    try {
      const existing = await this.getAllChats();
      const filtered = existing.filter((chat) => chat.id !== id);
      await AsyncStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to delete chat:', error);
      throw error;
    }
  }

  async clearAllChats(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CHAT_HISTORY_KEY);
    } catch (error) {
      console.error('Failed to clear all chats:', error);
      throw error;
    }
  }

  generateTitle(messages: Message[]): string {
    if (messages.length === 0) return 'New Chat';
    
    const firstUserMessage = messages.find((m) => m.role === 'user');
    if (!firstUserMessage) return 'New Chat';

    const title = firstUserMessage.content.substring(0, 50);
    return title.length < firstUserMessage.content.length ? `${title}...` : title;
  }
}

export default ChatStorage;