import { Platform, Dimensions, PixelRatio } from 'react-native';

// Get device type
export const getDeviceType = () => {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;

  if (Platform.OS === 'ios') {
    return {
      isPhone: !Platform.isPad,
      isTablet: Platform.isPad,
      isTV: false,
    };
  }

  // Android
  return {
    isPhone: aspectRatio > 1.6,
    isTablet: aspectRatio <= 1.6,
    isTV: false,
  };
};

// Format date for display
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format time for display
export const formatTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate unique ID
export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Get platform-specific styles
export const getPlatformStyles = <T>(styles: { ios?: T; android?: T; default: T }): T => {
  if (Platform.OS === 'ios' && styles.ios) return styles.ios;
  if (Platform.OS === 'android' && styles.android) return styles.android;
  return styles.default;
};

// Get responsive font size
export const getResponsiveFontSize = (size: number): number => {
  const { width, height } = Dimensions.get('window');
  const baseWidth = 375; // Base width (iPhone X)
  const scale = Math.min(width, height) / baseWidth;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Format duration in milliseconds to readable string
export const formatDuration = (ms: number): string => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);

  return parts.join(' ') || '0s';
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
};
