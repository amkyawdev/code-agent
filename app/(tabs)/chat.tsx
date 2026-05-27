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

  const callGeminiAPI = async (userMessage: string) => {
    const apiKey = apiKeys.gemini;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }],
          generationConfig: { maxOutputTokens: 2048, temperature: 0.7 }
        }),
      }
    );
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini';
  };

  const callDeepSeekAPI = async (userMessage: string) => {
    const apiKey = apiKeys.deepseek;
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: userMessage }],
        max_tokens: 2048,
        temperature: 0.7
      }),
    });
    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'No response from DeepSeek';
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: inputText.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      let response = '';
      
      // Try Gemini first, then DeepSeek
      if (isConfigured('gemini')) {
        response = await callGeminiAPI(inputText.trim());
      } else if (isConfigured('deepseek')) {
        response = await callDeepSeekAPI(inputText.trim());
      } else {
        response = 'Please configure an API key in the API Settings page to use AI chat.';
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error: any) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${error.message || 'Failed to get response'}`
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.role === 'user' ? styles.userMessage : styles.assistantMessage]}>
      {item.role === 'assistant' && <Ionicons name="code-slash" size={20} color="#6366f1" style={styles.avatar} />}
      <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.assistantBubble]}>
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
      {item.role === 'user' && <Ionicons name="person" size={20} color="#8b5cf6" style={styles.avatar} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubbles-outline" size={64} color="#262626" />
            <Text style={styles.emptyText}>
              {!isConfigured('gemini') && !isConfigured('deepseek')
                ? 'Configure API keys in Settings'
                : 'Start a conversation'}
            </Text>
            <Text style={styles.emptySubtext}>
              {!isConfigured('gemini') && !isConfigured('deepseek')
                ? 'Go to API Settings to add Gemini or DeepSeek key'
                : 'Ask me anything about coding'}
            </Text>
          </View>
        }
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#6366f1" />
          <Text style={styles.loadingText}>Thinking...</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          placeholderTextColor="#666666"
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, (!inputText.trim() || isLoading) && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim() || isLoading}
        >
          <Ionicons name="send" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  messagesList: { flexGrow: 1, padding: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100 },
  emptyText: { fontSize: 18, fontWeight: '600', color: '#a3a3a3', marginTop: 16, textAlign: 'center' },
  emptySubtext: { fontSize: 14, color: '#666666', marginTop: 8, textAlign: 'center', paddingHorizontal: 40 },
  messageContainer: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 16 },
  userMessage: { justifyContent: 'flex-end' },
  assistantMessage: { justifyContent: 'flex-start' },
  avatar: { marginHorizontal: 8 },
  bubble: { maxWidth: '75%', padding: 12, borderRadius: 16 },
  userBubble: { backgroundColor: '#6366f1', borderBottomRightRadius: 4 },
  assistantBubble: { backgroundColor: '#1a1a1a', borderWidth: 1, borderColor: '#262626', borderBottomLeftRadius: 4 },
  messageText: { fontSize: 15, color: '#ffffff', lineHeight: 22 },
  loadingContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, gap: 8 },
  loadingText: { color: '#6366f1', fontSize: 14 },
  inputContainer: { flexDirection: 'row', alignItems: 'flex-end', padding: 12, backgroundColor: '#1a1a1a', borderTopWidth: 1, borderTopColor: '#262626' },
  input: { flex: 1, minHeight: 44, maxHeight: 100, paddingHorizontal: 16, paddingVertical: 10, fontSize: 16, color: '#ffffff', backgroundColor: '#0a0a0a', borderRadius: 22 },
  sendButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#6366f1', justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  sendButtonDisabled: { backgroundColor: '#262626' },
});
