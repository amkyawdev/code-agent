import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { APIProvider } from '@/contexts/APIContext';
import { ChatProvider } from '@/contexts/ChatContext';
import { AgentProvider } from '@/contexts/AgentContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#0a0a0a' }}>
      <SafeAreaProvider>
        <APIProvider>
          <ChatProvider>
            <AgentProvider>
              <StatusBar style="light" />
              <Stack
                screenOptions={{
                  headerStyle: {
                    backgroundColor: '#0a0a0a',
                  },
                  headerTintColor: '#ffffff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                  contentStyle: {
                    backgroundColor: '#0a0a0a',
                  },
                }}
              >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen 
                  name="docs" 
                  options={{ 
                    title: 'Documentation',
                    headerBackTitle: 'Back',
                  }} 
                />
                <Stack.Screen 
                  name="api-input" 
                  options={{ 
                    title: 'API Configuration',
                    headerBackTitle: 'Back',
                  }} 
                />
                <Stack.Screen 
                  name="skill/[id]" 
                  options={{ 
                    title: 'Skill',
                    headerBackTitle: 'Back',
                  }} 
                />
              </Stack>
            </AgentProvider>
          </ChatProvider>
        </APIProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}