import { Platform, Dimensions, PixelRatio } from 'react-native';
import { useState, useEffect } from 'react';

interface MobileInfo {
  isSmallDevice: boolean;
  isMediumDevice: boolean;
  isLargeDevice: boolean;
  screenWidth: number;
  screenHeight: number;
  pixelDensity: number;
  fontScale: number;
  platform: 'ios' | 'android' | 'web';
}

const SMALL_DEVICE_WIDTH = 320;
const MEDIUM_DEVICE_WIDTH = 375;

export function useMobile(): MobileInfo {
  const [dimensions, setDimensions] = useState(() => Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const { width, height } = dimensions;
  const pixelDensity = PixelRatio.get();
  const fontScale = PixelRatio.getFontScale();

  return {
    isSmallDevice: width <= SMALL_DEVICE_WIDTH,
    isMediumDevice: width > SMALL_DEVICE_WIDTH && width <= MEDIUM_DEVICE_WIDTH,
    isLargeDevice: width > MEDIUM_DEVICE_WIDTH,
    screenWidth: width,
    screenHeight: height,
    pixelDensity,
    fontScale,
    platform: Platform.OS as 'ios' | 'android' | 'web',
  };
} 