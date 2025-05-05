
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, X, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CultureCard from '../components/CultureCard';
import FilterChips from '../components/FilterChips';
import ChatWithAI from '../components/ChatWithAI';

// Sample data for library content
const libraryData = [
  {
    id: 'kathak',
    title: 'Kathak: The Dance of Storytelling',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    category: 'Dance Forms',
    region: 'North India',
    era: 'Mughal Era',
    style: 'Classical',
    description: 'Kathak is one of the eight major forms of Indian classical dance that originated from the traveling bards of North India.'
  },
  {
    id: 'bharatanatyam',
    title: 'Bharatanatyam: The Ancient Temple Dance',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    category: 'Dance Forms',
    region: 'South India',
    era: 'Ancient',
    style: 'Classical',
    description: 'One of the oldest classical dance forms of India, Bharatanatyam originated in Tamil Nadu.'
  },
  {
    id: 'warli',
    title: 'Warli Art: Tribal Storytelling',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    category: 'Art Forms',
    region: 'Maharashtra',
    era: 'Ancient',
    style: 'Tribal',
    description: 'Warli painting is a tribal art form created by the tribal people from the North Sahyadri Range in Maharashtra.'
  },
  {
    id: 'madhubani',
    title: 'Madhubani: Folk Art of Bihar',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
    category: 'Art Forms',
    region: 'Bihar',
    era: 'Ancient',
    style: 'Folk',
    description: 'Madhubani painting is a style of folk painting practiced in the Mithila region of Bihar, characterized by geometric patterns.'
  },
  {
    id: 'diwali',
    title: 'Diwali: Festival of Lights',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
    category: 'Festivals',
    region: 'Pan India',
    style: 'Religious',
    description: 'Diwali, the festival of lights, is one of the most celebrated festivals in India symbolizing the victory of light over darkness.'
  },
  {
    id: 'vedas',
    title: 'The Vedas: Ancient Knowledge',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    category: 'Scriptures',
    region: 'Ancient India',
    era: 'Vedic Period',
    style: 'Religious',
    description: 'The Vedas are a large body of religious texts originating in ancient India, composed in Vedic Sanskrit.'
  },
  {
    id: 'khajuraho',
    title: 'Khajuraho Temples: Architectural Marvels',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
    category: 'Sculptures',
    region: 'Madhya Pradesh',
    era: 'Medieval',
    style: 'Temple',
    description: 'The Khajuraho temples are known for their nagara-style architectural symbolism and erotic sculptures.'
  },
  {
    id: 'gita',
    title: 'Bhagavad Gita: The Song of God',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    category: 'Scriptures',
    region: 'Ancient India',
    era: 'Epic',
    style: 'Religious',
    description: 'The Bhagavad Gita is a 700-verse Hindu scripture that is part of the Indian epic Mahabharata.'
  }
];

// Filter options
const categories = [
  { id: 'scriptures', label: 'Scriptures' },
  { id: 'dance-forms', label: 'Dance Forms' },
  { id: 'art-forms', label: 'Art Forms' },
  { id: 'sculptures', label: 'Sculptures' },
  { id: 'festivals', label: 'Festivals' },
  { id: 'music', label: 'Music' },
  { id: 'costumes', label: 'Costumes & Textiles' },
  { id: 'folktales', label: 'Folktales' }
];

const regions = [
  { id: 'north-india', label: 'North India' },
  { id: 'south-india', label: 'South India' },
  { id: 'east-india', label: 'East India' },
  { id: 'west-india', label: 'West India' },
  { id: 'northeast-india', label: 'Northeast India' },
  { id: 'pan-india', label: 'Pan India' },
  { id: 'maharashtra', label: 'Maharashtra' },
  { id: 'bihar', label: 'Bihar' },
  { id: 'madhya-pradesh', label: 'Madhya Pradesh' }
];

const eras = [
  { id: 'ancient', label: 'Ancient' },
  { id: 'vedic', label: 'Vedic' },
  { id: 'epic', label: 'Epic Period' },
  { id: 'classical', label: 'Classical' },
  { id: 'medieval', label: 'Medieval' },
  { id: 'mughal', label: 'Mughal Era' },
  { id: 'colonial', label: 'Colonial' },
  { id: 'modern', label: 'Modern' }
];

const styles = [
  { id: 'classical', label: 'Classical' },
  { id: 'folk', label: 'Folk' },
  { id: 'tribal', label: 'Tribal' },
  { id: 'religious', label: 'Religious' },
  { id: 'fusion', label: 'Fusion' },
  { id: 'temple', label: 'Temple' }
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
