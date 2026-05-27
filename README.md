# 🤖 Code Agent

> AI-Powered Development Assistant for React Native (Expo)

[![GitHub stars](https://img.shields.io/github/stars/amkyawdev/code-agent)](https://github.com/amkyawdev/code-agent/stargazers)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React Native](https://img.shields.io/badge/React%20Native-Expo-61DAFB.svg)](https://expo.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue.svg)](https://www.typescriptlang.org/)

**Your intelligent companion for faster, better code development**

[Features](#-features) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [Skills](#-skills) • [Deployment](#-deployment)

---

## 🎯 Overview

Code Agent is a powerful AI-powered development assistant built with React Native and Expo. It provides intelligent chat, code generation, and task automation capabilities with support for multiple AI providers.

```mermaid
graph LR
    A[User] -->|Request| B[Code Agent]
    B --> C[AI Processing]
    C --> D[Response]
    
    subgraph AI Providers
        E[Gemini]
        F[OpenAI]
        G[Perplexity]
        H[DeepSeek]
    end
    
    C --> E
    C --> F
    C --> G
    C --> H
```

## ✨ Features

| Feature | Description |
|---------|-------------|
| **AI Chat** | Natural conversation with multiple AI models |
| **Code Agent** | Execute complex coding tasks automatically |
| **History** | Searchable conversation history |
| **Skills** | Dynamic skill loading for specialized tasks |
| **Dark Theme** | Beautiful Minimax.io-style interface |
| **Fast** | Optimized for speed and responsiveness |

## 🏗 Architecture

### System Architecture

```mermaid
graph TB
    subgraph Client Layer
        A[React Native App] --> B[UI Components]
        A --> C[Expo Router]
    end
    
    subgraph Business Logic
        D[Context Providers]
        E[Custom Hooks]
        F[Services]
    end
    
    subgraph AI Layer
        G[AI Service Router]
        H[API Providers]
        I[Skill Loader]
    end
    
    subgraph External Services
        J[Gemini API]
        K[OpenAI API]
        L[Perplexity API]
        M[DeepSeek API]
    end
    
    A --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> J
    H --> K
    H --> L
    H --> M
    G --> I
```

### Navigation Structure

```mermaid
graph TD
    A[Get Started] --> B[Home]
    B --> C[Chat]
    B --> D[Agent]
    B --> E[History]
    B --> F[Docs]
    B --> G[API Settings]
    B --> H[Skills]
    
    C --> I[Thinking Animation]
    D --> J[CLI Output]
    F --> K[Documentation]
    G --> L[API Keys]
    H --> M[Skill Details]
```

### Component Hierarchy

```mermaid
graph TB
    subgraph Components
        A[UI Components] --> A1[Button]
        A --> A2[Card]
        A --> A3[Input]
        A --> A4[Icon]
        A --> A5[Loader]
        
        B[Chat Components] --> B1[ChatBubble]
        B --> B2[ChatInput]
        B --> B3[CodeBlock]
        
        C[Agent Components] --> C1[AgentStatus]
        C --> C2[ThinkingAnimation]
        C --> C3[CLIOutput]
        
        D[Animation Components] --> D1[DeepThinking]
        D --> D2[ThinkingIndicator]
    end
```

## 🛠 Tech Stack

```mermaid
graph LR
    subgraph Frontend
        A[React Native] --> B[Expo]
        B --> C[Tailwind CSS]
        C --> D[NativeWind]
    end
    
    subgraph Navigation
        E[Expo Router] --> F[Tab Navigation]
        F --> G[File-based Routing]
    end
    
    subgraph State Management
        H[React Context] --> I[Custom Hooks]
    end
    
    subgraph AI Integration
        J[AI Service Router] --> K[Multiple Providers]
        K --> L[Gemini / OpenAI / Perplexity / DeepSeek]
    end
    
    A --> E
    E --> H
    J --> K
```

| Category | Technology |
|----------|------------|
| **Framework** | React Native + Expo |
| **Language** | TypeScript |
| **Navigation** | Expo Router |
| **Styling** | Tailwind CSS + NativeWind |
| **State** | React Context + Hooks |
| **AI Providers** | Gemini, OpenAI, Perplexity, DeepSeek |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npx expo`)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/amkyawdev/code-agent.git
cd code-agent

# Install dependencies
npm install

# Start development
npx expo start
```

### Project Structure

```mermaid
graph TD
    A[code-agent] --> B[app]
    A --> C[components]
    A --> D[services]
    A --> E[contexts]
    A --> F[hooks]
    A --> G[types]
    A --> H[skills]
    A --> I[utils]
    
    B --> B1[(tabs)]
    B --> B2[docs]
    B --> B3[api-input]
    B --> B4[skill]
    
    C --> C1[ui]
    C --> C2[chat]
    C --> C3[agent]
    C --> C4[animations]
```

```
code-agent/
├── app/                          # Expo Router pages
│   ├── (tabs)/                   # Tab navigation
│   │   ├── index.tsx             # Main / Loader
│   │   ├── chat.tsx              # Chat screen
│   │   ├── agent.tsx             # Agent screen
│   │   └── history.tsx           # History screen
│   ├── docs/                     # Documentation
│   ├── api-input/                # API configuration
│   ├── skill/[id].tsx            # Skill details
│   └── index.tsx                 # Get Started
│
├── components/                    # UI components
│   ├── ui/                       # Base components
│   ├── chat/                     # Chat components
│   ├── agent/                     # Agent components
│   └── animations/              # Animation components
│
├── services/                     # Business logic
│   ├── api/                      # AI API integrations
│   ├── agent/                    # Code agent services
│   └── storage/                  # Data persistence
│
├── contexts/                     # React contexts
├── hooks/                       # Custom hooks
├── types/                       # TypeScript types
├── skills/                       # Skill markdown files
│
├── tailwind.config.js           # Tailwind config
├── app.json                      # Expo config
├── vercel.json                   # Vercel hosting
└── package.json                 # Dependencies
```

## 📚 Skills

Code Agent uses dynamic skills for specialized tasks:

```mermaid
graph TD
    A[Skill System] --> B[Chat Skill]
    A --> C[Knowledge Web]
    A --> D[Coder Skill]
    A --> E[Thinking Skill]
    
    B --> B1[Conversation guidelines]
    C --> C1[Web research and synthesis]
    D --> D1[Code generation and debugging]
    E --> E1[Deep reasoning and analysis]
```

### Available Skills

| Skill | File | Purpose |
|-------|------|---------|
| **Chat** | `chat-skill.md` | Conversational AI guidelines |
| **Knowledge Web** | `knowledge-web.md` | Web research and info gathering |
| **Coder** | `coder-skill.md` | Programming assistance |
| **Thinking** | `thanking.md` | Deep reasoning and analysis |

### Skill Format (Anthropic-aligned)

```yaml
---
name: skill-name
description: "Use this skill when [trigger conditions]"
---

# Skill Title

## Overview
...

## Progressive Disclosure
### Level 1: Quick Answer
### Level 2: Standard Response  
### Level 3: Detailed Explanation
### Level 4: Deep Dive
```

## ☁️ Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Environment Variables

```env
# AI API Keys
GEMINI_API_KEY=your-gemini-key-type
OPENAI_API_KEY=your-openai-key-type
PERPLEXITY_API_KEY=your-perplexity-key-type
DEEPSEEK_API_KEY=your-deepseek-key-type
```

```mermaid
graph LR
    A[Code] --> B[Vercel]
    B --> C[CDN]
    C --> D[Global Edge Network]
    D --> E[Users]
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.io) - For the amazing development platform
- [Tailwind CSS](https://tailwindcss.com) - For styling system
- [Anthropic](https://anthropic.com) - For Claude AI
- [Google](https://deepmind.google/gemini) - For Gemini AI
- [OpenAI](https://openai.com) - For GPT models
- [Perplexity](https://perplexity.ai) - For web search AI
- [DeepSeek](https://deepseek.com) - For reasoning AI

---

**Built with by [AmkyawDev](https://github.com/amkyawdev)**

**Star this repo if you find it useful!**
