/// <reference types="vite/client" />

// React Native specific types
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

// Environment variables
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
  readonly VITE_STORAGE_KEY: string
  // Add other env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Custom type declarations for the app
declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      custom: string;
    }
  }
}

// Extend window for web compatibility when needed
declare global {
  interface Window {
    __INITIAL_STATE__?: any;
  }
}
