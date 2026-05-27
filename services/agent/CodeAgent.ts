import { AIServiceRouter, AIProvider } from './api';

interface TaskContext {
  description: string;
  files?: string[];
  language?: string;
}

interface TaskResult {
  success: boolean;
  output: string;
  logs: string[];
  duration: number;
}

export class CodeAgent {
  private aiService: AIServiceRouter;
  private logs: string[] = [];
  private isProcessing: boolean = false;

  constructor(apiKeys: Record<AIProvider, string>) {
    this.aiService = new AIServiceRouter(apiKeys);
  }

  private log(message: string) {
    const timestamp = new Date().toISOString();
    this.logs.push(`[${timestamp}] ${message}`);
    console.log(message);
  }

  async executeTask(context: TaskContext): Promise<TaskResult> {
    if (this.isProcessing) {
      throw new Error('Agent is already processing a task');
    }

    this.isProcessing = true;
    this.logs = [];
    const startTime = Date.now();

    try {
      this.log(`Starting task: ${context.description}`);

      // Step 1: Analyze the task
      this.log('Analyzing task requirements...');
      const analysisPrompt = this.buildAnalysisPrompt(context);
      
      const analysis = await this.aiService.sendMessage([
        { role: 'system', content: 'You are a code analysis assistant.' },
        { role: 'user', content: analysisPrompt },
      ]);
      
      this.log('Task analysis complete');

      // Step 2: Generate solution
      this.log('Generating solution...');
      const solutionPrompt = this.buildSolutionPrompt(context, analysis.content);
      
      const solution = await this.aiService.sendMessage([
        { role: 'system', content: 'You are a coding assistant. Provide clean, well-documented code.' },
        { role: 'user', content: solutionPrompt },
      ]);

      this.log('Solution generated successfully');

      const duration = Date.now() - startTime;

      return {
        success: true,
        output: solution.content,
        logs: this.logs,
        duration,
      };
    } catch (error: any) {
      this.log(`ERROR: ${error.message}`);
      
      return {
        success: false,
        output: '',
        logs: this.logs,
        duration: Date.now() - startTime,
      };
    } finally {
      this.isProcessing = false;
    }
  }

  private buildAnalysisPrompt(context: TaskContext): string {
    let prompt = `Analyze the following task:\n\n"${context.description}"\n\n`;
    
    if (context.language) {
      prompt += `Programming language: ${context.language}\n`;
    }
    
    if (context.files && context.files.length > 0) {
      prompt += `\nRelevant files:\n${context.files.join('\n')}\n`;
    }

    prompt += '\nProvide a brief analysis of the requirements.';
    
    return prompt;
  }

  private buildSolutionPrompt(context: TaskContext, analysis: string): string {
    let prompt = `Based on this analysis:\n\n${analysis}\n\n`;
    prompt += `Task: ${context.description}\n\n`;
    prompt += 'Provide a complete solution with code.';
    
    return prompt;
  }

  getLogs(): string[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  isReady(): boolean {
    return !this.isProcessing && this.aiService.getAvailableProviders().length > 0;
  }
}

export default CodeAgent;