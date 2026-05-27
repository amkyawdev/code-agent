import { useState } from 'react';

export function useChat() {
  const [isLoading, setIsLoading] = useState(false);

  return {
    isLoading,
    setIsLoading,
  };
}

export default useChat;
