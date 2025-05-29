import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';

// Sample data for library content
export const libraryData = [
  // Heritage Sites
  {
    id: 'amber-fort',
    title: 'Amber Fort: A Fortress of Grandeur',
    image: 'https://images.unsplash.com/photo-1582034984939-690e8c08bf30',
    category: 'Heritage Sites',
    region: 'Jaipur, Rajasthan',
    era: '16th Century',
    style: 'Rajput-Mughal',
    description: 'A majestic blend of Hindu and Mughal architecture, featuring ornate gates, mirrored halls, and sweeping courtyards.'
  },
  {
    id: 'jaisalmer-fort',
    title: 'Jaisalmer Fort: The Golden Citadel',
    image: 'https://images.unsplash.com/photo-1477587458883-47160a8ef1d3',
    category: 'Heritage Sites',
    region: 'Jaisalmer, Rajasthan',
    era: '12th Century',
    style: 'Rajput',
    description: 'One of the world\'s few living forts, with honey-colored sandstone walls that house temples, palaces, and havelis.'
  },
  {
    id: 'mehrangarh-fort',
    title: 'Mehrangarh Fort: The Citadel of the Sun',
    image: 'https://images.unsplash.com/photo-1584793632154-c10a5a332596',
    category: 'Heritage Sites',
    region: 'Jodhpur, Rajasthan',
    era: '15th Century',
    style: 'Rajput',
    description: 'Perched 400 feet above Jodhpur, this imposing fort features intricate carvings, expansive courtyards, and a museum.'
  },
  {
    id: 'kumbhalgarh-fort',
    title: 'Kumbhalgarh Fort: The Great Wall of India',
    image: 'https://images.unsplash.com/photo-1589308855438-8669de405637',
    category: 'Heritage Sites',
    region: 'Rajsamand, Rajasthan',
    era: '15th Century',
    style: 'Rajput',
    description: 'Home to the world\'s second-longest continuous wall after the Great Wall of China, spanning over 36 kilometers.'
  },
  {
    id: 'chittorgarh-fort',
    title: 'Chittorgarh Fort: Symbol of Rajput Valor',
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f',
    category: 'Heritage Sites',
    region: 'Chittorgarh, Rajasthan',
    era: '7th Century',
    style: 'Rajput',
    description: 'The largest fort in India, known for tales of sacrifice, heroism, and the legendary Queen Padmini.'
  },
  {
    id: 'ranakpur-jain-temple',
    title: 'Ranakpur Jain Temple: Marvel in Marble',
    image: 'https://images.unsplash.com/photo-1566449519566-bfaef686d558',
    category: 'Heritage Sites',
    region: 'Pali, Rajasthan',
    era: '15th Century',
    style: 'Jain',
    description: 'A stunning white marble temple with 1,444 intricately carved pillars, no two of which are identical.'
  },
  {
    id: 'junagarh-fort',
    title: 'Junagarh Fort: The Unconquered',
    image: 'https://images.unsplash.com/photo-1598090216740-5e26a7b112ce',
    category: 'Heritage Sites',
    region: 'Bikaner, Rajasthan',
    era: '16th Century',
    style: 'Rajput',
    description: 'One of the few major forts in Rajasthan not built on a hilltop, featuring palaces, temples, and pavilions.'
  },
  
  // Architectural Beauties
  {
    id: 'hawa-mahal',
    title: 'Hawa Mahal: The Palace of Winds',
    image: 'https://images.unsplash.com/photo-1586370925911-25d9ebc94dfd',
    category: 'Architectural Beauties',
    region: 'Jaipur, Rajasthan',
    era: '18th Century',
    style: 'Rajput',
    description: 'With its honeycomb façade and 953 small windows, it was designed for royal women to observe street life without being seen.'
  },
  {
    id: 'jal-mahal',
    title: 'Jal Mahal: Water Palace of Jaipur',
    image: 'https://images.unsplash.com/photo-1581276879432-15a67f61f30e',
    category: 'Architectural Beauties',
    region: 'Jaipur, Rajasthan',
    era: '18th Century',
    style: 'Rajput-Mughal',
    description: 'Floating in the middle of Man Sagar Lake, this palace is a tranquil fusion of Rajput and Mughal design.'
  },
  {
    id: 'patwon-ki-haveli',
    title: 'Patwon Ki Haveli: The Mansion of Brocade Merchants',
    image: 'https://images.unsplash.com/photo-1590080748533-30e7eecb3887',
    category: 'Architectural Beauties',
    region: 'Jaisalmer, Rajasthan',
    era: '19th Century',
    style: 'Rajput',
    description: 'A cluster of five havelis with intricate jharokhas (balconies) and mirror work that showcase the wealth of merchant families.'
  },
  {
    id: 'city-palace-udaipur',
    title: 'City Palace: Venice of the East',
    image: 'https://images.unsplash.com/photo-1575566393505-61c896c54ac3',
    category: 'Architectural Beauties',
    region: 'Udaipur, Rajasthan',
    era: '16th Century',
    style: 'Rajput-Mughal',
    description: 'A magnificent complex of palaces overlooking Lake Pichola, blending medieval, European and Chinese architectural styles.'
  },
  {
    id: 'jantar-mantar',
    title: 'Jantar Mantar: The Astronomical Wonder',
    image: 'https://images.unsplash.com/photo-1590732690527-d41183edcbfa',
    category: 'Architectural Beauties',
    region: 'Jaipur, Rajasthan',
    era: '18th Century',
    style: 'Scientific',
    description: 'A collection of nineteen astronomical instruments capable of tracking stars and predicting eclipses with remarkable accuracy.'
  },
  {
    id: 'chand-baori',
    title: 'Chand Baori: The Geometric Stepwell',
    image: 'https://images.unsplash.com/photo-1589308981283-8ce9e67dbd6e',
    category: 'Architectural Beauties',
    region: 'Abhaneri, Rajasthan',
    era: '9th Century',
    style: 'Ancient',
    description: 'One of the deepest and most visually spectacular stepwells in India, with 3,500 narrow steps descending 13 stories.'
  },
  {
    id: 'umaid-bhawan',
    title: 'Umaid Bhawan: The Art Deco Palace',
    image: 'https://images.unsplash.com/photo-1576487236230-6aa2b15d7d90',
    category: 'Architectural Beauties',
    region: 'Jodhpur, Rajasthan',
    era: '20th Century',
    style: 'Indo-Deco',
    description: 'One of the world\'s largest private residences, part palace, part hotel, and part museum, built with golden-yellow sandstone.'
  },
  
  // Folk Life & Traditions
  {
    id: 'bishnoi',
    title: 'Bishnoi Traditions: Guardians of Nature',
    image: 'https://images.unsplash.com/photo-1571758441389-6dbb208c3a9f',
    category: 'Folk Life & Traditions',
    region: 'Western Rajasthan',
    era: 'Traditional',
    style: 'Lifestyle',
    description: 'The Bishnoi community lives in harmony with nature—protecting trees, wildlife, and the blackbuck as a model of eco-spiritual living.'
  },
  {
    id: 'pushkar-fair',
    title: 'Pushkar Camel Fair: Desert Carnival',
    image: 'https://images.unsplash.com/photo-1584451854588-5b6b0dfced09',
    category: 'Folk Life & Traditions',
    region: 'Pushkar, Rajasthan',
    era: 'Annual',
    style: 'Festival',
    description: 'One of the world\'s largest camel fairs, combining livestock trading with religious pilgrimage and vibrant folk festivities.'
  },
  {
    id: 'rajasthani-puppet',
    title: 'Kathputli: The String Puppets',
    image: 'https://images.unsplash.com/photo-1622482594949-a2791df1546c',
    category: 'Folk Life & Traditions',
    region: 'Rajasthan',
    era: 'Traditional',
    style: 'Performance',
    description: 'Ancient storytelling tradition using colorful wooden puppets to narrate folk tales, epics, and royal adventures.'
  },
  {
    id: 'phad-painting',
    title: 'Phad: Scroll Painting Tradition',
    image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d',
    category: 'Folk Life & Traditions',
    region: 'Bhilwara, Rajasthan',
    era: 'Medieval',
    style: 'Art',
    description: 'Religious scrolls depicting heroic deities like Pabuji and Devnarayan, used by Bhopa priest-singers for narrative performances.'
  },
  {
    id: 'bandhani',
    title: 'Bandhani: The Art of Tie-Dye',
    image: 'https://images.unsplash.com/photo-1626713191783-43256c917597',
    category: 'Folk Life & Traditions',
    region: 'Rajasthan',
    era: 'Traditional',
    style: 'Textile',
    description: 'A traditional tie-dyeing technique creating intricate patterns on fabric, symbolizing joy and fertility in Rajasthani culture.'
  },
  {
    id: 'rann-utsav',
    title: 'Desert Festival: Celebration of Resilience',
    image: 'https://images.unsplash.com/photo-1604404896684-b72501e3e1e6',
    category: 'Folk Life & Traditions',
    region: 'Jaisalmer, Rajasthan',
    era: 'Annual',
    style: 'Festival',
    description: 'A vibrant celebration in the Thar Desert featuring camel races, folk music, turban-tying competitions, and traditional cuisine.'
  },
  {
    id: 'blue-city',
    title: 'Blue City: Living Heritage of Jodhpur',
    image: 'https://images.unsplash.com/photo-1583424201553-33b206a9a365',
    category: 'Folk Life & Traditions',
    region: 'Jodhpur, Rajasthan',
    era: 'Historical',
    style: 'Urban',
    description: 'The azure-painted houses of old Jodhpur represent Brahmin heritage, natural cooling, and insect repellent practices.'
  }
];

