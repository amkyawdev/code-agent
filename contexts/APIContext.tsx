import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface APIKeys {
  gemini: string;
  deepseek: string;
  openai: string;
  perplexity: string;
}

interface APIContextType {
  apiKeys: APIKeys;
  setAPIKey: (provider: keyof APIKeys, key: string) => void;
  getAPIKey: (provider: keyof APIKeys) => string;
  isConfigured: (provider: keyof APIKeys) => boolean;
}

const APIContext = createContext<APIContextType | undefined>(undefined);

export function APIProvider({ children }: { children: ReactNode }) {
  const [apiKeys, setApiKeys] = useState<APIKeys>({
    gemini: '',
    deepseek: '',
    openai: '',
    perplexity: '',
  });

  useEffect(() => {
    // Fetch from Vercel API route (server-side env vars)
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        setApiKeys({
          gemini: data.gemini || '',
          deepseek: data.deepseek || '',
          openai: '',
          perplexity: '',
        });
      })
      .catch(() => {
        // Fallback to localStorage
        try {
          const stored = localStorage.getItem('api_keys');
          if (stored) {
            const parsed = JSON.parse(stored);
            setApiKeys(prev => ({
              ...prev,
              gemini: parsed.gemini || prev.gemini,
              deepseek: parsed.deepseek || prev.deepseek,
            }));
          }
        } catch {}
      });
  }, []);

  const setAPIKey = (provider: keyof APIKeys, key: string) => {
    try {
      const stored = localStorage.getItem('api_keys');
      const keys = stored ? JSON.parse(stored) : {};
      keys[provider] = key;
      localStorage.setItem('api_keys', JSON.stringify(keys));
    } catch {}
    setApiKeys(prev => ({ ...prev, [provider]: key }));
  };

  const getAPIKey = (provider: keyof APIKeys) => apiKeys[provider];

  const isConfigured = (provider: keyof APIKeys) => !!apiKeys[provider];

  return (
    <APIContext.Provider value={{ apiKeys, setAPIKey, getAPIKey, isConfigured }}>
      {children}
    </APIContext.Provider>
  );
}

export function useAPI() {
  const context = useContext(APIContext);
  if (!context) throw new Error('useAPI must be used within APIProvider');
  return context;
}
