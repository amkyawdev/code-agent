import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useHistory } from '@/contexts/HistoryContext';
import MenuBar from '@/components/MenuBar';
import NavBar from '@/components/NavBar';

export default function HistoryScreen() {
  const { conversations, deleteConversation } = useHistory();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete', 'Delete this conversation?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteConversation(id) },
    ]);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <View style={styles.itemIcon}>
        <Ionicons name={item.type === 'chat' ? 'chatbubbles' : 'code-slash'} size={20} color="#6366f1" />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.itemMeta}>
          <Text style={styles.itemDate}>{formatDate(item.createdAt)}</Text>
          <View style={styles.dot} />
          <Text style={styles.itemMsgs}>{item.messages.length} messages</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
        <Ionicons name="trash-outline" size={18} color="#444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <MenuBar />
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Ionicons name="time-outline" size={36} color="#222" />
            </View>
            <Text style={styles.emptyText}>No conversations yet</Text>
            <Text style={styles.emptySubtext}>Start chatting to see history here</Text>
          </View>
        }
      />
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  list: { padding: 16, paddingTop: 70, paddingBottom: 20 },
  empty: { alignItems: 'center', marginTop: 80 },
  emptyIcon: { width: 72, height: 72, borderRadius: 20, backgroundColor: '#141414', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  emptyText: { color: '#555', fontSize: 16, fontWeight: '600' },
  emptySubtext: { color: '#333', fontSize: 13, marginTop: 6 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  itemIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#141414',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  itemContent: { flex: 1 },
  itemTitle: { color: '#fff', fontSize: 15, fontWeight: '500', marginBottom: 6 },
  itemMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  itemDate: { color: '#666', fontSize: 12 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#333' },
  itemMsgs: { color: '#666', fontSize: 12 },
  deleteBtn: { padding: 8 },
});