// Filter options
const categories = [
  { id: 'heritage-sites', label: 'Heritage Sites' },
  { id: 'architectural-beauties', label: 'Architectural Beauties' },
  { id: 'folk-life-traditions', label: 'Folk Life & Traditions' },
  { id: 'dance-forms', label: 'Dance Forms' },
  { id: 'art-forms', label: 'Art Forms' },
  { id: 'scriptures', label: 'Scriptures' },
  { id: 'festivals', label: 'Festivals' }
];

const regions = [
  { id: 'jaipur', label: 'Jaipur' },
  { id: 'jodhpur', label: 'Jodhpur' },
  { id: 'jaisalmer', label: 'Jaisalmer' },
  { id: 'udaipur', label: 'Udaipur' },
  { id: 'bikaner', label: 'Bikaner' },
  { id: 'chittorgarh', label: 'Chittorgarh' },
  { id: 'rajsamand', label: 'Rajsamand' },
  { id: 'pali', label: 'Pali' },
  { id: 'western-rajasthan', label: 'Western Rajasthan' }
];

const eras = [
  { id: '7th-century', label: '7th Century' },
  { id: '9th-century', label: '9th Century' },
  { id: '12th-century', label: '12th Century' },
  { id: '15th-century', label: '15th Century' },
  { id: '16th-century', label: '16th Century' },
  { id: '18th-century', label: '18th Century' },
  { id: '19th-century', label: '19th Century' },
  { id: '20th-century', label: '20th Century' },
  { id: 'medieval', label: 'Medieval' },
  { id: 'traditional', label: 'Traditional' },
  { id: 'annual', label: 'Annual' }
];

