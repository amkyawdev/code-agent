import { Skill } from '@/types/skill';

const SKILLS: Record<string, Skill> = {
  'chat-skill': {
    id: 'chat-skill',
    name: 'Chat Skill',
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
    category: 'chat',
    tags: ['conversation', 'communication', 'guidelines'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  'knowledge-web': {
    id: 'knowledge-web',
    name: 'Knowledge Web',
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
    category: 'research',
    tags: ['research', 'web', 'information', 'documentation'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  'coder-skill': {
    id: 'coder-skill',
    name: 'Coder Skill',
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
    category: 'coding',
    tags: ['coding', 'programming', 'debugging', 'generation'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  'thanking': {
    id: 'thanking',
    name: 'Deep Thinking',
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
    category: 'general',
    tags: ['thinking', 'reasoning', 'analysis', 'problem-solving'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export class SkillLoader {
  async loadSkill(skillId: string): Promise<Skill | null> {
    return SKILLS[skillId] || null;
  }

  async loadAllSkills(): Promise<Skill[]> {
    return Object.values(SKILLS);
  }

  async searchSkills(query: string): Promise<Skill[]> {
    const lowercaseQuery = query.toLowerCase();
    
    return Object.values(SKILLS).filter((skill) => {
      return (
        skill.name.toLowerCase().includes(lowercaseQuery) ||
        skill.description.toLowerCase().includes(lowercaseQuery) ||
        skill.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
      );
    });
  }

  async getSkillsByCategory(category: Skill['category']): Promise<Skill[]> {
    return Object.values(SKILLS).filter((skill) => skill.category === category);
  }
}

export default SkillLoader;