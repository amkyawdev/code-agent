import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HistoryItem {
  id: string;
  title: string;
  date: Date;
  messages: number;
  model: string;
  preview: string;
}

interface HistoryContextType {
  history: HistoryItem[];
  addItem: (item: Omit<HistoryItem, 'id' | 'date'>) => void;
  deleteItem: (id: string) => void;
  clearAll: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem('chat_history');
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistory(parsed.map((item: any) => ({
          ...item,
          date: new Date(item.date),
        })));
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  const saveHistory = async (items: HistoryItem[]) => {
    try {
      await AsyncStorage.setItem('chat_history', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  };

  const addItem = (item: Omit<HistoryItem, 'id' | 'date'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: Date.now().toString(),
      date: new Date(),
    };
    setHistory((prev) => {
      const updated = [newItem, ...prev];
      saveHistory(updated);
      return updated;
    });
  };

  const deleteItem = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveHistory(updated);
      return updated;
    });
  };

  const clearAll = () => {
    setHistory([]);
    saveHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addItem, deleteItem, clearAll }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistoryContext() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistoryContext must be used within a HistoryProvider');
  }
  return context;
}