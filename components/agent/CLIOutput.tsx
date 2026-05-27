import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CLIOutputProps {
  lines: string[];
  maxLines?: number;
}

export default function CLIOutput({ lines, maxLines = 50 }: CLIOutputProps) {
  const displayedLines = lines.slice(-maxLines);

  const getLineStyle = (line: string) => {
    if (line.startsWith('$')) return styles.command;
    if (line.startsWith('ERROR')) return styles.error;
    if (line.startsWith('SUCCESS') || line.includes('✓')) return styles.success;
    if (line.startsWith('⚠')) return styles.warning;
    return styles.output;
  };

  const getLineIcon = (line: string) => {
    if (line.startsWith('ERROR')) return 'alert-circle';
    if (line.startsWith('SUCCESS') || line.includes('✓')) return 'checkmark-circle';
    if (line.startsWith('⚠')) return 'warning';
    if (line.startsWith('$')) return 'terminal';
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: '#ef4444' }]} />
          <View style={[styles.dot, { backgroundColor: '#f59e0b' }]} />
          <View style={[styles.dot, { backgroundColor: '#22c55e' }]} />
        </View>
        <Text style={styles.title}>Terminal</Text>
        <Ionicons name="terminal" size={16} color="#a3a3a3" />
      </View>

      <ScrollView style={styles.output} nestedScrollEnabled>
        {displayedLines.map((line, index) => {
          const icon = getLineIcon(line);
          return (
            <View key={index} style={styles.lineContainer}>
              {icon && (
                <Ionicons
                  name={icon as any}
                  size={14}
                  color={
                    line.startsWith('ERROR')
                      ? '#ef4444'
                      : line.startsWith('SUCCESS')
                      ? '#22c55e'
                      : '#a3a3a3'
                  }
                  style={styles.lineIcon}
                />
              )}
              <Text style={[styles.line, getLineStyle(line)]}>
                {line.startsWith('$') ? line.substring(2) : line}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{lines.length} lines</Text>
        {lines.length > maxLines && (
          <Text style={styles.footerWarning}>
            Showing last {maxLines} lines
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0a0a0a',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#262626',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 10,
    gap: 10,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  title: {
    flex: 1,
    fontSize: 12,
    color: '#a3a3a3',
    fontFamily: 'monospace',
  },
  output: {
    maxHeight: 300,
    padding: 12,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  lineIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  line: {
    fontSize: 12,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  command: {
    color: '#22c55e',
  },
  output: {
    color: '#d4d4d4',
  },
  error: {
    color: '#ef4444',
  },
  success: {
    color: '#22c55e',
  },
  warning: {
    color: '#f59e0b',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#262626',
  },
  footerText: {
    fontSize: 10,
    color: '#666666',
  },
  footerWarning: {
    fontSize: 10,
    color: '#f59e0b',
  },
});