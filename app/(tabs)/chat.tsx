import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ChatBubble from '@/components/chat/ChatBubble';
import ChatInput from '@/components/chat/ChatInput';
import ThinkingAnimation from '@/components/animations/ThinkingIndicator';
import { useChat } from '@/hooks/useChat';

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const { messages, isThinking, sendMessage } = useChat();
  const flatListRef = useRef<FlatList>(null);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText.trim());
      setInputText('');
    }
  };

  const renderMessage = ({ item }: any) => (
    <ChatBubble message={item} />
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
        <View style={styles.headerActions}>
          <Ionicons name="refresh" size={24} color="#a3a3a3" style={styles.headerIcon} />
          <Ionicons name="settings" size={24} color="#a3a3a3" style={styles.headerIcon} />
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubbles-outline" size={64} color="#262626" />
            <Text style={styles.emptyText}>Start a conversation</Text>
            <Text style={styles.emptySubtext}>
              Ask me anything about coding, debugging, or project assistance
            </Text>
          </View>
        }
        ListFooterComponent={isThinking ? <ThinkingAnimation /> : null}
      />

      <ChatInput
        value={inputText}
        onChangeText={setInputText}
        onSend={handleSend}
        placeholder="Type your message..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  headerActions: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 16,
  },
  messagesList: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#a3a3a3',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
  },
});