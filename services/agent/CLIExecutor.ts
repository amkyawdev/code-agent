import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface CommandResult {
  success: boolean;
  stdout: string;
  stderr: string;
  exitCode: number;
}

export class CLIExecutor {
  private history: CommandResult[] = [];
  private maxHistory: number = 100;

  async execute(command: string, options: { cwd?: string; timeout?: number } = {}): Promise<CommandResult> {
    const { cwd = process.cwd(), timeout = 30000 } = options;

    try {
      const { stdout, stderr } = await execAsync(command, {
        cwd,
        timeout,
        maxBuffer: 1024 * 1024 * 10, // 10MB buffer
      });

      const result: CommandResult = {
        success: true,
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        exitCode: 0,
      };

      this.addToHistory(result);
      return result;
    } catch (error: any) {
      const result: CommandResult = {
        success: false,
        stdout: error.stdout?.trim() || '',
        stderr: error.stderr?.trim() || error.message,
        exitCode: error.code || 1,
      };

      this.addToHistory(result);
      return result;
    }
  }

  private addToHistory(result: CommandResult) {
    this.history.push(result);
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
  }

  getHistory(): CommandResult[] {
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
  }

  getLastCommand(): CommandResult | null {
    return this.history[this.history.length - 1] || null;
  }

  // Common CLI commands
  async gitStatus(): Promise<CommandResult> {
    return this.execute('git status');
  }

  async npmInstall(packageName?: string): Promise<CommandResult> {
    const command = packageName ? `npm install ${packageName}` : 'npm install';
    return this.execute(command);
  }

  async runScript(script: string): Promise<CommandResult> {
    return this.execute(script);
  }

  async listFiles(directory: string = '.'): Promise<CommandResult> {
    return this.execute(`ls -la ${directory}`);
  }
}

export default CLIExecutor;