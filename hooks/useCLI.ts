import { useState, useCallback, useRef } from 'react';

interface CLILine {
  type: 'command' | 'output' | 'error' | 'success';
  content: string;
  timestamp: Date;
}

interface UseCLIOptions {
  maxLines?: number;
}

export function useCLI(options: UseCLIOptions = {}) {
  const { maxLines = 100 } = options;
  const [lines, setLines] = useState<CLILine[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addLine = useCallback((type: CLILine['type'], content: string) => {
    setLines((prev) => {
      const newLine = { type, content, timestamp: new Date() };
      const updated = [...prev, newLine];
      return updated.slice(-maxLines);
    });
  }, [maxLines]);

  const execute = useCallback(async (command: string) => {
    setIsRunning(true);
    addLine('command', command);

    try {
      // Simulate command execution
      await new Promise((resolve) => setTimeout(resolve, 500));
      addLine('output', `Executing: ${command}`);
      
      // Simulate success
      await new Promise((resolve) => setTimeout(resolve, 500));
      addLine('success', `✓ Command completed successfully`);
    } catch (error) {
      addLine('error', `ERROR: ${error}`);
    } finally {
      setIsRunning(false);
    }
  }, [addLine]);

  const clear = useCallback(() => {
    setLines([]);
  }, []);

  return {
    lines,
    isRunning,
    execute,
    addLine,
    clear,
  };
}