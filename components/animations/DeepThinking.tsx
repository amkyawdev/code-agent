import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

interface DeepThinkingProps {
  progress?: number;
}

export default function DeepThinking({ progress = 0 }: DeepThinkingProps) {
  const pulseAnim = useRef(new Animated.Value(0.8)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.8,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    const glow = Animated.loop(
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.ease,
        useNativeDriver: false,
      })
    );
    glow.start();

    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotate.start();

    return () => {
      pulse.stop();
      glow.stop();
      rotate.stop();
    };
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <View style={styles.container}>
      <View style={styles.brainContainer}>
        <Animated.View
          style={[
            styles.outerRing,
            {
              transform: [{ rotate: spin }],
              opacity: glowOpacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.innerGlow,
            { transform: [{ scale: pulseAnim }] },
          ]}
        />
        <Animated.View
          style={[
            styles.core,
            { transform: [{ scale: pulseAnim }] },
          ]}
        >
          <Text style={styles.brainEmoji}>🧠</Text>
        </Animated.View>
      </View>

      <View style={styles.thoughtContainer}>
        <View style={styles.thoughtBubble}>
          <Text style={styles.thoughtText}>Analyzing</Text>
          <View style={styles.thinkingDots}>
            {[0, 1, 2].map((i) => (
              <Animated.View
                key={i}
                style={[
                  styles.dot,
                  {
                    opacity: pulseAnim,
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{Math.round(progress)}%</Text>
      </View>

      <Text style={styles.statusText}>Deep Thinking Mode</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
  },
  brainContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  outerRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#6366f1',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },
  innerGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6366f120',
  },
  core: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  brainEmoji: {
    fontSize: 36,
  },
  thoughtContainer: {
    marginBottom: 24,
  },
  thoughtBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#262626',
  },
  thoughtText: {
    fontSize: 14,
    color: '#a3a3a3',
    marginRight: 8,
  },
  thinkingDots: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6366f1',
  },
  progressContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#262626',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#a3a3a3',
    fontFamily: 'monospace',
    width: 40,
    textAlign: 'right',
  },
  statusText: {
    fontSize: 12,
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});