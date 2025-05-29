import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import React from 'react';

interface ToastProps {
  title?: string;
  description?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  position?: 'top' | 'bottom';
  offset?: number;
}

interface ToastOptions extends ToastProps {
  onHide?: () => void;
  onShow?: () => void;
}

export function useToast() {
  const show = ({
    title,
    description,
    type = 'info',
    duration = 3000,
    position = 'bottom',
    offset = Platform.select({ ios: 50, android: 40 }),
    onHide,
    onShow,
  }: ToastOptions) => {
    Toast.show({
      type,
      text1: title,
      text2: description,
      visibilityTime: duration,
      position,
      bottomOffset: position === 'bottom' ? offset : undefined,
      topOffset: position === 'top' ? offset : undefined,
      onHide,
      onShow,
    });
  };

  const hide = () => {
    Toast.hide();
  };

  const success = (props: Omit<ToastOptions, 'type'>) => show({ ...props, type: 'success' });
  const error = (props: Omit<ToastOptions, 'type'>) => show({ ...props, type: 'error' });
  const info = (props: Omit<ToastOptions, 'type'>) => show({ ...props, type: 'info' });
  const warning = (props: Omit<ToastOptions, 'type'>) => show({ ...props, type: 'warning' });

  return {
    show,
    hide,
    success,
    error,
    info,
    warning,
  };
}

// Add this component to your App.tsx
export function ToastProvider() {
  return React.createElement(Toast);
}
