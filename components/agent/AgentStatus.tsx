import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AgentStatusProps {
  status: 'idle' | 'thinking' | 'coding' | 'executing' | 'complete' | 'error';
  color?: string;
}

const statusConfig = {
  idle: {
    icon: 'pause-circle',
    label: 'Idle',
    description: 'Ready to assist',
  },
  thinking: {
    icon: 'bulb',
    label: 'Thinking',
    description: 'Analyzing your request...',
  },
  coding: {
    icon: 'code-slash',
    label: 'Coding',
    description: 'Writing code...',
  },
  executing: {
    icon: 'terminal',
    label: 'Executing',
    description: 'Running commands...',
  },
  complete: {
    icon: 'checkmark-circle',
    label: 'Complete',
    description: 'Task finished successfully',
  },
  error: {
    icon: 'alert-circle',
    label: 'Error',
    description: 'Something went wrong',
  },
};

export default function AgentStatus({ status, color = '#6366f1' }: AgentStatusProps) {
  const config = statusConfig[status];

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={config.icon as any} size={32} color={color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.label, { color }]}>{config.label}</Text>
        <Text style={styles.description}>{config.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#262626',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#a3a3a3',
  },
});