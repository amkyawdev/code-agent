import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import NavBar from '@/components/NavBar';

const pages = [
  { name: 'Chat', path: '/chat', icon: 'chatbubbles', desc: 'AI chat', color: '#6366f1' },
  { name: 'Coder', path: '/agent', icon: 'code-slash', desc: 'Build & fix code', color: '#8b5cf6' },
  { name: 'History', path: '/history', icon: 'time', desc: 'Past conversations', color: '#06b6d4' },
  { name: 'Docs', path: '/docs', icon: 'document-text', desc: 'Documentation', color: '#22c55e' },
  { name: 'API', path: '/api-input', icon: 'key', desc: 'Configure keys', color: '#f59e0b' },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} contentContainerStyle={[styles.contentContainer, { paddingTop: insets.top }]}>
        <View style={styles.hero}>
          <Ionicons name="code-slash" size={48} color="#6366f1" />
          <Text style={styles.title}>Code Agent</Text>
          <Text style={styles.subtitle}>AI-powered development assistant</Text>
        </View>

        <View style={styles.grid}>
          {pages.map((page) => (
            <TouchableOpacity key={page.path} style={styles.card} onPress={() => router.push(page.path)}>
              <View style={[styles.iconBox, { backgroundColor: page.color }]}>
                <Ionicons name={page.icon as any} size={24} color="#fff" />
              </View>
              <Text style={styles.cardName}>{page.name}</Text>
              <Text style={styles.cardDesc}>{page.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { flex: 1 },
  contentContainer: { padding: 16, paddingBottom: 100 },
  hero: { alignItems: 'center', paddingVertical: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginTop: 16 },
  subtitle: { fontSize: 14, color: '#a3a3a3', marginTop: 4 },
  grid: { gap: 12 },
  card: { backgroundColor: '#1a1a1a', borderRadius: 16, padding: 20, marginBottom: 12, borderWidth: 1, borderColor: '#262626', flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  cardName: { fontSize: 17, fontWeight: '600', color: '#fff', marginLeft: 16, flex: 1 },
  cardDesc: { fontSize: 12, color: '#666', marginLeft: 16 },
});
