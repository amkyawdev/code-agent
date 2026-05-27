import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = 'app_settings';

interface AppSettings {
  theme: 'dark' | 'light';
  language: string;
  fontSize: 'small' | 'medium' | 'large';
  notifications: boolean;
  soundEnabled: boolean;
  autoSave: boolean;
  maxHistory: number;
}

const defaultSettings: AppSettings = {
  theme: 'dark',
  language: 'en',
  fontSize: 'medium',
  notifications: true,
  soundEnabled: true,
  autoSave: true,
  maxHistory: 100,
};

export class SettingsStorage {
  async getSettings(): Promise<AppSettings> {
    try {
      const data = await AsyncStorage.getItem(SETTINGS_KEY);
      if (!data) return defaultSettings;
      
      return { ...defaultSettings, ...JSON.parse(data) };
    } catch (error) {
      console.error('Failed to get settings:', error);
      return defaultSettings;
    }
  }

  async updateSettings(updates: Partial<AppSettings>): Promise<void> {
    try {
      const current = await this.getSettings();
      const updated = { ...current, ...updates };
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to update settings:', error);
      throw error;
    }
  }

  async resetSettings(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SETTINGS_KEY);
    } catch (error) {
      console.error('Failed to reset settings:', error);
      throw error;
    }
  }

  async updateTheme(theme: 'dark' | 'light'): Promise<void> {
    await this.updateSettings({ theme });
  }

  async updateFontSize(fontSize: 'small' | 'medium' | 'large'): Promise<void> {
    await this.updateSettings({ fontSize });
  }
}

export default SettingsStorage;