import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAPI } from '@/contexts/APIContext';

export default function CoderScreen() {
  const [taskInput, setTaskInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [output, setOutput] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { apiKeys, isConfigured } = useAPI();

  const callAgent = async (task: string) => {
    const prompt = `You are a Coder. Your job is ONLY to BUILD and FIX code. No testing.

SKILL RULES:
- Read skills/coder-skill.md for instructions
- Write actual working code, not explanations
- Use CLI/terminal commands for build operations
- If error occurs, FIX it automatically
- NEVER run tests or write test files
- DO NOT explain theory - just build and fix

TASK: ${task}

Response format:
## Commands
(List terminal commands you run)

## Code
(Working code blocks)

## Result
(Success or errors fixed)

Start now.`;

    if (isConfigured('gemini')) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKeys.gemini}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 8192, temperature: 0.2 }
          }),
        }
      );
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
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
          temperature: 0.2
        }),
      });
      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'No response';
    }
    return 'Configure API key in Settings';
  };

  const handleRun = async () => {
    if (!taskInput.trim() || isLoading) return;

    setStatus('loading');
    setOutput([]);
    setIsLoading(true);
    setOutput(['> Building...']);

    try {
      const result = await callAgent(taskInput.trim());
      setOutput(result.split('\n'));
      setStatus('done');
    } catch (error: any) {
      setOutput([`Error: ${error.message}`]);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setTaskInput('');
    setOutput([]);
    setStatus('idle');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Coder</Text>
        <View style={[styles.statusBadge, { backgroundColor: status === 'done' ? '#22c55e' : status === 'error' ? '#ef4444' : status === 'loading' ? '#6366f1' : '#a3a3a3' }]}>
          <Text style={styles.statusText}>{status === 'idle' ? 'Ready' : status === 'loading' ? 'Building...' : status === 'done' ? 'Done' : 'Error'}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {!isConfigured('gemini') && !isConfigured('deepseek') && (
          <View style={styles.warningBanner}>
            <Ionicons name="warning" size={18} color="#f59e0b" />
            <Text style={styles.warningText}>Add API key in Settings</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={taskInput}
            onChangeText={setTaskInput}
            placeholder="What to build or fix..."
            placeholderTextColor="#666666"
            multiline
          />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
            <Ionicons name="trash" size={16} color="#ef4444" />
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.runBtn, isLoading && styles.disabled]}
            onPress={handleRun}
            disabled={isLoading}
          >
            {isLoading ? <ActivityIndicator color="#fff" size="small" /> : (
              <>
                <Ionicons name="build" size={16} color="#fff" />
                <Text style={styles.runText}>Build</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {output.length > 0 && (
          <View style={styles.outputBox}>
            <Text style={styles.outputTitle}>Output</Text>
            {output.map((line, i) => (
              <Text key={i} style={[
                styles.outputLine,
                line.startsWith('##') && styles.heading,
                line.startsWith('```') && styles.code,
                line.includes('Error') && styles.error,
                line.includes('✓') && styles.success
              ]}>{line}</Text>
            ))}
          </View>
        )}

        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={16} color="#6366f1" />
          <Text style={styles.infoText}>Build & Fix Only - No Testing</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#262626' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
  statusText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  content: { flex: 1, padding: 16 },
  warningBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(245,158,11,0.1)', padding: 10, borderRadius: 8, marginBottom: 16 },
  warningText: { color: '#f59e0b', fontSize: 13 },
  inputContainer: { backgroundColor: '#1a1a1a', borderRadius: 12, borderWidth: 1, borderColor: '#262626', marginBottom: 12 },
  input: { padding: 14, color: '#fff', fontSize: 15, minHeight: 100, textAlignVertical: 'top' },
  buttonRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  clearBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ef4444', gap: 6, flex: 1 },
  clearText: { color: '#ef4444', fontSize: 14, fontWeight: '600' },
  runBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#6366f1', padding: 12, borderRadius: 8, gap: 8, flex: 2 },
  runText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  disabled: { opacity: 0.5 },
  outputBox: { backgroundColor: '#0a0a0a', borderRadius: 8, padding: 14, borderWidth: 1, borderColor: '#262626', marginBottom: 16 },
  outputTitle: { color: '#a3a3a3', fontSize: 12, fontWeight: '600', marginBottom: 10, textTransform: 'uppercase' },
  outputLine: { color: '#22c55e', fontSize: 12, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', marginBottom: 2, lineHeight: 18 },
  heading: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  code: { color: '#8b5cf6' },
  error: { color: '#ef4444' },
  success: { color: '#22c55e', fontWeight: 'bold' },
  infoBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(99,102,241,0.1)', padding: 10, borderRadius: 8 },
  infoText: { color: '#a3a3a3', fontSize: 12 },
});
