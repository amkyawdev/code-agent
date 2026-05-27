import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AgentStatus from '@/components/agent/AgentStatus';
import ThinkingAnimation from '@/components/agent/ThinkingAnimation';
import CLIOutput from '@/components/agent/CLIOutput';
import { useAgent } from '@/hooks/useAgent';

export default function AgentScreen() {
  const insets = useSafeAreaInsets();
  const { status, isThinking, output, runTask } = useAgent();
  const [taskInput, setTaskInput] = useState('');

  const handleRunTask = () => {
    if (taskInput.trim()) {
      runTask(taskInput.trim());
      setTaskInput('');
    }
  };

  const statusColors: Record<string, string> = {
    idle: '#a3a3a3',
    thinking: '#6366f1',
    coding: '#8b5cf6',
    executing: '#06b6d4',
    complete: '#22c55e',
    error: '#ef4444',
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Code Agent</Text>
        <TouchableOpacity style={styles.refreshButton}>
          <Ionicons name="refresh" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <AgentStatus status={status} color={statusColors[status]} />
        
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>Task Input</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.taskInput}
              value={taskInput}
              onChangeText={setTaskInput}
              placeholder="Describe your task..."
              placeholderTextColor="#666666"
              multiline
              numberOfLines={4}
            />
            <TouchableOpacity 
              style={styles.runButton}
              onPress={handleRunTask}
              disabled={isThinking}
            >
              <Ionicons name="play" size={20} color="#ffffff" />
              <Text style={styles.runButtonText}>Run</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isThinking && <ThinkingAnimation />}

        {output.length > 0 && (
          <View style={styles.outputSection}>
            <Text style={styles.sectionTitle}>Output</Text>
            <CLIOutput lines={output} />
          </View>
        )}

        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Available Skills</Text>
          <View style={styles.skillsGrid}>
            {['chat-skill.md', 'knowledge-web.md', 'coder-skill.md', 'thanking.md'].map((skill) => (
              <TouchableOpacity key={skill} style={styles.skillCard}>
                <Ionicons name="document-text" size={24} color="#6366f1" />
                <Text style={styles.skillName}>{skill.replace('.md', '')}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  refreshButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  inputSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a3a3a3',
    marginBottom: 12,
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
  taskInput: {
    padding: 16,
    color: '#ffffff',
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  runButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    gap: 8,
  },
  runButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  outputSection: {
    marginBottom: 24,
  },
  skillsSection: {
    marginBottom: 24,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skillCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#262626',
  },
  skillName: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});