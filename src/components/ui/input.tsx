import React from 'react';
import {
  TextInput,
  View,
  Animated,
  StyleSheet,
  Platform,
  ViewStyle,
  TextStyle,
  TextInputProps as RNTextInputProps,
} from 'react-native';

interface InputProps extends Omit<RNTextInputProps, 'style'> {
  error?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      error,
      containerStyle,
      inputStyle,
      leftIcon,
      rightIcon,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handleFocus = (e: any) => {
      setIsFocused(true);
      Animated.spring(scaleAnim, {
        toValue: 1.02,
        useNativeDriver: true,
      }).start();
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      onBlur?.(e);
    };

    return (
      <Animated.View
        style={[
          styles.container,
          error && styles.containerError,
          isFocused && styles.containerFocused,
          { transform: [{ scale: scaleAnim }] },
          containerStyle,
        ]}
      >
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <TextInput
          ref={ref}
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
            inputStyle,
          ]}
          placeholderTextColor="#999"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    minHeight: 48,
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
  containerError: {
    borderColor: '#EF4444',
  },
  containerFocused: {
    borderColor: '#FF7F00',
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  iconContainer: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Input;
