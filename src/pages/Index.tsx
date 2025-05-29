import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';

type RootStackParamList = {
  Library: undefined;
  Upload: undefined;
  MobileAuth: undefined;
  Discussion: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<NavigationProp>();

  const CategoryCard = ({ title, description, color, link }: any) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: color }]}
      onPress={() => navigation.navigate(link as keyof RootStackParamList)}
    >
      <Feather name="camera" size={24} color="black" />
      <Text style={styles.categoryTitle}>{title}</Text>
      <Text style={styles.categoryDescription}>{description}</Text>
    </TouchableOpacity>
  );

  const NavigationCard = ({ title, description, icon, route }: any) => (
    <TouchableOpacity
      style={styles.navCard}
      onPress={() => navigation.navigate(route as keyof RootStackParamList)}
    >
      <View style={styles.iconContainer}>
      <Feather name="camera" size={24} color="black" />
      </View>
      <Text style={styles.navTitle}>{title}</Text>
      <Text style={styles.navDescription}>{description}</Text>
      <View style={styles.navLink}>
        <Text style={styles.navLinkText}>Visit {title}</Text>
        <Feather name="camera" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require('../../assets/hero-pattern.jpg')}
          style={styles.hero}
          imageStyle={{ opacity: 0.3 }}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>भारत संस्कृति</Text>
            <Text style={styles.heroSubtitle}>Discover India's Cultural Heritage</Text>
            <Text style={styles.heroText}>
              Explore and contribute to a vast repository of Indian art, dance, music, scriptures, and cultural traditions.
            </Text>

            <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#FF7F00" style={styles.searchIcon} />

              <TextInput
                style={styles.searchInput}
                placeholder="Search culture, heritage, stories..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <Feather name="camera" size={24} color="black" />
            </View>

            <View style={styles.quickActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.primaryButton]}
                onPress={() => navigation.navigate('Library')}
              >
                <Feather name="camera" size={24} color="black" />
                <Text style={styles.primaryButtonText}>Browse Library</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={() => navigation.navigate('Upload')}
              >
                <Feather name="camera" size={24} color="black" />
                <Text style={styles.secondaryButtonText}>Upload Content</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={() => navigation.navigate('MobileAuth')}
              >
                <Feather name="camera" size={24} color="black" />
                <Text style={styles.secondaryButtonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Cultural Categories</Text>
              <Text style={styles.sectionSubtitle}>Explore India's diverse cultural treasures</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Library')}>
              <Text style={styles.viewAllLink}>View all categories</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categoriesGrid}>
            <CategoryCard
              title="Scriptures"
              color="#FF7F00"
              link="Library"
              description="Ancient texts and manuscripts from various periods of Indian history."
            />
            <CategoryCard
              title="Dance Forms"
              color="#00A0B0"
              link="Library"
              description="Classical and folk dance traditions from across India's diverse regions."
            />
            <CategoryCard
              title="Art Forms"
              color="#4CAF50"
              link="Library"
              description="Painting, sculpture, and decorative arts showcasing India's artistic legacy."
            />
            <CategoryCard
              title="Festivals"
              color="#8B0000"
              link="Library"
              description="Celebrations and traditions that mark India's cultural and religious calendar."
            />
          </View>
        </View>

        <View style={styles.navSection}>
          <Text style={styles.navSectionTitle}>Explore the Cultural Hub</Text>
          <View style={styles.navGrid}>
            <NavigationCard
              title="Library"
              icon="book"
              route="Library"
              description="Explore a vast open-source repository of cultural content."
            />
            <NavigationCard
              title="Upload Content"
              icon="upload"
              route="Upload"
              description="Contribute your own cultural content to share with the community."
            />
            <NavigationCard
              title="Discussion Portal"
              icon="message-square"
              route="Discussion"
              description="Engage in discussions and connect with others."
            />
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
  hero: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  heroContent: {
    maxWidth: 600,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#FF7F00',
  },
  heroSubtitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  heroText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 127, 0, 0.3)',
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  searchIcon: {
    padding: 12,
  },
  bookmarkIcon: {
    padding: 12,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: '#FF7F00',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(255, 127, 0, 0.4)',
  },
  primaryButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '500',
  },
  secondaryButtonText: {
    color: '#FF7F00',
    marginLeft: 8,
    fontWeight: '500',
  },
  categoriesSection: {
    padding: 20,
    backgroundColor: 'white',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: '#666',
  },
  viewAllLink: {
    color: '#FF7F00',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  categoryDescription: {
    color: 'white',
    opacity: 0.9,
    fontSize: 14,
  },
  navSection: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  navSectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  navGrid: {
    gap: 16,
  },
  navCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 127, 0, 0.2)',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 127, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  navDescription: {
    color: '#666',
    marginBottom: 16,
  },
  navLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navLinkText: {
    color: '#FF7F00',
    fontWeight: '500',
    marginRight: 8,
  },
});

export default Index;
