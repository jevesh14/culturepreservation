import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { libraryData } from './Library';
import { getCategoryData } from './CategoryDetail';
import type { RootStackParamList } from '../App';

type CultureItemDetailRouteProp = RouteProp<RootStackParamList, 'CultureItemDetail'>;

const CultureItemDetail = () => {
  const route = useRoute<CultureItemDetailRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { id: itemId } = route.params;
  const [item, setItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!itemId) {
      setError(true);
      setLoading(false);
      Alert.alert('Error', 'No item ID was provided');
      return;
    }

    setTimeout(() => {
      let matchedItem = libraryData.find(item => item.id === itemId);

      if (!matchedItem) {
        const categoryList = ['scriptures', 'dance-forms', 'festivals', 'art-forms'];
        for (let i = 0; i < categoryList.length; i++) {
          const categoryData: any = getCategoryData(categoryList[i]);
          if (categoryData && Array.isArray(categoryData.items)) {
            const found = categoryData.items.find((itm: any) => itm.id === itemId);
            if (found) {
              matchedItem = found;
              break;
            }
          }
        }
      }

      if (matchedItem) {
        setItem(matchedItem);
      } else {
        setError(true);
        Alert.alert('Item Not Found', `No item found for ID: ${itemId}`);
      }
      setLoading(false);
    }, 300);
  }, [itemId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF7F00" />
        <Text style={styles.loadingText}>Loading item details...</Text>
      </SafeAreaView>
    );
  }

  if (error || !item) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Feather name="camera" size={24} color="black" />
        <Text style={styles.errorTitle}>Item Not Found</Text>
        <Text style={styles.errorText}>
          We couldn't find the item you're looking for.
        </Text>
      </SafeAreaView>
    );
  }

  const TabButton = ({ title, isActive }: { title: string; isActive: boolean }) => (
    <View
      style={[
        styles.tabButton,
        isActive && styles.tabButtonActive
      ]}
    >
      <Text
        style={[
          styles.tabButtonText,
          isActive && styles.tabButtonTextActive
        ]}
      >
        {title}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: item.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{item.title}</Text>
            <Text style={styles.heroMeta}>
              {item.category} • {item.region}
            </Text>
          </View>
        </View>

        {/* Breadcrumbs */}
        <View style={styles.breadcrumbs}>
          <Text style={styles.breadcrumbText}>
            {item.category} / {item.style} / {item.title}
          </Text>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabsContainer}
          >
            {['Overview', 'History', 'Significance', 'Modern Context'].map((tab) => (
              <TabButton
                key={tab}
                title={tab}
                isActive={activeTab === tab.toLowerCase()}
              />
            ))}
          </ScrollView>

          {/* Tab Content */}
          <View style={styles.tabContent}>
            <Text style={styles.description}>{item.description}</Text>
            
            {/* Additional details based on the item */}
            <View style={styles.detailsGrid}>
              {item.era && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Era</Text>
                  <Text style={styles.detailValue}>{item.era}</Text>
                </View>
              )}
              {item.style && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Style</Text>
                  <Text style={styles.detailValue}>{item.style}</Text>
                </View>
              )}
              {item.region && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Region</Text>
                  <Text style={styles.detailValue}>{item.region}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  heroSection: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 300,
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  heroMeta: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  breadcrumbs: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  breadcrumbText: {
    fontSize: 14,
    color: '#666',
  },
  mainContent: {
    padding: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  tabButtonActive: {
    backgroundColor: '#FF7F00',
  },
  tabButtonText: {
    fontSize: 14,
    color: '#666',
  },
  tabButtonTextActive: {
    color: '#fff',
  },
  tabContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 24,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  detailItem: {
    width: (width - 64) / 2,
    marginHorizontal: 8,
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default CultureItemDetail;