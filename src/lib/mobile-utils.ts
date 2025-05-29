import { Dimensions, Platform, PixelRatio, ScaledSize } from 'react-native';

// Screen dimensions utility functions
export const getScreenDimensions = (): ScaledSize => {
  return Dimensions.get('window');
};

// Responsive font sizing
export const normalize = (size: number): number => {
  const scale = Dimensions.get('window').width / 375; // Base width of iPhone X
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

// Platform-specific shadow styles
export const getShadowStyle = (elevation: number = 5) => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: elevation / 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: elevation,
    };
  }
  return {
    elevation,
  };
};

// Device type detection
export const isTablet = (): boolean => {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;
  return aspectRatio <= 1.6;
};

// Safe area insets helper
export const getDefaultSafeAreaInsets = () => ({
  top: Platform.OS === 'ios' ? 44 : 24,
  bottom: Platform.OS === 'ios' ? 34 : 0,
  left: 0,
  right: 0,
});

// Image dimension calculator for responsive layouts
export const calculateImageDimensions = (
  originalWidth: number,
  originalHeight: number,
  maxWidth: number
) => {
  const aspectRatio = originalHeight / originalWidth;
  const width = Math.min(maxWidth, originalWidth);
  const height = width * aspectRatio;
  return { width, height };
};

// Platform-specific hitSlop
export const getDefaultHitSlop = (size: number = 20) => ({
  top: size,
  bottom: size,
  left: size,
  right: size,
});

// Format file size for display
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// Check if device is in portrait mode
export const isPortrait = (): boolean => {
  const { width, height } = Dimensions.get('window');
  return height > width;
};

// Get platform-specific timing configurations
export const getAnimationTiming = () => ({
  standard: Platform.OS === 'ios' ? 300 : 250,
  fast: Platform.OS === 'ios' ? 200 : 150,
  slow: Platform.OS === 'ios' ? 400 : 350,
}); 