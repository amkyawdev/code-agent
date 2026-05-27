import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Conversation {
  id: string;
  title: string;
  type: 'chat' | 'coder';
  messages: { role: string; content: string }[];
  createdAt: number;
  updatedAt: number;
}

interface HistoryContextType {
  conversations: Conversation[];
  saveConversation: (conv: Omit<Conversation, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteConversation: (id: string) => void;
  getConversation: (id: string) => Conversation | undefined;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

const STORAGE_KEY = '@code_agent_history';

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setConversations(JSON.parse(stored));
    } catch {}
  };

  const saveHistory = (data: Conversation[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  };

  const saveConversation = (conv: Omit<Conversation, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = Date.now();
    const newConv: Conversation = {
      ...conv,
      id: now.toString(),
      createdAt: now,
      updatedAt: now,
    };
    const updated = [newConv, ...conversations].slice(0, 50); // Keep last 50
    setConversations(updated);
    saveHistory(updated);
  };

  const deleteConversation = (id: string) => {
    const updated = conversations.filter(c => c.id !== id);
    setConversations(updated);
    saveHistory(updated);
  };

  const getConversation = (id: string) => {
    return conversations.find(c => c.id === id);
  };

  return (
    <HistoryContext.Provider value={{ conversations, saveConversation, deleteConversation, getConversation }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) throw new Error('useHistory must be used within HistoryProvider');
  return context;
}
