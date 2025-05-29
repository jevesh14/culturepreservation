import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CultureItem } from '../../data/cultureItemData';

interface ItemDetailTabsProps {
  item: CultureItem;
}

type TabType = 'overview' | 'history' | 'significance' | 'relevance';

const ItemDetailTabs: React.FC<ItemDetailTabsProps> = ({ item }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const translateX = React.useRef(new Animated.Value(0)).current;

  // Check if any detailed content exists
  const hasHistory = item.historicalBackground && item.historicalBackground.trim() !== '';
  const hasSignificance = item.culturalSignificance && item.culturalSignificance.trim() !== '';
  const hasRelevance = item.modernRelevance && item.modernRelevance.trim() !== '';
  
  // If no detailed content exists, we'll only show overview
  const hasDetailedContent = hasHistory || hasSignificance || hasRelevance;

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview' },
    ...(hasHistory ? [{ id: 'history' as TabType, label: 'Historical Background' }] : []),
    ...(hasSignificance ? [{ id: 'significance' as TabType, label: 'Cultural Significance' }] : []),
    ...(hasRelevance ? [{ id: 'relevance' as TabType, label: 'Modern Relevance' }] : []),
  ];

  const handleTabPress = (tab: TabType, index: number) => {
    setActiveTab(tab);
    Animated.spring(translateX, {
      toValue: index * (Platform.OS === 'ios' ? 100 : 120),
      useNativeDriver: true,
    }).start();
  };

  const renderOverviewContent = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.description}>{item.description}</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>About {item.title.split(':')[0]}</Text>
        <View style={styles.infoList}>
          <View style={styles.infoItem}>
            <Icon name="tag" size={20} color="#FF7F00" />
            <Text style={styles.infoText}>
              Category: <Text style={styles.infoHighlight}>{item.category}</Text>
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="map-pin" size={20} color="#FF7F00" />
            <Text style={styles.infoText}>
              Region: <Text style={styles.infoHighlight}>{item.region || 'Various Regions'}</Text>
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="clock" size={20} color="#FF7F00" />
            <Text style={styles.infoText}>
              Era: <Text style={styles.infoHighlight}>{item.era || 'Traditional'}</Text>
            </Text>
          </View>
        </View>
      </View>

      {!hasDetailedContent && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            We're currently expanding our knowledge base for {item.title.split(':')[0]}.
            More detailed information will be available soon.
          </Text>
        </View>
      )}
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'history':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Historical Background</Text>
            <Text style={styles.contentText}>{item.historicalBackground}</Text>
          </View>
        );
      case 'significance':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Cultural Significance</Text>
            <Text style={styles.contentText}>{item.culturalSignificance}</Text>
          </View>
        );
      case 'relevance':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Modern Relevance</Text>
            <Text style={styles.contentText}>{item.modernRelevance}</Text>
          </View>
        );
      default:
        return renderOverviewContent();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
        {tabs.map((tab, index) => (
          <Pressable
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab,
            ]}
            onPress={() => handleTabPress(tab.id, index)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
        <Animated.View
          style={[
            styles.tabIndicator,
            {
              transform: [{ translateX }],
              width: Platform.OS === 'ios' ? 100 : 120,
            },
          ]}
        />
      </ScrollView>

      <ScrollView
        style={styles.contentScroll}
        showsVerticalScrollIndicator={false}
      >
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabsContainer: {
    maxHeight: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabsContent: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  activeTab: {
    borderBottomColor: '#FF7F00',
  },
  tabText: {
    fontSize: 14,
    color: '#6B7280',
    ...Platform.select({
      ios: {
        fontWeight: '500',
      },
      android: {
        fontFamily: 'Roboto-Medium',
      },
    }),
  },
  activeTabText: {
    color: '#FF7F00',
    fontWeight: 'bold',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: '#FF7F00',
  },
  contentScroll: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
  },
  infoHighlight: {
    fontWeight: '600',
    color: '#111827',
  },
  emptyState: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
});

export default ItemDetailTabs;
