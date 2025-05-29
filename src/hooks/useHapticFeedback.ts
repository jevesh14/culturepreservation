import * as Haptics from 'expo-haptics';
import { useCallback, useRef } from 'react';

type HapticStyle = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

interface HapticFeedbackOptions {
  debounceMs?: number;
  enabled?: boolean;
}

export const useHapticFeedback = (options: HapticFeedbackOptions = {}) => {
  const { debounceMs = 100, enabled = true } = options;
  const lastTriggerTime = useRef<number>(0);

  const trigger = useCallback(async (style: HapticStyle = 'light') => {
    if (!enabled) return;

    const now = Date.now();
    if (now - lastTriggerTime.current < debounceMs) {
      return;
    }

    try {
      lastTriggerTime.current = now;

      switch (style) {
        case 'light':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case 'medium':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case 'heavy':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
        case 'success':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        case 'warning':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          break;
        case 'error':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;
        default:
          console.warn(`Invalid haptic style: ${style}`);
          return;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.warn('Haptic feedback failed:', error.message);
      } else {
        console.warn('Haptic feedback failed with unknown error');
      }
    }
  }, [enabled, debounceMs]);

  const isEnabled = useCallback(() => enabled, [enabled]);

  return {
    trigger,
    isEnabled,
  };
}; 