// Markdown parser utilities for code blocks and formatting

export function parseMarkdown(text: string): ParsedContent[] {
  const content: ParsedContent[] = [];
  const lines = text.split('\n');
  let currentBlock: CodeBlock | null = null;

  for (const line of lines) {
    // Code block start/end
    if (line.startsWith('```')) {
      if (currentBlock) {
        content.push({ type: 'code', ...currentBlock });
        currentBlock = null;
      } else {
        const language = line.slice(3).trim() || 'code';
        currentBlock = { language, lines: [] };
      }
      continue;
    }

    if (currentBlock) {
      currentBlock.lines.push(line);
      continue;
    }

    // Headers
    if (line.startsWith('# ')) {
      content.push({ type: 'h1', content: line.slice(2) });
      continue;
    }
    if (line.startsWith('## ')) {
      content.push({ type: 'h2', content: line.slice(3) });
      continue;
    }
    if (line.startsWith('### ')) {
      content.push({ type: 'h3', content: line.slice(4) });
      continue;
    }

    // Bold
    if (line.includes('**')) {
      content.push({ type: 'bold', content: line });
      continue;
    }

    // List items
    if (line.startsWith('- ') || line.startsWith('* ')) {
      content.push({ type: 'list', content: line.slice(2) });
      continue;
    }

    // Numbered list
    const numberedMatch = line.match(/^(\d+)\.\s/);
    if (numberedMatch) {
      content.push({ type: 'numbered', content: line.slice(line.indexOf('.') + 2) });
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      continue;
    }

    // Regular text
    content.push({ type: 'paragraph', content: line });
  }

  return content;
}

interface CodeBlock {
  language: string;
  lines: string[];
}

interface ParsedContent {
  type: 'text' | 'code' | 'h1' | 'h2' | 'h3' | 'bold' | 'list' | 'numbered' | 'paragraph';
  content?: string;
  language?: string;
}

export function highlightCode(code: string, language: string): string {
  // Simple syntax highlighting - in production, use a proper highlighter
  let highlighted = code;
  
  // Strings
  highlighted = highlighted.replace(/(["'`])(?:(?!\1)[^\\]|\\.)*\1/g, '<span class="string">$&</span>');
  
  // Keywords
  const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'async', 'await'];
  keywords.forEach((kw) => {
    const regex = new RegExp(`\\b(${kw})\\b`, 'g');
    highlighted = highlighted.replace(regex, '<span class="keyword">$1</span>');
  });
  
  // Comments
  highlighted = highlighted.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');
  
  return highlighted;
}

export function getInlineStyles(type: string): object {
  switch (type) {
    case 'h1':
      return { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginVertical: 8 };
    case 'h2':
      return { fontSize: 20, fontWeight: 'bold', color: '#ffffff', marginVertical: 6 };
    case 'h3':
      return { fontSize: 16, fontWeight: '600', color: '#ffffff', marginVertical: 4 };
    case 'paragraph':
      return { fontSize: 14, color: '#d4d4d4', lineHeight: 22 };
    case 'bold':
      return { fontWeight: 'bold', color: '#ffffff' };
    case 'list':
    case 'numbered':
      return { fontSize: 14, color: '#d4d4d4', marginLeft: 16 };
    default:
      return {};
  }
}