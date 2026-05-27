import { useHistoryContext } from '@/contexts/HistoryContext';

export function useHistory() {
  const context = useHistoryContext();
  return context;
}

export default function useHistoryHook() {
  return useHistory();
}