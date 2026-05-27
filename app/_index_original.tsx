import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function IndexScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoOuter}>
            <View style={styles.logoInner}>
              <Ionicons name="code-slash" size={40} color="#6366f1" />
            </View>
          </View>
        </View>
        
        <Text style={styles.title}>Code Agent</Text>
        <Text style={styles.subtitle}>AI-Powered Development Assistant</Text>
        
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <Ionicons name="chatbubbles" size={24} color="#6366f1" />
            <Text style={styles.featureText}>Chat with AI</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="hardware-chip" size={24} color="#8b5cf6" />
            <Text style={styles.featureText}>Code Agent</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="extension-puzzle" size={24} color="#06b6d4" />
            <Text style={styles.featureText}>Skills</Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <View 
            style={styles.getStartedButton}
            onTouchEnd={() => router.push('/chat')}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color="#ffffff" />
          </View>
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Menu</Text>
          <View style={styles.menuGrid}>
            <View style={styles.menuItem} onTouchEnd={() => router.push('/docs')}>
              <Ionicons name="document-text" size={24} color="#a3a3a3" />
              <Text style={styles.menuItemText}>Docs</Text>
            </View>
            <View style={styles.menuItem} onTouchEnd={() => router.push('/api-input')}>
              <Ionicons name="key" size={24} color="#a3a3a3" />
              <Text style={styles.menuItemText}>API</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6366f120',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  logoInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#a3a3a3',
    marginBottom: 40,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 48,
  },
  featureItem: {
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#a3a3a3',
  },
  buttons: {
    width: '100%',
    marginBottom: 48,
  },
  getStartedButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  menuContainer: {
    width: '100%',
  },
  menuTitle: {
    fontSize: 12,
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 16,
    textAlign: 'center',
  },
  menuGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  menuItem: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    width: 100,
    borderWidth: 1,
    borderColor: '#262626',
  },
  menuItemText: {
    fontSize: 12,
    color: '#a3a3a3',
    marginTop: 8,
  },
});