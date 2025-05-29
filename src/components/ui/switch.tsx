import React from 'react';
import {
  Pressable,
  Animated,
  StyleSheet,
  ViewStyle,
  Platform,
} from 'react-native';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
}

const Switch = ({
  value,
  onValueChange,
  disabled = false,
  style,
  activeColor = '#FF7F00',
  inactiveColor = '#e5e5e5',
  thumbColor = '#ffffff',
}: SwitchProps) => {
  const translateX = React.useRef(new Animated.Value(value ? 20 : 0)).current;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? 20 : 0,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  }, [value]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
    >
      <Animated.View
        style={[
          styles.track,
          {
            backgroundColor: value ? activeColor : inactiveColor,
            transform: [{ scale: scaleAnim }],
            opacity: disabled ? 0.5 : 1,
          },
          style,
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor: thumbColor,
              transform: [{ translateX }],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    padding: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

export default Switch;
