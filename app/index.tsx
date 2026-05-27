import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const MENU_ITEMS = [
  { title: 'Chat', subtitle: 'Chat with AI', icon: 'chatbubbles', route: '/chat', color: '#6366f1' },
  { title: 'Coder', subtitle: 'Run coding tasks', icon: 'hardware-chip', route: '/agent', color: '#8b5cf6' },
  { title: 'History', subtitle: 'View past conversations', icon: 'time', route: '/history', color: '#06b6d4' },
  { title: 'Documentation', subtitle: 'Learn how to use', icon: 'document-text', route: '/docs', color: '#22c55e' },
  { title: 'API Settings', subtitle: 'Configure AI keys', icon: 'key', route: '/api-input', color: '#f59e0b' },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AmkyawDev Code Agent</Text>
        <Text style={styles.headerSubtitle}>AI-Powered Development Assistant</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.heroSection}>
          <Ionicons name="code-slash" size={64} color="#6366f1" />
          <Text style={styles.heroTitle}>Welcome</Text>
          <Text style={styles.heroText}>Your AI-powered coding assistant</Text>
        </View>

        <View style={styles.menuGrid}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.route}
              style={styles.menuItem}
              onPress={() => router.push(item.route)}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon as any} size={28} color="#ffffff" />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { paddingHorizontal: 16, paddingVertical: 24, borderBottomWidth: 1, borderBottomColor: '#262626' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#ffffff' },
  headerSubtitle: { fontSize: 14, color: '#a3a3a3', marginTop: 4 },
  content: { flex: 1 },
  contentContainer: { padding: 16 },
  heroSection: { alignItems: 'center', paddingVertical: 32 },
  heroTitle: { fontSize: 28, fontWeight: 'bold', color: '#ffffff', marginTop: 16 },
  heroText: { fontSize: 16, color: '#a3a3a3', marginTop: 8 },
  menuGrid: { gap: 12 },
  menuItem: { backgroundColor: '#1a1a1a', borderRadius: 16, padding: 20, marginBottom: 12, borderWidth: 1, borderColor: '#262626', flexDirection: 'row', alignItems: 'center' },
  iconContainer: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  menuTitle: { fontSize: 18, fontWeight: 'bold', color: '#ffffff', marginLeft: 16, flex: 1 },
  menuSubtitle: { fontSize: 12, color: '#666666', marginLeft: 16 },
});
