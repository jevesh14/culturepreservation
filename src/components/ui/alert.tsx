import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ViewStyle,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface AlertProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  onClose?: () => void;
  style?: ViewStyle;
}

const getIconName = (variant: AlertProps['variant']) => {
  switch (variant) {
    case 'destructive':
      return 'alert-triangle';
    case 'success':
      return 'check-circle';
    case 'warning':
      return 'alert-circle';
    default:
      return 'info';
  }
};

const getVariantColor = (variant: AlertProps['variant']) => {
  switch (variant) {
    case 'destructive':
      return '#EF4444';
    case 'success':
      return '#10B981';
    case 'warning':
      return '#F59E0B';
    default:
      return '#FF7F00';
  }
};

const Alert = ({
  title,
  description,
  variant = 'default',
  onClose,
  style,
}: AlertProps) => {
  const translateY = React.useRef(new Animated.Value(-20)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleClose = () => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: -20,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.();
    });
  };

  const color = getVariantColor(variant);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
          borderLeftColor: color,
        },
        style,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon name={getIconName(variant)} size={24} color={color} />
        </View>
        <View style={styles.textContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          {description && (
            <Text style={styles.description}>{description}</Text>
          )}
        </View>
        {onClose && (
          <TouchableOpacity
            onPress={handleClose}
            style={styles.closeButton}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Icon name="x" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderLeftWidth: 4,
    marginVertical: 8,
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
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
  },
  iconContainer: {
    marginRight: 12,
    paddingTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    marginLeft: 12,
    padding: 4,
  },
});

export default Alert;
