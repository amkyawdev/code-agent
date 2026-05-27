import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import NavBar from '@/components/NavBar';

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShown: false,
        }}
      >
        <Tabs.Screen name="chat" />
        <Tabs.Screen name="agent" />
        <Tabs.Screen name="history" />
      </Tabs>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
});
