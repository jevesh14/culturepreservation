import React from 'react';
import {
  TouchableOpacity,
  Animated,
  StyleSheet,
  ViewStyle,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface CheckboxProps {
  checked: boolean;
  onValueChange: (checked: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
}

const Checkbox = ({
  checked,
  onValueChange,
  disabled = false,
  style,
  size = 24,
  activeColor = '#FF7F00',
  inactiveColor = '#e5e5e5',
}: CheckboxProps) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const checkAnim = React.useRef(new Animated.Value(checked ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.spring(checkAnim, {
      toValue: checked ? 1 : 0,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  }, [checked]);

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
    <TouchableOpacity
      onPress={() => !disabled && onValueChange(!checked)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
    >
      <Animated.View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius: size / 6,
            backgroundColor: checked ? activeColor : '#fff',
            borderColor: checked ? activeColor : inactiveColor,
            transform: [{ scale: scaleAnim }],
            opacity: disabled ? 0.5 : 1,
          },
          style,
        ]}
      >
        <Animated.View
          style={{
            transform: [
              {
                scale: checkAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
            opacity: checkAnim,
          }}
        >
          <Icon
            name="check"
            size={size * 0.6}
            color="#fff"
          />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});

export default Checkbox;
