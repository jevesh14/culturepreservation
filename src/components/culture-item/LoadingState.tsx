import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';

const LoadingState: React.FC = () => {
  const shimmerValue = React.useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('window');
  const imageHeight = width * 0.7;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    shimmerAnimation.start();

    return () => {
      shimmerAnimation.stop();
    };
  }, []);

  const shimmerTranslate = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  const ShimmerEffect = ({ style }: { style: any }) => (
    <View style={[styles.shimmerContainer, style]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX: shimmerTranslate }],
          },
        ]}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Hero section skeleton */}
      <View style={[styles.heroContainer, { height: imageHeight }]}>
        <View style={styles.heroContent}>
          <ShimmerEffect style={styles.backButton} />
          <View style={styles.tagsContainer}>
            <ShimmerEffect style={styles.tag} />
            <ShimmerEffect style={styles.tag} />
            <ShimmerEffect style={styles.tag} />
          </View>
          <ShimmerEffect style={styles.title} />
          <ShimmerEffect style={styles.description} />
        </View>
      </View>

      {/* Content skeleton */}
      <View style={styles.content}>
        {/* Tabs skeleton */}
        <View style={styles.tabsContainer}>
          <ShimmerEffect style={styles.tab} />
          <ShimmerEffect style={styles.tab} />
          <ShimmerEffect style={styles.tab} />
        </View>

        {/* Main content skeleton */}
        <View style={styles.mainContent}>
          <ShimmerEffect style={styles.paragraph} />
          <ShimmerEffect style={styles.paragraph} />
          <ShimmerEffect style={[styles.paragraph, { width: '75%' }]} />

          <View style={styles.infoBox}>
            <ShimmerEffect style={styles.infoTitle} />
            <View style={styles.infoList}>
              <View style={styles.infoItem}>
                <ShimmerEffect style={styles.infoIcon} />
                <ShimmerEffect style={styles.infoText} />
              </View>
              <View style={styles.infoItem}>
                <ShimmerEffect style={styles.infoIcon} />
                <ShimmerEffect style={styles.infoText} />
              </View>
              <View style={styles.infoItem}>
                <ShimmerEffect style={styles.infoIcon} />
                <ShimmerEffect style={styles.infoText} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  shimmerContainer: {
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },
  shimmer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
    opacity: 0.5,
  },
  heroContainer: {
    backgroundColor: '#E5E7EB',
  },
  heroContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  backButton: {
    width: 100,
    height: 40,
    borderRadius: 8,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    width: 80,
    height: 28,
    borderRadius: 14,
  },
  title: {
    height: 32,
    width: '80%',
    borderRadius: 8,
    marginBottom: 12,
  },
  description: {
    height: 20,
    width: '90%',
    borderRadius: 6,
  },
  content: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    width: 100,
    height: 32,
    borderRadius: 6,
  },
  mainContent: {
    padding: 16,
  },
  paragraph: {
    height: 16,
    width: '100%',
    borderRadius: 4,
    marginBottom: 12,
  },
  infoBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  infoTitle: {
    height: 24,
    width: '40%',
    borderRadius: 6,
    marginBottom: 16,
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  infoText: {
    height: 16,
    width: '60%',
    borderRadius: 4,
  },
});

export default LoadingState;
