import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ code, language = 'code', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.container}>
      {filename && (
        <View style={styles.header}>
          <Ionicons name="document" size={16} color="#a3a3a3" />
          <Text style={styles.filename}>{filename}</Text>
        </View>
      )}
      <View style={styles.codeContainer}>
        <View style={styles.lineNumbers}>
          {code.split('\n').map((_, i) => (
            <Text key={i} style={styles.lineNumber}>
              {i + 1}
            </Text>
          ))}
        </View>
        <View style={styles.codeContent}>
          <Text style={styles.code}>{code}</Text>
        </View>
        <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
          <Ionicons name={copied ? 'checkmark' : 'copy-outline'} size={18} color="#a3a3a3" />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <View style={styles.languageBadge}>
          <Text style={styles.languageText}>{language}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#262626',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#262626',
    gap: 6,
  },
  filename: {
    fontSize: 12,
    color: '#a3a3a3',
    fontFamily: 'monospace',
  },
  codeContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  lineNumbers: {
    paddingLeft: 12,
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: '#262626',
  },
  lineNumber: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'monospace',
    lineHeight: 20,
  },
  codeContent: {
    flex: 1,
    paddingHorizontal: 12,
  },
  code: {
    fontSize: 13,
    color: '#d4d4d4',
    fontFamily: 'monospace',
    lineHeight: 20,
  },
  copyButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
    backgroundColor: '#262626',
  },
  languageBadge: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  languageText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});