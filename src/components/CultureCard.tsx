import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import type { RootStackParamList } from '../App';

interface CultureCardProps {
  id: string;
  title: string;
  image: string;
  category?: string;
  region?: string;
  era?: string;
  style?: 'grid' | 'list';
}

const CultureCard = ({
  id,
  title,
  image,
  category,
  region,
  era,
  style = 'grid',
}: CultureCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [imageLoading, setImageLoading] = useState(true);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    navigation.navigate('CultureItemDetail', { id });
  };

  const renderImage = () => (
    <View style={style === 'list' ? styles.listImageContainer : styles.gridImageContainer}>
      <Image
        source={{ uri: image }}
        style={style === 'list' ? styles.listImage : styles.gridImage}
        onLoadStart={() => setImageLoading(true)}
        onLoadEnd={() => setImageLoading(false)}
      />
      {imageLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#FF7F00" />
        </View>
      )}
    </View>
  );

  if (style === 'list') {
    return (
      <Animated.View style={{ opacity: opacityAnim }}>
        <TouchableOpacity
          style={[styles.listContainer, { transform: [{ scale: scaleAnim }] }]}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
        >
          {renderImage()}
          <View style={styles.listContent}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            {category && (
              <View style={styles.metaItem}>
                <Icon name="tag" size={12} color="#666" />
                <Text style={styles.metaText}>{category}</Text>
              </View>
            )}
            {region && (
              <View style={styles.metaItem}>
                <Icon name="map-pin" size={12} color="#666" />
                <Text style={styles.metaText}>{region}</Text>
              </View>
            )}
            {era && (
              <View style={styles.metaItem}>
                <Icon name="clock" size={12} color="#666" />
                <Text style={styles.metaText}>{era}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={{ opacity: opacityAnim }}>
      <TouchableOpacity
        style={[styles.gridContainer, { transform: [{ scale: scaleAnim }] }]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.7}
      >
        {renderImage()}
        <View style={styles.gridContent}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          {category && (
            <View style={styles.metaItem}>
              <Icon name="tag" size={12} color="#666" />
              <Text style={styles.metaText}>{category}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const { width } = Dimensions.get('window');
const gridWidth = (width - 48) / 2; // 2 columns with padding

const styles = StyleSheet.create({
  gridContainer: {
    width: gridWidth,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  gridImageContainer: {
    width: '100%',
    height: gridWidth,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridContent: {
    padding: 12,
  },
  listContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  listImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  listImage: {
    width: '100%',
    height: '100%',
  },
  listContent: {
    flex: 1,
    marginLeft: 12,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});

export default CultureCard;
