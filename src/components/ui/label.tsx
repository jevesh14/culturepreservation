import React from 'react';
import {
  Text,
  StyleSheet,
  TextStyle,
  Pressable,
  Animated,
} from 'react-native';

interface LabelProps {
  children: React.ReactNode;
  style?: TextStyle;
  required?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}

const Label = ({
  children,
  style,
  required = false,
  disabled = false,
  onPress,
}: LabelProps) => {
  const opacityAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!onPress) return;
    Animated.spring(opacityAnim, {
      toValue: 0.7,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    if (!onPress) return;
    Animated.spring(opacityAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const renderContent = () => (
    <Animated.Text
      style={[
        styles.label,
        disabled && styles.disabled,
        { opacity: opacityAnim },
        style,
      ]}
      accessibilityRole="text"
    >
      {children}
      {required && <Text style={styles.required}> *</Text>}
    </Animated.Text>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        accessibilityRole="button"
      >
        {renderContent()}
      </Pressable>
    );
  }

  return renderContent();
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  disabled: {
    opacity: 0.5,
  },
  required: {
    color: '#FF7F00',
  },
});

export default Label;
