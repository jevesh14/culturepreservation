import { useState, useEffect, useCallback, useMemo } from 'react';
import { AppState, AppStateStatus } from 'react-native';

type AppStateListener = (state: AppStateStatus) => void;

interface AppStateInfo {
  appState: AppStateStatus;
  isActive: boolean;
  isBackground: boolean;
  isInactive: boolean;
  lastChanged: number;
}

export const useAppState = (onChange?: AppStateListener) => {
  const [appStateInfo, setAppStateInfo] = useState<AppStateInfo>({
    appState: AppState.currentState,
    isActive: AppState.currentState === 'active',
    isBackground: AppState.currentState === 'background',
    isInactive: AppState.currentState === 'inactive',
    lastChanged: Date.now(),
  });

  const handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
    setAppStateInfo(prev => ({
      appState: nextAppState,
      isActive: nextAppState === 'active',
      isBackground: nextAppState === 'background',
      isInactive: nextAppState === 'inactive',
      lastChanged: Date.now(),
    }));
    onChange?.(nextAppState);
  }, [onChange]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [handleAppStateChange]);

  return useMemo(() => ({
    ...appStateInfo,
    isFirstLoad: appStateInfo.lastChanged === Date.now(),
  }), [appStateInfo]);
}; 