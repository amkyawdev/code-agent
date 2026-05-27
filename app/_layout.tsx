import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { APIProvider } from '@/contexts/APIContext';
import { HistoryProvider } from '@/contexts/HistoryContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#0a0a0a' }}>
      <SafeAreaProvider>
        <APIProvider>
          <HistoryProvider>
            <StatusBar style="light" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="docs" options={{ title: 'Docs', headerShown: true }} />
              <Stack.Screen name="api-input" options={{ title: 'API Settings', headerShown: true }} />
            </Stack>
          </HistoryProvider>
        </APIProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
