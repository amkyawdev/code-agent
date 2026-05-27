import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}: ButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          button: styles.secondaryButton,
          text: styles.secondaryText,
        };
      case 'outline':
        return {
          button: styles.outlineButton,
          text: styles.outlineText,
        };
      case 'ghost':
        return {
          button: styles.ghostButton,
          text: styles.ghostText,
        };
      default:
        return {
          button: styles.primaryButton,
          text: styles.primaryText,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          button: styles.smButton,
          text: styles.smText,
        };
      case 'lg':
        return {
          button: styles.lgButton,
          text: styles.lgText,
        };
      default:
        return {
          button: styles.mdButton,
          text: styles.mdText,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles.button,
        sizeStyles.button,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, variantStyles.text, sizeStyles.text, textStyle]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    gap: 8,
  },
  text: {
    fontWeight: '600',
  },
  // Variants
  primaryButton: {
    backgroundColor: '#6366f1',
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryButton: {
    backgroundColor: '#8b5cf6',
  },
  secondaryText: {
    color: '#ffffff',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#6366f1',
  },
  outlineText: {
    color: '#6366f1',
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  ghostText: {
    color: '#a3a3a3',
  },
  // Sizes
  smButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  smText: {
    fontSize: 12,
  },
  mdButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  mdText: {
    fontSize: 14,
  },
  lgButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  lgText: {
    fontSize: 16,
  },
  // States
  disabled: {
    opacity: 0.5,
  },
});