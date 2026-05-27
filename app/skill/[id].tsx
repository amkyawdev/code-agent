import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const SKILLS: Record<string, { title: string; description: string; content: string }> = {
  'chat-skill': {
    title: 'Chat Skill',
    description: 'Guidelines for effective conversation',
    content: `# Chat Skill

## Overview
This skill provides guidelines for effective AI conversations.

## Key Principles

### 1. Be Clear and Specific
- State your question clearly
- Provide context when needed
- Specify the expected output format

### 2. Use Code Blocks
When sharing code, always use markdown code blocks:
\`\`\`javascript
const example = "Hello World";
console.log(example);
\`\`\`

### 3. Ask for Clarification
If the response is unclear, ask follow-up questions to get better answers.

## Best Practices

1. Break complex problems into smaller parts
2. Share relevant error messages
3. Describe what you've already tried
4. Be patient with iterative refinement`,
  },
  'knowledge-web': {
    title: 'Knowledge Web',
    description: 'Web research and information gathering',
    content: `# Knowledge Web Skill

## Purpose
This skill helps with web research and information gathering.

## Capabilities

### Search & Research
- Find relevant documentation
- Search for solutions to common problems
- Gather technical specifications

### Information Synthesis
- Consolidate findings from multiple sources
- Identify patterns and best practices
- Provide actionable recommendations

## Usage Tips

1. Start with a clear research question
2. Provide any known context
3. Specify the depth of research needed
4. Request specific output formats`,
  },
  'coder-skill': {
    title: 'Coder Skill',
    description: 'Code generation and debugging assistance',
    content: `# Coder Skill

## Overview
This skill provides comprehensive coding assistance.

## Features

### Code Generation
- Write clean, efficient code
- Follow best practices and patterns
- Include proper documentation

### Debugging
- Analyze error messages
- Identify root causes
- Suggest fixes with explanations

### Code Review
- Suggest improvements
- Identify potential issues
- Optimize performance

## Supported Languages
- JavaScript/TypeScript
- Python
- React Native
- HTML/CSS
- And many more...

## Best Practices

1. Always explain the code
2. Include usage examples
3. Mention any dependencies
4. Suggest testing approaches`,
  },
  'thanking': {
    title: 'Deep Thinking',
    description: 'Advanced reasoning and analysis',
    content: `# Deep Thinking Skill

## Overview
This skill enables advanced reasoning and analysis for complex problems.

## Capabilities

### Structured Thinking
- Break down complex problems
- Analyze from multiple angles
- Consider edge cases

### Reasoning Chain
- Show step-by-step reasoning
- Explain decision logic
- Identify assumptions

### Solution Design
- Create robust solutions
- Consider trade-offs
- Plan for scalability

## When to Use

1. Complex problem solving
2. Architecture decisions
3. Troubleshooting difficult bugs
4. Strategic planning

## Example Process

1. **Understand**: What is the problem?
2. **Analyze**: What are the constraints?
3. **Design**: What solutions exist?
4. **Evaluate**: Which is best?
5. **Implement**: How to execute?`,
  },
};

export default function SkillDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, [id]);

  const skill = SKILLS[id || 'chat-skill'];

  if (loading) {
    return (
      <View style={[styles.container, styles.centered, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color="#ffffff" 
          onPress={() => router.back()} 
        />
        <Text style={styles.headerTitle}>{skill?.title || 'Skill Not Found'}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {skill ? (
          <>
            <View style={styles.titleSection}>
              <View style={styles.iconContainer}>
                <Ionicons name="document-text" size={32} color="#6366f1" />
              </View>
              <Text style={styles.title}>{skill.title}</Text>
              <Text style={styles.description}>{skill.description}</Text>
            </View>

            <View style={styles.contentSection}>
              <Text style={styles.contentText}>{skill.content}</Text>
            </View>
          </>
        ) : (
          <View style={styles.notFound}>
            <Ionicons name="alert-circle" size={64} color="#ef4444" />
            <Text style={styles.notFoundText}>Skill not found</Text>
            <Text style={styles.notFoundSubtext}>
              The requested skill does not exist.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#a3a3a3',
  },
  contentSection: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#262626',
  },
  contentText: {
    fontSize: 14,
    color: '#d4d4d4',
    lineHeight: 24,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  notFoundText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
  },
  notFoundSubtext: {
    fontSize: 14,
    color: '#a3a3a3',
    marginTop: 8,
  },
});