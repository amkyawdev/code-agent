import { useAgentContext } from '@/contexts/AgentContext';

export function useAgent() {
  const context = useAgentContext();
  return context;
}

export default function useAgentHook() {
  return useAgent();
}