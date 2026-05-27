import { useState, useEffect, useRef, useCallback } from 'react';

interface ThinkingAnimationOptions {
  enabled?: boolean;
  minDuration?: number;
  maxDuration?: number;
}

export function useThinkingAnimation(options: ThinkingAnimationOptions = {}) {
  const { enabled = true, minDuration = 1000, maxDuration = 3000 } = options;
  const [isThinking, setIsThinking] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startThinking = useCallback(() => {
    if (!enabled) return;
    
    const duration = Math.random() * (maxDuration - minDuration) + minDuration;
    setIsThinking(true);
    
    timeoutRef.current = setTimeout(() => {
      setIsThinking(false);
    }, duration);
  }, [enabled, minDuration, maxDuration]);

  const stopThinking = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsThinking(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isThinking,
    startThinking,
    stopThinking,
  };
}