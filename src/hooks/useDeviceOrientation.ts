import { useState, useEffect, useMemo } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

type Orientation = 'portrait' | 'landscape';

interface OrientationInfo {
  orientation: Orientation;
  isPortrait: boolean;
  isLandscape: boolean;
  width: number;
  height: number;
}

export const useDeviceOrientation = (): OrientationInfo => {
  const window = Dimensions.get('window');
  const [dimensions, setDimensions] = useState<ScaledSize>(window);

  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      setDimensions(window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return useMemo(() => {
    const orientation = dimensions.width < dimensions.height ? 'portrait' : 'landscape';
    return {
      orientation,
      isPortrait: orientation === 'portrait',
      isLandscape: orientation === 'landscape',
      width: dimensions.width,
      height: dimensions.height,
    };
  }, [dimensions.width, dimensions.height]);
}; 