# AmkyawDev Code Agent

AI-Powered Development Assistant for React Native (Expo)

## Features

- 🤖 **AI Chat** - Chat with multiple AI models (Gemini, OpenAI, Perplexity, DeepSeek)
- 🔧 **Code Agent** - Execute complex coding tasks with CLI output
- 💾 **History** - Manage and search conversation history
- 📚 **Skills** - Dynamic skill loading for specialized tasks
- 🎨 **Beautiful UI** - Dark mode design with animations

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **Styling**: Tailwind CSS + NativeWind
- **Icons**: Bootstrap Icons CDN (via Ionicons)
- **Animations**: React Native Reanimated

## Pages

- `/` - Get Started / Loader
- `/chat` - Chat interface
- `/agent` - Code Agent execution
- `/history` - Conversation history
- `/docs` - Documentation
- `/api-input` - API key configuration
- `/skill/[id]` - Skill details

## Getting Started

```bash
# Install dependencies
npm install

# Start development
npx expo start

# Build for production
npx expo export

# Run on device
npx expo run:android
npx expo run:ios
```

## Environment Variables

Create a `.env` file with your API keys:

```env
GEMINI_API_KEY=your-gemini-key
OPENAI_API_KEY=your-openai-key
PERPLEXITY_API_KEY=your-perplexity-key
DEEPSEEK_API_KEY=your-deepseek-key
```

## Vercel Deployment

```bash
# Deploy to Vercel
vercel

# Production deployment
vercel --prod
```

## Project Structure

```
code-agent-app/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   ├── docs/              # Documentation
│   ├── api-input/         # API configuration
│   └── skill/             # Skill details
├── components/            # UI components
│   ├── ui/                # Base components
│   ├── chat/              # Chat components
│   ├── agent/             # Agent components
│   └── animations/        # Animation components
├── services/              # Business logic
│   ├── api/               # AI API integrations
│   ├── agent/             # Code agent services
│   └── storage/           # Data persistence
├── contexts/              # React contexts
├── hooks/                 # Custom hooks
├── utils/                 # Utility functions
├── types/                 # TypeScript types
└── skills/                # Skill markdown files
```

## AI Models Supported

- **Google Gemini** - Google's generative AI
- **OpenAI** - GPT-4 and GPT-3.5 models
- **Perplexity** - Real-time web search AI
- **DeepSeek** - Advanced reasoning AI

## License

MIT License