import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const getApiKeys = () => {
  try {
    const stored = localStorage.getItem('api_keys');
    return stored ? JSON.parse(stored) : {};
  } catch { return {}; }
};

export default function CoderScreen() {
  const [taskInput, setTaskInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getApiKey = (p: string) => getApiKeys()[p] || '';
  const isConfigured = (p: string) => !!getApiKey(p);

  const callAI = async (task: string) => {
    const prompt = `You are a Coder Agent like Claude, Manus, or Open Hands.

Write actual code. Run commands. Fix bugs. Build projects. DO NOT test.

Task: ${task}

Respond with code and commands.`;

    if (isConfigured('gemini')) {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${getApiKey('gemini')}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 8192 } }) }
      );
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } else if (isConfigured('deepseek')) {
      const res = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getApiKey('deepseek')}` },
        body: JSON.stringify({ model: 'deepseek-chat', messages: [{ role: 'user', content: prompt }], max_tokens: 8192 })
      });
      const data = await res.json();
      return data.choices?.[0]?.message?.content || '';
    }
    return 'Configure API key in Settings page.';
  };

  const handleSend = async () => {
    if (!taskInput.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: taskInput.trim() };
    setMessages(prev => [...prev, userMsg]);
    setTaskInput('');
    setIsLoading(true);
    try {
      const res = await callAI(taskInput.trim());
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: res }]);
    } catch (e: any) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: `Error: ${e.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Coder</Text>
        <View style={[styles.statusDot, { backgroundColor: isConfigured('gemini') || isConfigured('deepseek') ? '#22c55e' : '#ef4444' }]} />
      </View>

      <ScrollView style={styles.chatArea} contentContainerStyle={styles.chatContent}>
        {messages.length === 0 && (
          <View style={styles.welcome}>
            <Ionicons name="code-slash" size={48} color="#6366f1" />
            <Text style={styles.welcomeTitle}>Coder Agent</Text>
            <Text style={styles.welcomeText}>Like Claude, Manus, Open Hands</Text>
            <Text style={styles.capabilities}>• Write code</Text>
            <Text style={styles.capabilities}>• Fix bugs</Text>
            <Text style={styles.capabilities}>• Build projects</Text>
          </View>
        )}
        {messages.map((m) => (
          <View key={m.id} style={[styles.msg, m.role === 'user' ? styles.userMsg : styles.aiMsg]}>
            <Text style={styles.msgText}>{m.content}</Text>
          </View>
        ))}
        {isLoading && <View style={[styles.msg, styles.aiMsg]}><Text style={styles.msgText}>Thinking...</Text></View>}
      </ScrollView>

      <View style={styles.inputArea}>
        <TextInput style={styles.input} value={taskInput} onChangeText={setTaskInput} placeholder="What to build..." placeholderTextColor="#666" multiline />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend} disabled={isLoading}>
          <Ionicons name="send" size={20} color="#fff" />
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
  chatArea: { flex: 1 },
  chatContent: { padding: 16, paddingBottom: 100 },
  welcome: { alignItems: 'center', paddingTop: 60 },
  welcomeTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 16 },
  welcomeText: { color: '#a3a3a3', fontSize: 14 },
  capabilities: { color: '#22c55e', fontSize: 14, marginTop: 8 },
  msg: { padding: 14, borderRadius: 12, marginBottom: 12 },
  userMsg: { backgroundColor: '#6366f1', marginLeft: 40 },
  aiMsg: { backgroundColor: '#1a1a1a', marginRight: 40, borderWidth: 1, borderColor: '#262626' },
  msgText: { color: '#fff', fontSize: 14, lineHeight: 22 },
  inputArea: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#1a1a1a', borderTopWidth: 1, borderTopColor: '#262626', gap: 8 },
  input: { flex: 1, backgroundColor: '#0a0a0a', padding: 12, borderRadius: 20, color: '#fff', fontSize: 15, maxHeight: 80 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#6366f1', justifyContent: 'center', alignItems: 'center' },
});
