import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAPI } from '@/contexts/APIContext';

type Status = 'idle' | 'thinking' | 'coding' | 'executing' | 'complete' | 'error';

export default function CoderAgentScreen() {
  const [taskInput, setTaskInput] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [output, setOutput] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { apiKeys, isConfigured } = useAPI();

  const callAgentAPI = async (task: string) => {
    if (isConfigured('gemini')) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKeys.gemini}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `You are a coding assistant. Complete this task: ${task}. Write actual code if needed.` }] }],
            generationConfig: { maxOutputTokens: 4096, temperature: 0.7 }
          }),
        }
      );
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Task completed';
    } else if (isConfigured('deepseek')) {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKeys.deepseek}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: `You are a coding assistant. Complete this task: ${task}. Write actual code if needed.` }],
          max_tokens: 4096,
          temperature: 0.7
        }),
      });
      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'Task completed';
    }
    return 'Please configure Gemini or DeepSeek API key';
  };

  const handleRunTask = async () => {
    if (!taskInput.trim() || isLoading) return;

    setStatus('thinking');
    setOutput([]);
    setIsLoading(true);

    setOutput(['> Analyzing task...', '> Planning implementation...']);

    try {
      setStatus('coding');
      setOutput(prev => [...prev, '> Writing code...']);

      const result = await callAgentAPI(taskInput.trim());

      setStatus('executing');
      setOutput(prev => [...prev, '> Executing...', '']);
      setOutput(prev => [...prev, result]);

      setStatus('complete');
      setOutput(prev => [...prev, '', '✓ Task completed successfully']);
    } catch (error: any) {
      setStatus('error');
      setOutput(prev => [...prev, '', `✗ Error: ${error.message}`]);
    } finally {
      setIsLoading(false);
    }
  };

  const statusColors: Record<Status, string> = {
    idle: '#a3a3a3',
    thinking: '#6366f1',
    coding: '#8b5cf6',
    executing: '#06b6d4',
    complete: '#22c55e',
    error: '#ef4444',
  };

  const statusLabels: Record<Status, string> = {
    idle: 'Ready',
    thinking: 'Thinking...',
    coding: 'Coding...',
    executing: 'Executing...',
    complete: 'Complete!',
    error: 'Error',
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Coder Agent</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColors[status] }]}>
          <Text style={styles.statusText}>{statusLabels[status]}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {!isConfigured('gemini') && !isConfigured('deepseek') && (
          <View style={styles.warningBanner}>
            <Ionicons name="warning" size={20} color="#f59e0b" />
            <Text style={styles.warningText}>Configure API keys in Settings to enable Coder Agent</Text>
          </View>
        )}

        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>Task Input</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.taskInput}
              value={taskInput}
              onChangeText={setTaskInput}
              placeholder="Describe your coding task..."
              placeholderTextColor="#666666"
              multiline
            />
            <TouchableOpacity
              style={[styles.runButton, (isLoading || !isConfigured('gemini') && !isConfigured('deepseek')) && styles.runButtonDisabled]}
              onPress={handleRunTask}
              disabled={isLoading || (!isConfigured('gemini') && !isConfigured('deepseek'))}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <>
                  <Ionicons name="play" size={20} color="#ffffff" />
                  <Text style={styles.runButtonText}>Run Task</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {output.length > 0 && (
          <View style={styles.outputSection}>
            <Text style={styles.sectionTitle}>Output</Text>
            <View style={styles.outputContainer}>
              {output.map((line, index) => (
                <Text key={index} style={[styles.outputLine, line.startsWith('✓') && styles.successLine, line.startsWith('✗') && styles.errorLine]}>
                  {line}
                </Text>
              ))}
            </View>
          </View>
        )}

        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Available Skills</Text>
          <View style={styles.skillsGrid}>
            {['chat-skill', 'knowledge-web', 'coder-skill', 'thanking'].map((skill) => (
              <TouchableOpacity key={skill} style={styles.skillCard}>
                <Ionicons name="extension-puzzle" size={24} color="#6366f1" />
                <Text style={styles.skillName}>{skill}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#262626' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#ffffff' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: '#ffffff', fontSize: 12, fontWeight: '600' },
  content: { flex: 1 },
  contentContainer: { padding: 16 },
  warningBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: 12, borderRadius: 8, marginBottom: 16, gap: 8 },
  warningText: { color: '#f59e0b', fontSize: 14 },
  inputSection: { marginBottom: 24 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#a3a3a3', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  inputContainer: { backgroundColor: '#1a1a1a', borderRadius: 12, borderWidth: 1, borderColor: '#262626', overflow: 'hidden' },
  taskInput: { padding: 16, color: '#ffffff', fontSize: 16, minHeight: 100, textAlignVertical: 'top' },
  runButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#6366f1', paddingVertical: 12, marginHorizontal: 16, marginBottom: 16, borderRadius: 8, gap: 8 },
  runButtonDisabled: { opacity: 0.5 },
  runButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  outputSection: { marginBottom: 24 },
  outputContainer: { backgroundColor: '#0a0a0a', borderRadius: 8, padding: 16, borderWidth: 1, borderColor: '#262626' },
  outputLine: { color: '#22c55e', fontSize: 14, fontFamily: 'monospace', marginBottom: 4 },
  successLine: { color: '#22c55e', fontWeight: 'bold' },
  errorLine: { color: '#ef4444', fontWeight: 'bold' },
  skillsSection: { marginBottom: 24 },
  skillsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  skillCard: { flex: 1, minWidth: '45%', backgroundColor: '#1a1a1a', borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#262626' },
  skillName: { color: '#ffffff', fontSize: 14, marginTop: 8, textAlign: 'center' },
});
