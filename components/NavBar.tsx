import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const navItems = [
  { name: 'Home', path: '/', icon: 'home' },
  { name: 'Chat', path: '/chat', icon: 'chatbubbles' },
  { name: 'Coder', path: '/agent', icon: 'code-slash' },
  { name: 'History', path: '/history', icon: 'time' },
  { name: 'Docs', path: '/docs', icon: 'document-text' },
  { name: 'API', path: '/api-input', icon: 'key' },
];

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.path}
            style={[styles.navItem, isActive(item.path) && styles.navItemActive]}
            onPress={() => router.push(item.path)}
          >
            <Ionicons
              name={item.icon as any}
              size={18}
              color={isActive(item.path) ? '#6366f1' : '#a3a3a3'}
            />
            <Text style={[styles.navText, isActive(item.path) && styles.navTextActive]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#262626',
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 12,
    gap: 8,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
    gap: 6,
  },
  navItemActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
  },
  navText: {
    color: '#a3a3a3',
    fontSize: 13,
    fontWeight: '500',
  },
  navTextActive: {
    color: '#6366f1',
    fontWeight: '600',
  },
});
