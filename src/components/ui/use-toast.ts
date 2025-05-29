import React from 'react';
import Toast from 'react-native-toast-message';

interface ToastProps {
  title?: string;
  description?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export function useToast() {
  const toast = ({ title, description, type = 'info', duration = 3000 }: ToastProps) => {
    Toast.show({
      type,
      text1: title,
      text2: description,
      visibilityTime: duration,
      position: 'bottom',
      bottomOffset: 40,
    });
  };

  return toast;
}

// Add this component to your App.tsx
export function ToastProvider() {
  return React.createElement(Toast);
}

// Types for better TypeScript support
export type ToastFunction = (props: ToastProps) => void;
