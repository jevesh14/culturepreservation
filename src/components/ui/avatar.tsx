import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';

interface AvatarProps {
  source?: string;
  fallback?: string;
  size?: number;
  style?: ViewStyle;
}

const Avatar = ({
  source,
  fallback,
  size = 40,
  style,
}: AvatarProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getFallbackInitials = () => {
    if (!fallback) return '?';
    return fallback
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  return (
    <View style={[styles.container, containerStyle, style]}>
      {source && !hasError ? (
        <>
          <Image
            source={{ uri: source }}
            style={[styles.image, containerStyle]}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            onError={() => setHasError(true)}
          />
          {isLoading && (
            <View style={[styles.loadingContainer, containerStyle]}>
              <ActivityIndicator color="#FF7F00" />
            </View>
          )}
        </>
      ) : (
        <View style={[styles.fallback, containerStyle]}>
          <Text style={[styles.fallbackText, { fontSize: size * 0.4 }]}>
            {getFallbackInitials()}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  fallback: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF7F00',
  },
  fallbackText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Avatar;
