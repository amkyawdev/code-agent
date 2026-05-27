import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type AgentStatus = 'idle' | 'thinking' | 'coding' | 'executing' | 'complete' | 'error';

interface AgentContextType {
  status: AgentStatus;
  isThinking: boolean;
  output: string[];
  runTask: (task: string) => void;
  clearOutput: () => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AgentStatus>('idle');
  const [isThinking, setIsThinking] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const runTask = useCallback(async (task: string) => {
    setIsThinking(true);
    setStatus('thinking');
    setOutput([`$ Analyzing task: ${task}`]);

    setTimeout(() => {
      setOutput((prev) => [...prev, 'Processing context...']);
      setStatus('coding');

      setTimeout(() => {
        setOutput((prev) => [...prev, '$ Generating code...', '✓ Code generated successfully']);
        setStatus('executing');

        setTimeout(() => {
          setOutput((prev) => [...prev, '$ Executing task...', '✓ Task completed successfully']);
          setStatus('complete');
          setIsThinking(false);

          setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
      }, 1500);
    }, 1500);
  }, []);

  const clearOutput = useCallback(() => {
    setOutput([]);
    setStatus('idle');
  }, []);

  return (
    <AgentContext.Provider value={{ status, isThinking, output, runTask, clearOutput }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgentContext() {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgentContext must be used within an AgentProvider');
  }
  return context;
}