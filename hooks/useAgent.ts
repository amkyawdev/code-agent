import { useState, useCallback } from 'react';

export function useAgent() {
  const [status, setStatus] = useState('idle');
  const [isThinking, setIsThinking] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const runTask = useCallback((task: string) => {
    setIsThinking(true);
    setStatus('thinking');
    setOutput([]);
    
    const lines = [
      `[Agent] Starting task: ${task}`,
      `[Agent] Analyzing requirements...`,
      `[Agent] Planning implementation...`,
      `[Agent] Executing steps...`,
      `[Agent] Task complete!`,
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < lines.length) {
        setOutput((prev: string[]) => [...prev, lines[index]]);
        setStatus(index === 1 ? 'coding' : index === 2 ? 'executing' : status);
        index++;
      } else {
        clearInterval(interval);
        setStatus('complete');
        setIsThinking(false);
      }
    }, 800);
  }, []);

  return {
    status,
    isThinking,
    output,
    runTask,
  };
}

export default useAgent;
