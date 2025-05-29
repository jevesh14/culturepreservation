import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

// Define categories and sorting options
const categories = [
  'All Topics',
  'Culture Debates',
  'Ancient vs. Modern',
  'Lost Traditions',
  'Story of the Week',
  'Regional Spotlights'
];

const sortOptions = [
  'Trending',
  'Recent'
];

const Discussion = () => {
  const [activeCategory, setActiveCategory] = useState('All Topics');
  const [sortBy, setSortBy] = useState('Trending');
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const FilterChip = ({ label, isActive, onPress }: { label: string; isActive: boolean; onPress: () => void }) => (
    <TouchableOpacity
      style={[
        styles.filterChip,
        isActive && styles.filterChipActive
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.filterChipText,
        isActive && styles.filterChipTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const SortPicker = () => (
    <View style={styles.sortContainer}>
      <Text style={styles.sortLabel}>Sort by:</Text>
      {sortOptions.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.sortOption,
            sortBy === option && styles.sortOptionActive
          ]}
          onPress={() => setSortBy(option)}
        >
          <Text style={[
            styles.sortOptionText,
            sortBy === option && styles.sortOptionTextActive
          ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="camera" size={24} color="black" />
            <Text style={styles.backButtonText}>Back to home</Text>
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Discussion Portal</Text>
            <Text style={styles.headerSubtitle}>
              Join conversations about Indian culture and heritage
            </Text>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
          <Feather name="camera" size={24} color="black" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search discussions..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Filters Section */}
        <View style={styles.filtersSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <FilterChip
                key={category}
                label={category}
                isActive={activeCategory === category}
                onPress={() => setActiveCategory(category)}
              />
            ))}
          </ScrollView>
          <SortPicker />
        </View>

        {/* Featured Topic */}
        <View style={styles.featuredSection}>
          <View style={styles.featuredCard}>
            <View style={styles.featuredHeader}>
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>Featured Topic</Text>
              </View>
              <Text style={styles.featuredType}>Weekly Topic</Text>
            </View>

            <Text style={styles.featuredTitle}>
              Ready for discussions about Indian culture
            </Text>

            <Text style={styles.featuredDescription}>
              This space is prepared for authentic discussions about Indian culture, traditions, and heritage.
              Add real discussions to engage with the community.
            </Text>

            <View style={styles.featuredFooter}>
              <Text style={styles.noDiscussionsText}>No active discussions yet</Text>
              <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startButtonText}>Start Discussion</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Guidelines Card */}
          <View style={styles.guidelinesCard}>
            <Text style={styles.guidelinesTitle}>Community Guidelines</Text>
            <View style={styles.guidelinesList}>
              {[
                'Be respectful of diverse perspectives and cultural sensitivities.',
                'Cite sources when sharing historical or academic information.',
                'Focus on constructive dialogue rather than criticism.'
              ].map((guideline, index) => (
                <View key={index} style={styles.guidelineItem}>
                  <View style={styles.guidelineNumber}>
                    <Text style={styles.guidelineNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.guidelineText}>{guideline}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Empty State */}
        <View style={styles.emptyState}>
        <Feather name="camera" size={24} color="black" />
          <Text style={styles.emptyStateTitle}>No discussions yet</Text>
          <Text style={styles.emptyStateText}>
            Check back later for discussions about Indian culture and heritage
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff9f5',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  headerContent: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
  },
  filtersSection: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoriesScroll: {
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#FF7F00',
  },
  filterChipText: {
    color: '#666',
    fontSize: 14,
  },
  filterChipTextActive: {
    color: '#fff',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  sortOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderRadius: 16,
  },
  sortOptionActive: {
    backgroundColor: '#FF7F00/10',
  },
  sortOptionText: {
    color: '#666',
    fontSize: 14,
  },
  sortOptionTextActive: {
    color: '#FF7F00',
  },
  featuredSection: {
    padding: 16,
    backgroundColor: '#fff9f5',
  },
  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FF7F00/20',
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  featuredBadge: {
    backgroundColor: '#FF7F00',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredType: {
    color: '#666',
    fontSize: 14,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featuredDescription: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  noDiscussionsText: {
    color: '#666',
    fontSize: 14,
  },
  startButton: {
    backgroundColor: '#FF7F00',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  guidelinesCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  guidelinesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  guidelinesList: {
    gap: 12,
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  guidelineNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF7F00/10',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 2,
  },
  guidelineNumberText: {
    color: '#FF7F00',
    fontSize: 12,
    fontWeight: '600',
  },
  guidelineText: {
    flex: 1,
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Discussion;
