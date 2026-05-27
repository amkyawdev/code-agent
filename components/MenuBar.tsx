import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
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
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const navigate = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <>
      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuBtn} onPress={() => setIsOpen(true)}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Code Agent</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Sidebar Menu */}
      <Modal visible={isOpen} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <Pressable style={styles.overlay} onPress={() => setIsOpen(false)} />
          <View style={styles.sidebar}>
            <View style={styles.sidebarHeader}>
              <Ionicons name="code-slash" size={28} color="#6366f1" />
              <Text style={styles.sidebarTitle}>Menu</Text>
              <TouchableOpacity style={styles.closeBtn} onPress={() => setIsOpen(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.menuList}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.path}
                  style={[styles.menuItem, isActive(item.path) && styles.menuItemActive]}
                  onPress={() => navigate(item.path)}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={22}
                    color={isActive(item.path) ? '#6366f1' : '#a3a3a3'}
                  />
                  <Text style={[styles.menuText, isActive(item.path) && styles.menuTextActive]}>
                    {item.name}
                  </Text>
                  {isActive(item.path) && <View style={styles.activeBar} />}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.sidebarFooter}>
              <Text style={styles.footerText}>Code Agent v1.0</Text>
            </View>
          </View>
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
    paddingVertical: 12,
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
  },
  menuBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerRight: {
    width: 40,
  },
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sidebar: {
    width: 280,
    backgroundColor: '#1a1a1a',
    borderLeftWidth: 1,
    borderLeftColor: '#262626',
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
    gap: 12,
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuList: {
    padding: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 6,
    gap: 14,
  },
  menuItemActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
  },
  menuText: {
    fontSize: 16,
    color: '#a3a3a3',
    flex: 1,
  },
  menuTextActive: {
    color: '#6366f1',
    fontWeight: '600',
  },
  activeBar: {
    width: 4,
    height: 20,
    borderRadius: 2,
    backgroundColor: '#6366f1',
  },
  sidebarFooter: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#262626',
  },
  footerText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
});
