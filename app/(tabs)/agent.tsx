import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAPI } from '@/contexts/APIContext';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  type?: 'text' | 'code' | 'command' | 'result' | 'error';
}

export default function CoderScreen() {
  const [taskInput, setTaskInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const { apiKeys, isConfigured } = useAPI();
  const scrollRef = useRef<ScrollView>(null);

  const callAgent = async (task: string, history: Message[]) => {
    const context = history.map(m => `${m.role}: ${m.content}`).join('\n');
    
    const prompt = `You are a Coder Agent like Claude, Manus, or Open Hands.

CAPABILITIES:
- Write, edit, and debug code in any language
- Run terminal/CLI commands
- Read and write files
- Search the web for solutions
- Use tools to complete tasks

RULES:
1. ALWAYS write actual working code
2. Run commands to verify fixes work
3. If error occurs, auto-fix and retry
4. Be concise but complete
5. Show your work (commands, code, results)

TASK: ${task}

${history.length > 0 ? `\nCONVERSATION:\n${context}` : ''}

Respond with actions and code. Use this format:
## DO: [action]
[command or code]
## SAY: [explanation]`;

    if (isConfigured('gemini')) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKeys.gemini}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 8192, temperature: 0.3 }
          }),
        }
      );
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } else if (isConfigured('deepseek')) {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKeys.deepseek}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 8192,
          temperature: 0.3
        }),
      });
      const data = await response.json();
      return data.choices?.[0]?.message?.content || '';
    }
    return 'Error: Configure API key in Settings';
  };

  const handleSend = async () => {
    if (!taskInput.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: taskInput.trim() };
    setMessages(prev => [...prev, userMsg]);
    setTaskInput('');
    setIsLoading(true);
    setIsStreaming(true);

    // Add typing indicator
    const assistantMsg: Message = { id: 'temp', role: 'assistant', content: 'Thinking...', type: 'text' };
    setMessages(prev => [...prev, assistantMsg]);

    try {
      const response = await callAgent(userMsg.content, messages);
      
      // Update with actual response
      setMessages(prev => prev.map(m => m.id === 'temp' ? { ...m, id: Date.now().toString(), content: response, type: 'text' } : m));
    } catch (error: any) {
      setMessages(prev => prev.map(m => m.id === 'temp' ? { ...m, id: Date.now().toString(), content: `Error: ${error.message}`, type: 'error' } : m));
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    setTaskInput('');
  };

  const formatContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      let type: Message['type'] = 'text';
      if (line.startsWith('```')) type = 'code';
      else if (line.startsWith('## ')) type = 'command';
      else if (line.startsWith('$') || line.startsWith('>')) type = 'result';
      else if (line.toLowerCase().includes('error')) type = 'error';
      return { ...line, key: `${i}-${line.slice(0, 20)}` };
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Coder</Text>
        <View style={styles.headerRight}>
          <View style={[styles.statusDot, { backgroundColor: isStreaming ? '#22c55e' : '#a3a3a3' }]} />
          <Text style={styles.statusText}>{isStreaming ? 'Online' : 'Ready'}</Text>
        </View>
      </View>

      <ScrollView ref={scrollRef} style={styles.chatArea} contentContainerStyle={styles.chatContent}>
        {!isConfigured('gemini') && !isConfigured('deepseek') && (
          <View style={styles.warningBanner}>
            <Ionicons name="warning" size={18} color="#f59e0b" />
            <Text style={styles.warningText}>Configure API key in Settings</Text>
          </View>
        )}

        {messages.length === 0 && (
          <View style={styles.welcomeBox}>
            <Ionicons name="code-slash" size={48} color="#6366f1" />
            <Text style={styles.welcomeTitle}>Coder Agent</Text>
            <Text style={styles.welcomeText}>Like Claude, Manus, or Open Hands</Text>
            <View style={styles.capabilityList}>
              <Text style={styles.capability}>• Write & edit code</Text>
              <Text style={styles.capability}>• Run terminal commands</Text>
              <Text style={styles.capability}>• Fix bugs automatically</Text>
              <Text style={styles.capability}>• Build projects</Text>
            </View>
          </View>
        )}

        {messages.map((msg) => (
          <View key={msg.id} style={[styles.message, msg.role === 'user' ? styles.userMsg : styles.assistantMsg]}>
            <View style={styles.msgHeader}>
              <Ionicons 
                name={msg.role === 'user' ? 'person' : 'code-slash'} 
                size={14} 
                color={msg.role === 'user' ? '#8b5cf6' : '#6366f1'} 
              />
              <Text style={styles.msgRole}>{msg.role === 'user' ? 'You' : 'Coder'}</Text>
            </View>
            <Text style={styles.msgContent}>{msg.content}</Text>
          </View>
        ))}

        {isLoading && (
          <View style={[styles.message, styles.assistantMsg]}>
            <View style={styles.msgHeader}>
              <Ionicons name="code-slash" size={14} color="#6366f1" />
              <Text style={styles.msgRole}>Coder</Text>
            </View>
            <View style={styles.typingIndicator}>
              <Text style={styles.typingDot}>•</Text>
              <Text style={styles.typingDot}>•</Text>
              <Text style={styles.typingDot}>•</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputArea}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={taskInput}
            onChangeText={setTaskInput}
            placeholder="What to build, fix, or explore..."
            placeholderTextColor="#666666"
            multiline
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend} disabled={isLoading}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
          <Ionicons name="trash-outline" size={16} color="#ef4444" />
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#262626' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { color: '#a3a3a3', fontSize: 12 },
  chatArea: { flex: 1 },
  chatContent: { padding: 16, paddingBottom: 100 },
  warningBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(245,158,11,0.1)', padding: 10, borderRadius: 8, marginBottom: 16 },
  warningText: { color: '#f59e0b', fontSize: 13 },
  welcomeBox: { alignItems: 'center', paddingTop: 60 },
  welcomeTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 16 },
  welcomeText: { color: '#a3a3a3', fontSize: 14, marginTop: 4 },
  capabilityList: { marginTop: 20, alignItems: 'flex-start' },
  capability: { color: '#22c55e', fontSize: 14, marginVertical: 4 },
  message: { marginBottom: 16, padding: 14, borderRadius: 12 },
  userMsg: { backgroundColor: '#6366f1', marginLeft: 40 },
  assistantMsg: { backgroundColor: '#1a1a1a', marginRight: 40, borderWidth: 1, borderColor: '#262626' },
  msgHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  msgRole: { color: '#a3a3a3', fontSize: 11, fontWeight: '600' },
  msgContent: { color: '#fff', fontSize: 14, lineHeight: 22 },
  typingIndicator: { flexDirection: 'row', gap: 4 },
  typingDot: { color: '#6366f1', fontSize: 20 },
  inputArea: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#1a1a1a', padding: 12, borderTopWidth: 1, borderTopColor: '#262626' },
  inputContainer: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  input: { flex: 1, backgroundColor: '#0a0a0a', padding: 12, borderRadius: 20, color: '#fff', fontSize: 15, maxHeight: 100 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#6366f1', justifyContent: 'center', alignItems: 'center' },
  clearBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 8 },
  clearText: { color: '#ef4444', fontSize: 12 },
});
