import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const navItems = [
  { path: '/', icon: 'home' },
  { path: '/chat', icon: 'chatbubbles' },
  { path: '/agent', icon: 'code-slash' },
  { path: '/history', icon: 'time' },
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
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.path}
          style={[styles.navItem, isActive(item.path) && styles.navItemActive]}
          onPress={() => router.push(item.path)}
        >
          <Ionicons
            name={item.icon as any}
            size={22}
            color={isActive(item.path) ? '#6366f1' : '#666'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0f0f0f',
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  navItem: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  navItemActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
  },
});
