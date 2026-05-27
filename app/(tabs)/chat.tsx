import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAPI } from '@/contexts/APIContext';
import { useHistory } from '@/contexts/HistoryContext';
import MenuBar from '@/components/MenuBar';
import NavBar from '@/components/NavBar';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { apiKeys, isConfigured } = useAPI();
  const { saveConversation } = useHistory();
  const flatListRef = useRef<FlatList>(null);

  const callGemini = async (msg: string) => {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKeys.gemini}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: msg }] }] }) }
    );
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
  };

  const callDeepSeek = async (msg: string) => {
    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKeys.deepseek}` },
      body: JSON.stringify({ model: 'deepseek-chat', messages: [{ role: 'user', content: msg }], max_tokens: 2048 })
    });
    const data = await res.json();
    return data.choices?.[0]?.message?.content || 'No response';
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: inputText.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    try {
      let response = '';
      if (isConfigured('gemini')) response = await callGemini(inputText.trim());
      else if (isConfigured('deepseek')) response = await callDeepSeek(inputText.trim());
      else response = 'Add API key in Settings.';
      const allMessages = [...newMessages, { id: (Date.now() + 1).toString(), role: 'assistant' as const, content: response }];
      setMessages(allMessages);
      if (allMessages.length >= 2) {
        saveConversation({
          title: newMessages[0].content.slice(0, 50),
          type: 'chat',
          messages: allMessages.map(m => ({ role: m.role, content: m.content })),
        });
      }
    } catch (e: any) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: `Error: ${e.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMsg = ({ item, index }: { item: Message; index: number }) => (
    <View style={[styles.msgContainer, item.role === 'user' ? styles.userMsg : styles.aiMsg]}>
      <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.aiBubble]}>
        <Text style={styles.msgText}>{item.content}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <MenuBar />
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMsg}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.msgList}
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Ionicons name="chatbubbles-outline" size={36} color="#222" />
            </View>
            <Text style={styles.emptyText}>Start a conversation</Text>
            <Text style={styles.emptySubtext}>Send a message to begin chatting</Text>
          </View>
        }
      />
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor="#555"
          multiline
          maxLength={2000}
        />
        <TouchableOpacity
          style={[styles.sendBtn, (!inputText.trim() || isLoading) && styles.sendBtnDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim() || isLoading}
        >
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <NavBar />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  msgList: { flexGrow: 1, padding: 16, paddingTop: 70 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 80 },
  emptyIcon: { width: 72, height: 72, borderRadius: 20, backgroundColor: '#141414', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  emptyText: { color: '#555', fontSize: 16, fontWeight: '600' },
  emptySubtext: { color: '#333', fontSize: 13, marginTop: 6 },
  msgContainer: { flexDirection: 'row', marginBottom: 14 },
  userMsg: { justifyContent: 'flex-end' },
  aiMsg: { justifyContent: 'flex-start' },
  bubble: { maxWidth: '80%', padding: 14, borderRadius: 18 },
  userBubble: { backgroundColor: '#6366f1', borderBottomRightRadius: 6 },
  aiBubble: { backgroundColor: '#141414', borderWidth: 1, borderColor: '#1f1f1f', borderBottomLeftRadius: 6 },
  msgText: { color: '#fff', fontSize: 15, lineHeight: 22 },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 14,
    backgroundColor: '#0a0a0a',
    borderTopWidth: 1,
    borderTopColor: '#141414',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#141414',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    color: '#fff',
    fontSize: 15,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#1f1f1f',
  },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: { backgroundColor: '#333' },
});
