import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAPI } from '@/contexts/APIContext';

const AI_MODELS = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    icon: 'planet',
    color: '#4285f4',
    placeholder: 'Enter your Gemini API Key',
    docsUrl: 'https://makersuite.google.com/app/apikey',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    icon: 'brain',
    color: '#22c55e',
    placeholder: 'Enter your OpenAI API Key',
    docsUrl: 'https://platform.openai.com/api-keys',
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    icon: 'search',
    color: '#f59e0b',
    placeholder: 'Enter your Perplexity API Key',
    docsUrl: 'https://www.perplexity.ai/settings/api',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    icon: 'fish',
    color: '#06b6d4',
    placeholder: 'Enter your DeepSeek API Key',
    docsUrl: 'https://platform.deepseek.com/api_keys',
  },
];

export default function APIInputScreen() {
  const insets = useSafeAreaInsets();
  const { apiKeys, setAPIKey } = useAPI();
  const [activeTab, setActiveTab] = useState('gemini');
  const [keyValue, setKeyValue] = useState('');

  const currentModel = AI_MODELS.find((m) => m.id === activeTab)!;

  const handleSave = () => {
    if (keyValue.trim()) {
      setAPIKey(activeTab, keyValue.trim());
      setKeyValue('');
      Alert.alert('Success', `${currentModel.name} API key saved successfully!`);
    }
  };

  const handleClear = () => {
    Alert.alert(
      'Clear API Key',
      `Are you sure you want to remove your ${currentModel.name} API key?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => setAPIKey(activeTab, ''),
        },
      ]
    );
  };

  const handleGetKey = () => {
    Alert.alert(
      'Get API Key',
      `Visit ${currentModel.docsUrl} to get your ${currentModel.name} API key.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>API Configuration</Text>
      </View>

      <View style={styles.tabs}>
        {AI_MODELS.map((model) => (
          <TouchableOpacity
            key={model.id}
            style={[styles.tab, activeTab === model.id && { borderBottomColor: model.color }]}
            onPress={() => {
              setActiveTab(model.id);
              setKeyValue('');
            }}
          >
            <Ionicons name={model.icon as any} size={20} color={activeTab === model.id ? model.color : '#666666'} />
            <Text style={[styles.tabText, activeTab === model.id && { color: model.color }]}>
              {model.name.split(' ')[0]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.modelCard}>
          <View style={[styles.modelIcon, { backgroundColor: currentModel.color + '20' }]}>
            <Ionicons name={currentModel.icon as any} size={32} color={currentModel.color} />
          </View>
          <Text style={styles.modelName}>{currentModel.name}</Text>
          <Text style={styles.modelStatus}>
            {apiKeys[currentModel.id as keyof typeof apiKeys] 
              ? '✓ Configured' 
              : 'Not configured'}
          </Text>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.sectionLabel}>API Key</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={keyValue}
              onChangeText={setKeyValue}
              placeholder={currentModel.placeholder}
              placeholderTextColor="#666666"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          
          <TouchableOpacity style={styles.getKeyButton} onPress={handleGetKey}>
            <Ionicons name="open-outline" size={18} color="#6366f1" />
            <Text style={styles.getKeyText}>Get API Key</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.saveButton, { backgroundColor: currentModel.color }]}
            onPress={handleSave}
          >
            <Ionicons name="save" size={20} color="#ffffff" />
            <Text style={styles.saveButtonText}>Save API Key</Text>
          </TouchableOpacity>

          {apiKeys[currentModel.id as keyof typeof apiKeys] && (
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
              <Text style={styles.clearButtonText}>Clear API Key</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.infoSection}>
          <Ionicons name="shield-checkmark" size={20} color="#22c55e" />
          <Text style={styles.infoText}>
            Your API keys are stored securely on your device and never sent to our servers.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
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
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    gap: 6,
  },
  tabText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  modelCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#262626',
  },
  modelIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  modelName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  modelStatus: {
    fontSize: 14,
    color: '#a3a3a3',
  },
  inputSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a3a3a3',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  inputContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#262626',
    overflow: 'hidden',
  },
  input: {
    padding: 16,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'monospace',
  },
  getKeyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 6,
  },
  getKeyText: {
    fontSize: 14,
    color: '#6366f1',
  },
  actions: {
    gap: 12,
    marginBottom: 24,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#ef4444',
    gap: 8,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#262626',
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#a3a3a3',
    lineHeight: 18,
  },
});