const styleOptions = [
  { id: 'rajput', label: 'Rajput' },
  { id: 'rajput-mughal', label: 'Rajput-Mughal' },
  { id: 'jain', label: 'Jain' },
  { id: 'indo-deco', label: 'Indo-Deco' },
  { id: 'scientific', label: 'Scientific' },
  { id: 'ancient', label: 'Ancient' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'performance', label: 'Performance' },
  { id: 'festival', label: 'Festival' },
  { id: 'art', label: 'Art' },
  { id: 'textile', label: 'Textile' },
  { id: 'urban', label: 'Urban' }
];

type RootStackParamList = {
  Home: undefined;
  Library: undefined;
  CultureItemDetail: { id: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Library = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const filteredData = libraryData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
    const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(item.region);
    return matchesSearch && matchesCategory && matchesRegion;
  });

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedRegions([]);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleRegion = (region: string) => {
    setSelectedRegions(prev =>
      prev.includes(region)
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  const renderCultureCard = ({ item }: { item: typeof libraryData[0] }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CultureItemDetail', { id: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardMeta}>{item.category} • {item.region}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const FilterChip = ({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) => (
    <TouchableOpacity
      style={[styles.filterChip, selected && styles.filterChipSelected]}
      onPress={onPress}
    >
      <Text style={[styles.filterChipText, selected && styles.filterChipTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="camera" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cultural Library</Text>
      </View>

      <View style={styles.searchContainer}>
      <Feather name="camera" size={24} color="black" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search cultural heritage..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Feather name="camera" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filtersSection}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>Filters</Text>
            <TouchableOpacity onPress={clearAllFilters}>
              <Text style={styles.clearFilters}>Clear all</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.filterGroupTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
            {categories.map(category => (
              <FilterChip
                key={category.id}
                label={category.label}
                selected={selectedCategories.includes(category.label)}
                onPress={() => toggleCategory(category.label)}
              />
            ))}
          </ScrollView>

          <Text style={styles.filterGroupTitle}>Regions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
            {regions.map(region => (
              <FilterChip
                key={region.id}
                label={region.label}
                selected={selectedRegions.includes(region.label)}
                onPress={() => toggleRegion(region.label)}
              />
            ))}
          </ScrollView>
        </View>
      )}

      <FlatList
        data={filteredData}
        renderItem={renderCultureCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    marginLeft: 16,
  },
  filtersSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearFilters: {
    color: '#FF7F00',
  },
  filterGroupTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  chipsContainer: {
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  filterChipSelected: {
    backgroundColor: '#FF7F00',
  },
  filterChipText: {
    color: '#666',
  },
  filterChipTextSelected: {
    color: 'white',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});

export default Library;
