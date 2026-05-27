import React, { createContext, useContext, useState, ReactNode } from 'react';

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

const defaultAPIKeys: APIKeys = {
  gemini: '',
  openai: '',
  perplexity: '',
  deepseek: '',
};

const APIContext = createContext<APIContextType | undefined>(undefined);

export function APIProvider({ children }: { children: ReactNode }) {
  const [apiKeys, setApiKeys] = useState<APIKeys>(defaultAPIKeys);

  const setAPIKey = (provider: keyof APIKeys, key: string) => {
    setApiKeys((prev) => ({ ...prev, [provider]: key }));
  };

  const getAPIKey = (provider: keyof APIKeys) => {
    return apiKeys[provider];
  };

  const isConfigured = (provider: keyof APIKeys) => {
    return apiKeys[provider].length > 0;
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