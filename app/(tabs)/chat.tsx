import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAPI } from '@/contexts/APIContext';

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
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);
    try {
      let response = '';
      if (isConfigured('gemini')) response = await callGemini(inputText.trim());
      else if (isConfigured('deepseek')) response = await callDeepSeek(inputText.trim());
      else response = 'No API key configured in Vercel.';
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: response }]);
    } catch (e: any) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: `Error: ${e.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMsg = ({ item }: { item: Message }) => (
    <View style={[styles.msgContainer, item.role === 'user' ? styles.userMsg : styles.assistantMsg]}>
      <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.assistantBubble]}>
        <Text style={styles.msgText}>{item.content}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
        <View style={[styles.statusDot, { backgroundColor: isConfigured('gemini') || isConfigured('deepseek') ? '#22c55e' : '#ef4444' }]} />
      </View>
      <FlatList ref={flatListRef} data={messages} renderItem={renderMsg} keyExtractor={(item) => item.id} contentContainerStyle={styles.msgList}
        ListEmptyComponent={<View style={styles.empty}><Ionicons name="chatbubbles-outline" size={48} color="#262626" /><Text style={styles.emptyText}>Start chatting</Text></View>} />
      <View style={styles.inputArea}>
        <TextInput style={styles.input} value={inputText} onChangeText={setInputText} placeholder="Type..." placeholderTextColor="#666" multiline />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend} disabled={isLoading || !inputText.trim()}>
          {isLoading ? <ActivityIndicator color="#fff" size="small" /> : <Ionicons name="send" size={20} color="#fff" />}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#262626' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  msgList: { flexGrow: 1, padding: 16 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#666', fontSize: 14, marginTop: 12 },
  msgContainer: { flexDirection: 'row', marginBottom: 12 },
  userMsg: { justifyContent: 'flex-end' },
  assistantMsg: { justifyContent: 'flex-start' },
  bubble: { maxWidth: '75%', padding: 12, borderRadius: 16 },
  userBubble: { backgroundColor: '#6366f1', borderBottomRightRadius: 4 },
  assistantBubble: { backgroundColor: '#1a1a1a', borderWidth: 1, borderColor: '#262626' },
  msgText: { color: '#fff', fontSize: 14 },
  inputArea: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#1a1a1a', borderTopWidth: 1, borderTopColor: '#262626', gap: 8 },
  input: { flex: 1, backgroundColor: '#0a0a0a', padding: 12, borderRadius: 20, color: '#fff', fontSize: 15, maxHeight: 80 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#6366f1', justifyContent: 'center', alignItems: 'center', opacity: 0.7 },
});
