import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Provider {
  name: string;
  key: string;
  placeholder: string;
}

export default function APIInputScreen() {
  const router = useRouter();
  const [providers, setProviders] = useState<Provider[]>([
    { name: 'gemini', key: '', placeholder: 'AIza...' },
    { name: 'deepseek', key: '', placeholder: 'sk-...' },
    { name: 'openai', key: '', placeholder: 'sk-...' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadKeys();
  }, []);

  const loadKeys = () => {
    try {
      const stored = localStorage.getItem('api_keys');
      if (stored) {
        const parsed = JSON.parse(stored);
        setProviders(prev => prev.map(p => ({ ...p, key: parsed[p.name] || '' })));
      }
    } catch (e) {}
    setLoading(false);
  };

  const saveKeys = () => {
    try {
      const keys: Record<string, string> = {};
      providers.forEach(p => { keys[p.name] = p.key; });
      localStorage.setItem('api_keys', JSON.stringify(keys));
      Alert.alert('Success', 'API keys saved! Refresh the page to use them.');
    } catch (e) {
      Alert.alert('Error', 'Failed to save');
    }
  };

  const updateKey = (name: string, value: string) => {
    setProviders(prev => prev.map(p => p.name === name ? { ...p, key: value } : p));
  };

  if (loading) {
    return <View style={styles.container}><Text style={styles.loading}>Loading...</Text></View>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>API Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.infoBox}>
        <Ionicons name="information-circle" size={20} color="#6366f1" />
        <Text style={styles.infoText}>Add your API keys to enable AI features. Keys are stored in your browser.</Text>
      </View>

      {providers.map((p) => (
        <View key={p.name} style={styles.card}>
          <Text style={styles.label}>{p.name.toUpperCase()}</Text>
          <TextInput
            style={styles.input}
            value={p.key}
            onChangeText={(v) => updateKey(p.name, v)}
            placeholder={p.placeholder}
            placeholderTextColor="#666"
            secureTextEntry={p.name !== 'gemini'}
            autoCapitalize="none"
          />
        </View>
      ))}

      <TouchableOpacity style={styles.saveBtn} onPress={saveKeys}>
        <Ionicons name="save" size={20} color="#fff" />
        <Text style={styles.saveText}>Save Keys</Text>
      </TouchableOpacity>

      <View style={styles.tipBox}>
        <Ionicons name="link" size={20} color="#22c55e" />
        <View>
          <Text style={styles.tipTitle}>Get API Keys:</Text>
          <Text style={styles.tip}>• Gemini: aistudio.google.com</Text>
          <Text style={styles.tip}>• DeepSeek: platform.deepseek.com</Text>
          <Text style={styles.tip}>• OpenAI: platform.openai.com</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 16 },
  loading: { color: '#fff', textAlign: 'center', marginTop: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  infoBox: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(99,102,241,0.1)', padding: 12, borderRadius: 8, marginBottom: 24 },
  infoText: { color: '#a3a3a3', fontSize: 13, flex: 1 },
  card: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#262626' },
  label: { fontSize: 12, fontWeight: '600', color: '#6366f1', marginBottom: 8 },
  input: { backgroundColor: '#0a0a0a', padding: 14, borderRadius: 8, color: '#fff', fontSize: 14, borderWidth: 1, borderColor: '#262626' },
  saveBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#6366f1', padding: 16, borderRadius: 12, gap: 8, marginVertical: 24 },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  tipBox: { flexDirection: 'row', backgroundColor: 'rgba(34,197,94,0.1)', padding: 16, borderRadius: 12, gap: 12 },
  tipTitle: { fontSize: 14, fontWeight: '600', color: '#22c55e', marginBottom: 8 },
  tip: { fontSize: 12, color: '#a3a3a3', marginBottom: 4 },
});
