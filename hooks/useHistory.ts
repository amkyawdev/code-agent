import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface HistoryItem {
  id: string;
  title: string;
  date: Date;
  messages: number;
  model: string;
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // Load history from storage
    setHistory([]);
  }, []);

  const deleteItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    setHistory([]);
  };

  return {
    history,
    deleteItem,
    clearAll,
  };
}

export default useHistory;
