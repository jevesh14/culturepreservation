import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, X, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CultureCard from '../components/CultureCard';
import FilterChips from '../components/FilterChips';
import ChatWithAI from '../components/ChatWithAI';

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

const styles = [
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

const Library = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedEras, setSelectedEras] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter the library data based on selections
  const filteredData = libraryData.filter(item => {
    // Search query filter
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.some(cat => 
      item.category.toLowerCase().replace(/\s+/g, '-') === cat)) {
      return false;
    }
    
    // Region filter
    if (selectedRegions.length > 0 && !selectedRegions.some(region => 
      (item.region && item.region.toLowerCase().replace(/\s+/g, '-') === region))) {
      return false;
    }
    
    // Era filter
    if (selectedEras.length > 0 && !selectedEras.some(era => 
      (item.era && item.era.toLowerCase().replace(/\s+/g, '-') === era))) {
      return false;
    }
    
    // Style filter
    if (selectedStyles.length > 0 && !selectedStyles.some(style => 
      (item.style && item.style.toLowerCase() === style))) {
      return false;
    }
    
    return true;
  });

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedRegions([]);
    setSelectedEras([]);
    setSelectedStyles([]);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedRegions.length > 0 || 
                            selectedEras.length > 0 || selectedStyles.length > 0 || searchQuery;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Library Header */}
        <section className="bg-gradient-to-r from-cultural-silk to-white py-10 border-b">
          <div className="container mx-auto px-4">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-cultural-saffron mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to home</span>
            </Link>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Cultural Library</h1>
                <p className="text-gray-600">Discover and explore the richness of Indian cultural heritage</p>
              </div>
              
              {/* Search and filter */}
              <div className="mt-4 md:mt-0 w-full md:w-auto">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="relative w-full md:w-64">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="h-4 w-4 text-gray-500" />
                    </div>
                    <input 
                      type="text" 
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-cultural-saffron focus:ring-2 focus:ring-cultural-saffron/20 outline-none"
                      placeholder="Search library..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <button 
                    className="flex items-center space-x-1 px-4 py-2 bg-white border border-gray-300 rounded-lg md:ml-2 hover:bg-gray-50"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Filters Section */}
        {showFilters && (
          <section className="py-6 bg-gray-50 border-b animate-fade-in">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                <h2 className="text-xl font-bold">Filter Results</h2>
                {hasActiveFilters && (
                  <button 
                    className="text-cultural-saffron hover:underline text-sm flex items-center mt-2 md:mt-0"
                    onClick={clearAllFilters}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear all filters
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FilterChips 
                  title="Categories" 
                  options={categories} 
                  selectedOptions={selectedCategories}
                  onChange={setSelectedCategories}
                />
                
                <FilterChips 
                  title="Regions" 
                  options={regions} 
                  selectedOptions={selectedRegions}
                  onChange={setSelectedRegions}
                />
                
                <FilterChips 
                  title="Era" 
                  options={eras} 
                  selectedOptions={selectedEras}
                  onChange={setSelectedEras}
                />
                
                <FilterChips 
                  title="Style" 
                  options={styles} 
                  selectedOptions={selectedStyles}
                  onChange={setSelectedStyles}
                />
              </div>
            </div>
          </section>
        )}
        
        {/* Content Results */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            {hasActiveFilters && (
              <div className="mb-6">
                <p className="text-sm text-gray-600">
                  Showing {filteredData.length} results
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>
            )}
            
            {filteredData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredData.map((item) => (
                  <CultureCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    category={item.category}
                    region={item.region}
                    era={item.era}
                    description={item.description}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mx-auto w-16 h-16 mb-4 text-gray-300">
                  <Search className="w-16 h-16" />
                </div>
                <h3 className="text-xl font-bold mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any cultural content matching your criteria.
                </p>
                <button 
                  onClick={clearAllFilters}
                  className="text-cultural-saffron hover:underline"
                >
                  Clear all filters to see all content
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
      <ChatWithAI />
    </div>
  );
};

export default Library;
