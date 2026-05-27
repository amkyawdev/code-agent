// Tailwind CSS utilities for React Native
// Note: In React Native, Tailwind is used via NativeWind

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const colors = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  accent: '#06b6d4',
  dark: '#0a0a0a',
  'dark-secondary': '#1a1a1a',
  'dark-tertiary': '#262626',
};

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Common Tailwind classes as objects
export const tailwindClasses = {
  // Flexbox
  flex: { display: 'flex' },
  'flex-col': { flexDirection: 'column' },
  'flex-row': { flexDirection: 'row' },
  'flex-1': { flex: 1 },
  'flex-wrap': { flexWrap: 'wrap' },
  'items-center': { alignItems: 'center' },
  'items-start': { alignItems: 'flex-start' },
  'items-end': { alignItems: 'flex-end' },
  'justify-center': { justifyContent: 'center' },
  'justify-between': { justifyContent: 'space-between' },
  'justify-end': { justifyContent: 'flex-end' },
  
  // Spacing
  'p-4': { padding: 16 },
  'px-4': { paddingHorizontal: 16 },
  'py-4': { paddingVertical: 16 },
  'm-4': { margin: 16 },
  'mx-4': { marginHorizontal: 16 },
  'my-4': { marginVertical: 16 },
  'gap-4': { gap: 16 },
  
  // Text
  'text-white': { color: '#ffffff' },
  'text-gray': { color: '#a3a3a3' },
  'text-sm': { fontSize: 12 },
  'text-base': { fontSize: 14 },
  'text-lg': { fontSize: 16 },
  'text-xl': { fontSize: 20 },
  'text-2xl': { fontSize: 24 },
  'font-bold': { fontWeight: 'bold' },
  'font-semibold': { fontWeight: '600' },
  
  // Background
  'bg-dark': { backgroundColor: '#0a0a0a' },
  'bg-gray-800': { backgroundColor: '#1a1a1a' },
  'bg-gray-700': { backgroundColor: '#262626' },
  'bg-primary': { backgroundColor: '#6366f1' },
  
  // Border
  'border': { borderWidth: 1 },
  'border-gray': { borderColor: '#262626' },
  'rounded-lg': { borderRadius: 12 },
  'rounded-full': { borderRadius: 9999 },
};

// Helper function to merge classes
export function cn(...classes: (object | undefined | null | false)[]): object {
  return classes.filter(Boolean).reduce((acc, cls) => ({ ...acc, ...cls }), {});
}