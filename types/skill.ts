export interface Skill {
  id: string;
  name: string;
  description: string;
  content: string;
  category: 'chat' | 'coding' | 'research' | 'general';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SkillExecutionResult {
  success: boolean;
  output: string;
  metadata?: {
    tokensUsed?: number;
    duration?: number;
    model?: string;
  };
  error?: string;
}

export interface SkillContext {
  skill: Skill;
  userInput: string;
  previousOutputs?: string[];
}