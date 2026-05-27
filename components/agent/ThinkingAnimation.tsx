import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ThinkingAnimationProps {
  messages?: string[];
}

const defaultMessages = [
  'Analyzing your request...',
  'Processing context...',
  'Generating response...',
  'Evaluating options...',
  'Finalizing output...',
];

export default function ThinkingAnimation({ messages = defaultMessages }: ThinkingAnimationProps) {
  const [currentMessage, setCurrentMessage] = React.useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2000);

    Animated.loop(
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();

    return () => {
      clearInterval(interval);
    };
  }, [messages.length]);

  const steps = [0, 0.2, 0.4, 0.6, 0.8, 1];
  const activeStep = Math.floor(progressAnim._value * 5);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="bulb" size={24} color="#f59e0b" />
        </View>
        <Animated.Text style={[styles.message, { opacity: fadeAnim }]}>
          {messages[currentMessage]}
        </Animated.Text>
      </View>

      <View style={styles.progressContainer}>
        {steps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.step,
              {
                backgroundColor: index <= activeStep ? '#6366f1' : '#262626',
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.dotsContainer}>
        {[0, 1, 2, 3].map((i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              { opacity: fadeAnim },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#262626',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f59e0b20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  message: {
    fontSize: 14,
    color: '#a3a3a3',
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  step: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6366f1',
  },
});