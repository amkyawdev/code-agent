import { useState, useCallback } from 'react';
import { useChat } from '@/contexts/ChatContext';

export function useChat() {
  const [isLoading, setIsLoading] = useState(false);

  return {
    isLoading,
  };
}

export default function useChatHook() {
  return useChat();
}