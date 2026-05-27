import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

interface ThinkingIndicatorProps {
  color?: string;
  size?: number;
}

export default function ThinkingIndicator({ color = '#6366f1', size = 40 }: ThinkingIndicatorProps) {
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createDotAnimation = (anim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animation1 = createDotAnimation(dot1Anim, 0);
    const animation2 = createDotAnimation(dot2Anim, 200);
    const animation3 = createDotAnimation(dot3Anim, 400);

    animation1.start();
    animation2.start();
    animation3.start();

    return () => {
      animation1.stop();
      animation2.stop();
      animation3.stop();
    };
  }, []);

  const dot1Style = {
    opacity: dot1Anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
    transform: [
      {
        translateY: dot1Anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -8],
        }),
      },
    ],
  };

  const dot2Style = {
    opacity: dot2Anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
    transform: [
      {
        translateY: dot2Anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -8],
        }),
      },
    ],
  };

  const dot3Style = {
    opacity: dot3Anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
    transform: [
      {
        translateY: dot3Anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -8],
        }),
      },
    ],
  };

  const dotSize = size * 0.25;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View
        style={[
          styles.dot,
          { backgroundColor: color, width: dotSize, height: dotSize, borderRadius: dotSize / 2 },
          dot1Style,
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          { backgroundColor: color, width: dotSize, height: dotSize, borderRadius: dotSize / 2 },
          dot2Style,
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          { backgroundColor: color, width: dotSize, height: dotSize, borderRadius: dotSize / 2 },
          dot3Style,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {},
});