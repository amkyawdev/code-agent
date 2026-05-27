import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import MenuBar from '@/components/MenuBar';
import NavBar from '@/components/NavBar';

const pages = [
  { name: 'Chat', path: '/chat', icon: 'chatbubbles', desc: 'AI chat assistant', color: '#6366f1' },
  { name: 'Coder', path: '/agent', icon: 'code-slash', desc: 'Build & fix code', color: '#8b5cf6' },
  { name: 'History', path: '/history', icon: 'time', desc: 'Past conversations', color: '#06b6d4' },
  { name: 'Docs', path: '/docs', icon: 'document-text', desc: 'Browse documentation', color: '#22c55e' },
  { name: 'API', path: '/api-input', icon: 'key', desc: 'Configure keys', color: '#f59e0b' },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <MenuBar />
      <ScrollView style={styles.content} contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 80 }]}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name="code-slash" size={40} color="#6366f1" />
          </View>
          <Text style={styles.title}>Code Agent</Text>
          <Text style={styles.subtitle}>AI-powered development assistant</Text>
        </View>

        <View style={styles.grid}>
          {pages.map((page) => (
            <TouchableOpacity key={page.path} style={styles.card} onPress={() => router.push(page.path)} activeOpacity={0.7}>
              <View style={[styles.iconBox, { backgroundColor: page.color + '20' }]}>
                <View style={[styles.iconInner, { backgroundColor: page.color }]}>
                  <Ionicons name={page.icon as any} size={22} color="#fff" />
                </View>
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardName}>{page.name}</Text>
                <Text style={styles.cardDesc}>{page.desc}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#333" />
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
  contentContainer: { padding: 20 },
  hero: { alignItems: 'center', paddingVertical: 48 },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#141414',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 28, fontWeight: '700', color: '#fff', letterSpacing: 0.5 },
  subtitle: { fontSize: 14, color: '#666', marginTop: 8 },
  grid: { gap: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1a1a1a',
    marginBottom: 12,
  },
  iconBox: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  iconInner: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  cardText: { flex: 1 },
  cardName: { fontSize: 17, fontWeight: '600', color: '#fff', marginBottom: 4 },
  cardDesc: { fontSize: 13, color: '#666' },
});
