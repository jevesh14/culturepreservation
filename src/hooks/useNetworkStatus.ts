import { useState, useEffect, useCallback } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

interface NetworkStatus {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  type: string;
  isWifi: boolean;
  isCellular: boolean;
  lastUpdated: number;
}

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isConnected: true,
    isInternetReachable: null,
    type: 'unknown',
    isWifi: false,
    isCellular: false,
    lastUpdated: Date.now(),
  });

  const updateNetworkStatus = useCallback((state: NetInfoState) => {
    try {
      setNetworkStatus({
        isConnected: state.isConnected ?? false,
        isInternetReachable: state.isInternetReachable,
        type: state.type,
        isWifi: state.type === 'wifi',
        isCellular: state.type === 'cellular',
        lastUpdated: Date.now(),
      });
    } catch (error) {
      console.error('Error updating network status:', error);
      // Set a fallback state in case of error
      setNetworkStatus(prev => ({
        ...prev,
        isConnected: false,
        isInternetReachable: false,
        type: 'error',
        lastUpdated: Date.now(),
      }));
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const unsubscribe = NetInfo.addEventListener((state) => {
      if (mounted) {
        updateNetworkStatus(state);
      }
    });

    // Fetch initial state
    NetInfo.fetch()
      .then((state) => {
        if (mounted) {
          updateNetworkStatus(state);
        }
      })
      .catch((error) => {
        console.error('Error fetching network status:', error);
        if (mounted) {
          setNetworkStatus(prev => ({
            ...prev,
            isConnected: false,
            isInternetReachable: false,
            type: 'error',
            lastUpdated: Date.now(),
          }));
        }
      });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [updateNetworkStatus]);

  return networkStatus;
}; 