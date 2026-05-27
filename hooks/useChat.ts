import { useState, useCallback } from 'react';

export function useChatLoader() {
  const [isLoading, setIsLoading] = useState(false);

  return {
    isLoading,
    setIsLoading,
  };
}

export default useChatLoader;
