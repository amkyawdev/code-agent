import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface APIKeys {
  gemini: string;
  openai: string;
  perplexity: string;
  deepseek: string;
}

interface APIContextType {
  apiKeys: APIKeys;
  setAPIKey: (provider: keyof APIKeys, key: string) => void;
  getAPIKey: (provider: keyof APIKeys) => string;
  isConfigured: (provider: keyof APIKeys) => boolean;
}

// Read from window.ENV (Vercel) or localStorage (fallback)
const getStoredKey = (provider: string): string => {
  if (typeof window !== 'undefined') {
    // Try Vercel exposed env vars first
    const vercelEnv = (window as any).__VERCEL_ENV__;
    if (vercelEnv && vercelEnv[provider]) {
      return vercelEnv[provider];
    }
    // Try localStorage
    const stored = localStorage.getItem(`api_key_${provider}`);
    if (stored) return stored;
  }
  return '';
};

const APIContext = createContext<APIContextType | undefined>(undefined);

export function APIProvider({ children }: { children: ReactNode }) {
  const [apiKeys, setApiKeys] = useState<APIKeys>({
    gemini: '',
    deepseek: '',
    openai: '',
    perplexity: '',
  });

  useEffect(() => {
    // Load from localStorage on mount
    const loadKeys = () => {
      setApiKeys({
        gemini: localStorage.getItem('api_key_gemini') || '',
        deepseek: localStorage.getItem('api_key_deepseek') || '',
        openai: localStorage.getItem('api_key_openai') || '',
        perplexity: localStorage.getItem('api_key_perplexity') || '',
      });
    };
    loadKeys();

    // Also check for Vercel env vars (exposed via window)
    const vercelKeys = (window as any).__VERCEL_ENV__ || {};
    if (vercelKeys.GEMINI_API_KEY || vercelKeys.DEEPSEEK_API_KEY) {
      setApiKeys(prev => ({
        gemini: vercelKeys.GEMINI_API_KEY || prev.gemini,
        deepseek: vercelKeys.DEEPSEEK_API_KEY || prev.deepseek,
        openai: prev.openai,
        perplexity: prev.perplexity,
      }));
    }
  }, []);

  const setAPIKey = (provider: keyof APIKeys, key: string) => {
    localStorage.setItem(`api_key_${provider}`, key);
    setApiKeys((prev) => ({ ...prev, [provider]: key }));
  };

  const getAPIKey = (provider: keyof APIKeys) => {
    return apiKeys[provider];
  };

  const isConfigured = (provider: keyof APIKeys) => {
    return apiKeys[provider]?.length > 0;
  };

  return (
    <APIContext.Provider value={{ apiKeys, setAPIKey, getAPIKey, isConfigured }}>
      {children}
    </APIContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error('useAPI must be used within an APIProvider');
  }
  return context;
}
