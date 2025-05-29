import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface BadgeProps {
  text: string | number;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Badge = ({
  text,
  variant = 'default',
  size = 'medium',
  style,
  textStyle,
}: BadgeProps) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        styles[`container_${variant}`],
        styles[`container_${size}`],
        { transform: [{ scale: scaleAnim }] },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${variant}`],
          styles[`text_${size}`],
          textStyle,
        ]}
        numberOfLines={1}
      >
        {text}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_default: {
    backgroundColor: '#e5e5e5',
  },
  container_primary: {
    backgroundColor: '#FF7F00',
  },
  container_secondary: {
    backgroundColor: '#f5f5f5',
  },
  container_success: {
    backgroundColor: '#10B981',
  },
  container_warning: {
    backgroundColor: '#F59E0B',
  },
  container_error: {
    backgroundColor: '#EF4444',
  },
  container_small: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
  },
  container_medium: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    minWidth: 24,
  },
  container_large: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 28,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  text_default: {
    color: '#666',
  },
  text_primary: {
    color: '#fff',
  },
  text_secondary: {
    color: '#333',
  },
  text_success: {
    color: '#fff',
  },
  text_warning: {
    color: '#fff',
  },
  text_error: {
    color: '#fff',
  },
  text_small: {
    fontSize: 10,
  },
  text_medium: {
    fontSize: 12,
  },
  text_large: {
    fontSize: 14,
  },
});

export default Badge;
