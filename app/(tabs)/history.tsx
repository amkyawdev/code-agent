import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useHistory } from '@/contexts/HistoryContext';

export default function HistoryScreen() {
  const router = useRouter();
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
      { text: 'Delete', style: 'destructive', onPress: () => deleteConversation(id) }
    ]);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.item} onPress={() => {}}>
      <View style={styles.itemIcon}>
        <Ionicons name={item.type === 'chat' ? 'chatbubbles' : 'code-slash'} size={20} color="#6366f1" />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.itemMeta}>
          <Text style={styles.itemDate}>{formatDate(item.createdAt)}</Text>
          <Text style={styles.itemMsgs}>{item.messages.length} msgs</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
        <Ionicons name="trash-outline" size={18} color="#ef4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
        <Text style={styles.count}>{conversations.length} conversations</Text>
      </View>
      
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="time-outline" size={48} color="#262626" />
            <Text style={styles.emptyText}>No conversations yet</Text>
            <Text style={styles.emptySubtext}>Start chatting to see history here</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#262626' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  count: { color: '#666', fontSize: 12 },
  list: { padding: 16 },
  empty: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#666', fontSize: 16, marginTop: 12 },
  emptySubtext: { color: '#444', fontSize: 13, marginTop: 4 },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a', padding: 14, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#262626' },
  itemIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#262626', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  itemContent: { flex: 1 },
  itemTitle: { color: '#fff', fontSize: 15, fontWeight: '500' },
  itemMeta: { flexDirection: 'row', gap: 12, marginTop: 4 },
  itemDate: { color: '#666', fontSize: 12 },
  itemMsgs: { color: '#666', fontSize: 12 },
  deleteBtn: { padding: 8 },
});
