import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
  ViewStyle,
} from 'react-native';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  variant?: 'default' | 'outline';
}

const Card = ({
  children,
  onPress,
  style,
  variant = 'default',
}: CardProps) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!onPress) return;
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    if (!onPress) return;
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const renderContent = () => (
    <Animated.View
      style={[
        styles.container,
        styles[`container_${variant}`],
        { transform: [{ scale: scaleAnim }] },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.7}
        style={styles.touchable}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return <View style={styles.touchable}>{renderContent()}</View>;
};

interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const CardHeader = ({ children, style }: CardHeaderProps) => (
  <View style={[styles.header, style]}>{children}</View>
);

interface CardTitleProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const CardTitle = ({ children, style }: CardTitleProps) => (
  <Text style={[styles.title, style]}>{children}</Text>
);

interface CardDescriptionProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const CardDescription = ({ children, style }: CardDescriptionProps) => (
  <Text style={[styles.description, style]}>{children}</Text>
);

interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const CardContent = ({ children, style }: CardContentProps) => (
  <View style={[styles.content, style]}>{children}</View>
);

interface CardFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const CardFooter = ({ children, style }: CardFooterProps) => (
  <View style={[styles.footer, style]}>{children}</View>
);

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
  },
  container: {
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  container_default: {
    backgroundColor: '#fff',
  },
  container_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  content: {
    padding: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
});

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
