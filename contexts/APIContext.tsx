import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Read from environment variables (Vercel) or process.env (development)
const getEnvVar = (key: string): string => {
  if (typeof window !== 'undefined') {
    return (window as any).ENV?.[key] || 
           (process as any).env?.[key] || 
           '';
  }
  return '';
};

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
  gemini: getEnvVar('EXPO_PUBLIC_GEMINI_API_KEY') || '',
  openai: getEnvVar('EXPO_PUBLIC_OPENAI_API_KEY') || '',
  perplexity: getEnvVar('EXPO_PUBLIC_PERPLEXITY_API_KEY') || '',
  deepseek: getEnvVar('EXPO_PUBLIC_DEEPSEEK_API_KEY') || '',
};

const APIContext = createContext<APIContextType | undefined>(undefined);

export function APIProvider({ children }: { children: ReactNode }) {
  const [apiKeys, setApiKeys] = useState<APIKeys>(defaultAPIKeys);

  useEffect(() => {
    // Check for Vercel environment variables
    const geminiKey = (typeof window !== 'undefined' && (window as any).ENV?.GEMINI_API_KEY) || '';
    const deepseekKey = (typeof window !== 'undefined' && (window as any).ENV?.DEEPSEEK_API_KEY) || '';
    
    if (geminiKey || deepseekKey) {
      setApiKeys(prev => ({
        ...prev,
        gemini: geminiKey || prev.gemini,
        deepseek: deepseekKey || prev.deepseek,
      }));
    }
  }, []);

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
