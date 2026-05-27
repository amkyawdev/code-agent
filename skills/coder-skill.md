---
name: coder
description: Use this skill whenever you need to write, read, debug, or modify code. This includes generating new code, debugging errors, explaining code, code review, refactoring, adding tests, or any programming task. Triggers when user asks to write code, sees an error, wants to understand code, or needs programming help. Not for pure design or architecture discussions without implementation - use architecture skill for that.
---

# Coder Skill - Programming Assistance Guide

## Overview
The Coder Skill provides comprehensive coding assistance including code generation, debugging, and code review.

## Features

### 1. Code Generation

**Capabilities**:
- Write clean, efficient, and well-documented code
- Follow language-specific best practices and patterns
- Include proper error handling
- Generate testable code

**Supported Languages**:
- JavaScript / TypeScript
- Python
- React Native / React
- HTML / CSS
- And many more...

**Code Generation Best Practices**:
```javascript
// Always include:
// 1. Type definitions (for TypeScript)
// 2. Error handling
// 3. Documentation comments
// 4. Usage examples

/**
 * Process user data with validation
 * @param {UserData} data - User input data
 * @returns {ProcessedResult} Processed result
 * @throws {ValidationError} When data is invalid
 */
function processUserData(data: UserData): ProcessedResult {
  // Validation
  if (!data || typeof data !== 'object') {
    throw new ValidationError('Invalid input data');
  }
  
  // Processing logic
  // ...
  
  return result;
}
```

### 2. Debugging Assistance

**Debugging Process**:
1. **Analyze**: Review error messages and symptoms
2. **Identify**: Find the root cause of the issue
3. **Fix**: Suggest corrections with explanations
4. **Verify**: Recommend testing approaches

**Debugging Example**:
```
Error: [error message]
Context: [what you were doing]
Expected: [what should happen]
Actual: [what happens instead]

Analysis:
- [Root cause identification]
- [Why this is happening]

Solution:
- [Fix with code]
- [Explanation]

Verification:
- [How to test the fix]
```

### 3. Code Review

**Review Checklist**:
- ✅ Code correctness and functionality
- ✅ Error handling and edge cases
- ✅ Performance and efficiency
- ✅ Security considerations
- ✅ Code style and readability
- ✅ Testing coverage
- ✅ Documentation

### 4. Best Practices

**Code Structure**:
```javascript
// Organize code with clear separation of concerns
const Module = {
  // Public API
  init: () => {},
  execute: () => {},
  
  // Private implementation
  _helper: () => {},
};
```

**Error Handling**:
```javascript
try {
  await riskyOperation();
} catch (error) {
  logger.error('Operation failed', { error, context });
  throw new AppError('USER_FRIENDLY_MESSAGE', { cause: error });
}
```

## Usage Tips

1. **Always explain requirements**: Share what the code should do
2. **Include context**: Mention the use case and constraints
3. **Specify language/version**: Helps generate appropriate code
4. **Request examples**: Ask for usage examples
5. **Mention dependencies**: List libraries or frameworks to use

## Code Templates

### API Endpoint
```javascript
// Express.js example
app.post('/api/resource', async (req, res) => {
  try {
    const data = validateInput(req.body);
    const result = await processData(data);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});
```

### React Component
```tsx
// React Native/React example
interface Props {
  title: string;
  onPress: () => void;
}

export const Button: React.FC<Props> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
```

## Testing Recommendations

- Unit tests for individual functions
- Integration tests for API endpoints
- Snapshot tests for UI components
- Always include edge case tests