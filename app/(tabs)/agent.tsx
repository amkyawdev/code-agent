import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
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

export default function CoderScreen() {
  const [taskInput, setTaskInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { apiKeys, isConfigured } = useAPI();
  const { saveConversation } = useHistory();

  const callAI = async (task: string) => {
    const prompt = `You are a Coder Agent. Write actual code. Fix bugs. Build projects. DO NOT test.

Task: ${task}

Respond with code and commands.`;

    if (isConfigured('gemini')) {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKeys.gemini}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { maxOutputTokens: 8192 } }) }
      );
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } else if (isConfigured('deepseek')) {
      const res = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKeys.deepseek}` },
        body: JSON.stringify({ model: 'deepseek-chat', messages: [{ role: 'user', content: prompt }], max_tokens: 8192 })
      });
      const data = await res.json();
      return data.choices?.[0]?.message?.content || '';
    }
    return 'Add API key in Settings.';
  };

  const handleSend = async () => {
    if (!taskInput.trim() || isLoading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: taskInput.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setTaskInput('');
    setIsLoading(true);
    try {
      const res = await callAI(taskInput.trim());
      const allMessages = [...newMessages, { id: (Date.now() + 1).toString(), role: 'assistant' as const, content: res }];
      setMessages(allMessages);
      if (allMessages.length >= 2) {
        saveConversation({
          title: newMessages[0].content.slice(0, 50),
          type: 'coder',
          messages: allMessages.map(m => ({ role: m.role, content: m.content })),
        });
      }
    } catch (e: any) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: `Error: ${e.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <MenuBar />
      <ScrollView style={styles.chatArea} contentContainerStyle={styles.chatContent}>
        {messages.length === 0 && (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Ionicons name="code-slash" size={36} color="#222" />
            </View>
            <Text style={styles.emptyText}>Coder Agent</Text>
            <Text style={styles.emptySubtext}>Describe what to build or fix</Text>
          </View>
        )}
        {messages.map((m) => (
          <View key={m.id} style={[styles.msg, m.role === 'user' ? styles.userMsg : styles.aiMsg]}>
            <View style={[styles.msgBubble, m.role === 'user' ? styles.userBubble : styles.aiBubble]}>
              <Text style={styles.msgText}>{m.content}</Text>
            </View>
          </View>
        ))}
        {isLoading && (
          <View style={[styles.msg, styles.aiMsg]}>
            <View style={[styles.msgBubble, styles.aiBubble]}>
              <Text style={styles.msgText}>Thinking...</Text>
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.inputArea}>
        <TextInput style={styles.input} value={taskInput} onChangeText={setTaskInput} placeholder="What to build..." placeholderTextColor="#555" multiline maxLength={1000} />
        <TouchableOpacity style={[styles.sendBtn, (!taskInput.trim() || isLoading) && styles.sendBtnDisabled]} onPress={handleSend} disabled={!taskInput.trim() || isLoading}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  chatArea: { flex: 1 },
  chatContent: { padding: 16, paddingTop: 70, paddingBottom: 20 },
  empty: { alignItems: 'center', marginTop: 80 },
  emptyIcon: { width: 72, height: 72, borderRadius: 20, backgroundColor: '#141414', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  emptyText: { color: '#555', fontSize: 16, fontWeight: '600' },
  emptySubtext: { color: '#333', fontSize: 13, marginTop: 6 },
  msg: { marginBottom: 14 },
  userMsg: { alignItems: 'flex-end' },
  aiMsg: { alignItems: 'flex-start' },
  msgBubble: { maxWidth: '85%:', padding: 14, borderRadius: 18 },
  userBubble: { backgroundColor: '#6366f1', borderBottomRightRadius: 6 },
  aiBubble: { backgroundColor: '#141414', borderWidth: 1, borderColor: '#1f1f1f', borderBottomLeftRadius: 6 },
  msgText: { color: '#fff', fontSize: 15, lineHeight: 22 },
  inputArea: { flexDirection: 'row', alignItems: 'flex-end', padding: 14, backgroundColor: '#0a0a0a', borderTopWidth: 1, borderTopColor: '#141414', gap: 10 },
  input: { flex: 1, backgroundColor: '#141414', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 20, color: '#fff', fontSize: 15, maxHeight: 100, borderWidth: 1, borderColor: '#1f1f1f' },
  sendBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#6366f1', justifyContent: 'center', alignItems: 'center' },
  sendBtnDisabled: { backgroundColor: '#333' },
});
