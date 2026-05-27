# Chat Skill

## Overview
This skill provides guidelines for effective AI conversations and interactions.

## Key Principles

### 1. Be Clear and Specific
- State your question clearly and concisely
- Provide sufficient context when asking complex questions
- Specify the expected output format (code, explanation, list, etc.)
- Include any constraints or requirements

### 2. Use Code Blocks
When sharing code or technical content, always use markdown code blocks with language specification:

```javascript
// Example: Clean code formatting
const greet = (name) => {
  return `Hello, ${name}!`;
};
```

### 3. Ask for Clarification
If the response is unclear or incomplete:
- Ask follow-up questions
- Request examples
- Ask for alternative solutions

### 4. Provide Context
Help the AI understand your situation:
- Share relevant background information
- Mention what you've already tried
- Include error messages or unexpected outputs
- Specify your environment or constraints

## Best Practices

1. **Break Down Complex Problems**
   - Divide complex tasks into smaller, manageable parts
   - Ask for help with specific components first
   - Build understanding incrementally

2. **Share Relevant Details**
   - Include error messages verbatim
   - Describe what you've already tried
   - Mention your environment (OS, language version, etc.)
   - Share relevant code snippets

3. **Iterate and Refine**
   - Be patient with iterative improvement
   - Provide feedback on what works and what doesn't
   - Ask for alternatives if a solution doesn't fit

4. **Use Appropriate Channels**
   - Use Chat for questions and discussion
   - Use Agent for complex multi-step tasks
   - Use Skills for specialized functionality

## Common Scenarios

### Asking for Code
```markdown
I need a function that [description]. 
Please include error handling and type annotations.
```

### Debugging Help
```markdown
I'm getting this error: [error message]
When I run: [command or code]
Expected: [what should happen]
Actual: [what happens instead]
```

### Learning New Concepts
```markdown
Can you explain [concept] in the context of [your use case]?
Please include practical examples.
```

## Communication Tips

- **Be direct**: Get to the point quickly
- **Be specific**: Include all relevant details
- **Be patient**: Complex requests may need multiple exchanges
- **Be collaborative**: Work with the AI to refine solutions