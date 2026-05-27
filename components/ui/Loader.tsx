import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
}

export default function Loader({ size = 'md', color = '#6366f1', text }: LoaderProps) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotate.start();

    const scale = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    );
    scale.start();

    return () => {
      rotate.stop();
      scale.stop();
    };
  }, []);

  const getSizeValue = () => {
    switch (size) {
      case 'sm':
        return 20;
      case 'lg':
        return 48;
      default:
        return 32;
    }
  };

  const sizeValue = getSizeValue();
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.loader,
          {
            width: sizeValue,
            height: sizeValue,
            borderRadius: sizeValue / 2,
            borderColor: color,
            transform: [{ rotate: spin }, { scale: scaleAnim }],
          },
        ]}
      />
      {text && <Text style={[styles.text, { color }]}>{text}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  loader: {
    borderWidth: 3,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
  },
});