import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { CultureItem } from '../../data/cultureItemData';

interface HeroSectionProps {
  item: CultureItem;
}

const HeroSection: React.FC<HeroSectionProps> = ({ item }) => {
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const imageHeight = width * 0.7; // 70% of screen width

  // Fallback image if item.image is invalid
  const backgroundImage = item.image || 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb';

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: backgroundImage }}
        style={[styles.imageBackground, { height: imageHeight }]}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            {/* Back Button */}
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
            >
              <Icon name="arrow-left" size={20} color="#fff" />
              <Text style={styles.backButtonText}>Back</Text>
            </Pressable>

            {/* Tags */}
            <View style={styles.tagsContainer}>
              {item.category && (
                <View style={[styles.tag, styles.primaryTag]}>
                  <Icon name="tag" size={12} color="#fff" />
                  <Text style={styles.tagText}>{item.category}</Text>
                </View>
              )}
              {item.region && (
                <View style={styles.tag}>
                  <Icon name="map-pin" size={12} color="#fff" />
                  <Text style={styles.tagText}>{item.region}</Text>
                </View>
              )}
              {item.era && (
                <View style={styles.tag}>
                  <Icon name="clock" size={12} color="#fff" />
                  <Text style={styles.tagText}>{item.era}</Text>
                </View>
              )}
            </View>

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  imageBackground: {
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        overflow: 'hidden',
      },
    }),
  },
  backButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  primaryTag: {
    backgroundColor: '#FF7F00',
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 24,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
});

export default HeroSection;
