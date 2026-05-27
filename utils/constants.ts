// AI Model Providers
export const AI_PROVIDERS = {
  GEMINI: 'gemini',
  OPENAI: 'openai',
  PERPLEXITY: 'perplexity',
  DEEPSEEK: 'deepseek',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  gemini: 'https://generativelanguage.googleapis.com/v1beta',
  openai: 'https://api.openai.com/v1',
  perplexity: 'https://api.perplexity.ai',
  deepseek: 'https://api.deepseek.com/v1',
};

// Color Theme
export const COLORS = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  accent: '#06b6d4',
  dark: '#0a0a0a',
  'dark-secondary': '#1a1a1a',
  'dark-tertiary': '#262626',
  'text-primary': '#ffffff',
  'text-secondary': '#a3a3a3',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
};

// Animation Durations
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

// Storage Keys
export const STORAGE_KEYS = {
  API_KEYS: 'api_keys',
  CHAT_HISTORY: 'chat_history',
  SETTINGS: 'settings',
  THEME: 'theme',
};

// Status Messages
export const STATUS_MESSAGES = {
  THINKING: 'Thinking...',
  PROCESSING: 'Processing...',
  GENERATING: 'Generating response...',
  COMPLETE: 'Complete',
  ERROR: 'Error occurred',
};