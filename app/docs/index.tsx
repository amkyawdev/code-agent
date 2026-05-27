import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const docs = [
  {
    title: 'Getting Started',
    icon: 'rocket',
    description: 'Quick start guide for Code Agent',
    route: '/docs/getting-started',
  },
  {
    title: 'API Configuration',
    icon: 'key',
    description: 'Configure your AI model APIs',
    route: '/api-input',
  },
  {
    title: 'Chat Features',
    icon: 'chatbubbles',
    description: 'Learn about chat capabilities',
    route: '/chat',
  },
  {
    title: 'Agent Mode',
    icon: 'hardware-chip',
    description: 'Code agent execution guide',
    route: '/agent',
  },
  {
    title: 'Skills System',
    icon: 'extension-puzzle',
    description: 'Using and creating skills',
    route: '/skill/chat-skill',
  },
  {
    title: 'History & Storage',
    icon: 'folder',
    description: 'Managing conversation history',
    route: '/history',
  },
];

export default function DocsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Documentation</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeCard}>
          <Ionicons name="document-text" size={32} color="#6366f1" />
          <Text style={styles.welcomeTitle}>Welcome to Code Agent</Text>
          <Text style={styles.welcomeText}>
            Your AI-powered development assistant. Explore the documentation below to get started.
          </Text>
        </View>

        <View style={styles.docsGrid}>
          {docs.map((doc, index) => (
            <TouchableOpacity
              key={index}
              style={styles.docCard}
              onPress={() => router.push(doc.route as any)}
            >
              <View style={styles.docIcon}>
                <Ionicons name={doc.icon as any} size={28} color="#6366f1" />
              </View>
              <Text style={styles.docTitle}>{doc.title}</Text>
              <Text style={styles.docDescription}>{doc.description}</Text>
              <Ionicons name="chevron-forward" size={20} color="#666666" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Tips</Text>
          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={20} color="#f59e0b" />
            <Text style={styles.tipText}>
              Use the Agent mode for complex coding tasks that require multiple steps.
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Ionicons name="bulb" size={20} color="#f59e0b" />
            <Text style={styles.tipText}>
              Configure multiple AI providers for backup and better responses.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  welcomeCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#262626',
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: '#a3a3a3',
    textAlign: 'center',
    lineHeight: 20,
  },
  docsGrid: {
    gap: 12,
    marginBottom: 24,
  },
  docCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#262626',
    marginBottom: 12,
  },
  docIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  docTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  docDescription: {
    position: 'absolute',
    left: 76,
    top: 36,
    fontSize: 12,
    color: '#666666',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a3a3a3',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tipsSection: {
    marginBottom: 24,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#262626',
    borderLeftWidth: 3,
    borderLeftColor: '#f59e0b',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#a3a3a3',
    marginLeft: 12,
    lineHeight: 20,
  },
});