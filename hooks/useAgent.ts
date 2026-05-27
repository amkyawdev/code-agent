import { useState } from 'react';

export function useAgentLoader() {
  const [isExecuting, setIsExecuting] = useState(false);
  
  return {
    isExecuting,
    setIsExecuting,
  };
}

export default useAgentLoader;
