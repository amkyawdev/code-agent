import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        dark: '#0a0a0a',
        'dark-secondary': '#1a1a1a',
        'dark-tertiary': '#262626',
        'text-primary': '#ffffff',
        'text-secondary': '#a3a3a3',
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-glow': 'bounceGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGlow: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 40px rgba(99, 102, 241, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;