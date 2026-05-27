import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const menuItems = [
  { name: 'Home', path: '/', icon: 'home' },
  { name: 'Chat', path: '/chat', icon: 'chatbubbles' },
  { name: 'Coder', path: '/agent', icon: 'code-slash' },
  { name: 'History', path: '/history', icon: 'time' },
  { name: 'Docs', path: '/docs', icon: 'document-text' },
  { name: 'API Settings', path: '/api-input', icon: 'key' },
];

export default function MenuBar() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => path === '/' ? pathname === '/' : pathname.startsWith(path);

  const navigate = (path: string) => {
    setVisible(false);
    router.push(path);
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuBtn} onPress={() => setVisible(true)}>
          <Ionicons name="menu-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Code Agent</Text>
        <View style={styles.headerRight} />
      </View>

      <Modal visible={visible} animationType="fade" transparent>
        <View style={styles.overlay}>
          <Animated.View style={styles.sidebar}>
            <View style={styles.sidebarHeader}>
              <Ionicons name="code-slash" size={32} color="#6366f1" />
              <Text style={styles.sidebarTitle}>Menu</Text>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setVisible(false)}>
                <Ionicons name="close" size={22} color="#888" />
              </TouchableOpacity>
            </View>

            <View style={styles.menuList}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.path}
                  style={[styles.menuItem, isActive(item.path) && styles.menuItemActive]}
                  onPress={() => navigate(item.path)}
                >
                  <View style={[styles.iconCircle, isActive(item.path) && styles.iconCircleActive]}>
                    <Ionicons name={item.icon as any} size={20} color={isActive(item.path) ? '#6366f1' : '#666'} />
                  </View>
                  <Text style={[styles.menuText, isActive(item.path) && styles.menuTextActive]}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.sidebarFooter}>
              <Text style={styles.version}>v1.0.0</Text>
            </View>
          </Animated.View>
          <TouchableOpacity style={styles.overlayBg} onPress={() => setVisible(false)} />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 1,
    borderBottomColor: '#161616',
  },
  menuBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#141414',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#fff', letterSpacing: 0.5 },
  headerRight: { width: 44 },
  overlay: { flex: 1, flexDirection: 'row' },
  overlayBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' },
  sidebar: {
    width: 260,
    backgroundColor: '#111111',
    borderRightWidth: 1,
    borderRightColor: '#1f1f1f',
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    gap: 14,
  },
  sidebarTitle: { fontSize: 20, fontWeight: '700', color: '#fff', flex: 1 },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuList: { padding: 16 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 8,
    gap: 14,
  },
  menuItemActive: { backgroundColor: '#1a1a1a' },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleActive: { backgroundColor: '#222222' },
  menuText: { fontSize: 15, color: '#888', flex: 1 },
  menuTextActive: { color: '#fff', fontWeight: '600' },
  sidebarFooter: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
    alignItems: 'center',
  },
  version: { color: '#444', fontSize: 12 },
});
