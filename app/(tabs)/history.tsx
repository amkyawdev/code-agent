import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface HistoryItem {
  id: string;
  title: string;
  date: string;
  messages: number;
  model: string;
}

const DEMO_HISTORY: HistoryItem[] = [
  { id: '1', title: 'React Native Setup', date: 'Today', messages: 12, model: 'gemini' },
  { id: '2', title: 'API Integration', date: 'Yesterday', messages: 8, model: 'openai' },
  { id: '3', title: 'UI Components', date: '2 days ago', messages: 15, model: 'gemini' },
];

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const [history] = useState<HistoryItem[]>(DEMO_HISTORY);
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('all');

  const filteredHistory = filter === 'today' 
    ? history.filter(h => h.date === 'Today')
    : filter === 'week' 
    ? history.filter(h => h.date !== 'Today')
    : history;

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <View style={styles.historyItem}>
      <View style={styles.itemIcon}>
        <Ionicons name="chatbubbles" size={24} color="#6366f1" />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.itemMeta}>
          <Text style={styles.itemDate}>{item.date}</Text>
          <Text style={styles.itemMessages}>{item.messages} msgs</Text>
          <View style={styles.modelBadge}>
            <Text style={styles.modelText}>{item.model}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
      </View>

      <View style={styles.filterContainer}>
        {(['all', 'today', 'week'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f && styles.filterButtonActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === 'all' ? 'All' : f === 'today' ? 'Today' : 'Week'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="time-outline" size={64} color="#262626" />
            <Text style={styles.emptyText}>No history yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#262626' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#ffffff' },
  filterContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  filterButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#1a1a1a', borderWidth: 1, borderColor: '#262626' },
  filterButtonActive: { backgroundColor: '#6366f1', borderColor: '#6366f1' },
  filterText: { fontSize: 14, color: '#a3a3a3' },
  filterTextActive: { color: '#ffffff', fontWeight: '600' },
  listContent: { padding: 16 },
  historyItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#262626' },
  itemIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#262626', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  itemContent: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: '600', color: '#ffffff', marginBottom: 4 },
  itemMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  itemDate: { fontSize: 12, color: '#a3a3a3' },
  itemMessages: { fontSize: 12, color: '#666666' },
  modelBadge: { backgroundColor: '#262626', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  modelText: { fontSize: 10, color: '#6366f1', fontWeight: '600' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100 },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#a3a3a3', marginTop: 16 },
});
