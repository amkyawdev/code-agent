import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function ChatInput({ value, onChangeText, onSend, placeholder = 'Type a message...', disabled = false }: ChatInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={[styles.container, isFocused && styles.containerFocused]}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="attach" size={24} color="#a3a3a3" />
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#666666"
          multiline
          maxLength={2000}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
        />

        <TouchableOpacity
          style={[styles.sendButton, (!value.trim() || disabled) && styles.sendButtonDisabled]}
          onPress={onSend}
          disabled={!value.trim() || disabled}
        >
          <Ionicons name="send" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#262626',
  },
  containerFocused: {
    backgroundColor: '#262626',
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: '#0a0a0a',
    borderRadius: 20,
    marginHorizontal: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#262626',
  },
});