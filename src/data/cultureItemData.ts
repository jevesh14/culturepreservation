import { ImageSourcePropType } from 'react-native';

export interface CultureItem {
  id: string;
  title: string;
  image: string;
  thumbnailImage?: string;
  category: string;
  region?: string;
  era?: string;
  style?: string;
  description: string;
  historicalBackground?: string;
  culturalSignificance?: string;
  modernRelevance?: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  mediaContent?: {
    images?: string[];
    audio?: string;
    video?: string;
  };
  tags: string[];
  lastUpdated: string;
  offlineAvailable?: boolean;
  viewCount?: number;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: 'heritage-sites',
    name: 'Heritage Sites',
    icon: 'landmark',
    color: '#FF7F00',
    description: 'Historical monuments and architectural marvels'
  },
  {
    id: 'folk-traditions',
    name: 'Folk Life & Traditions',
    icon: 'users',
    color: '#2563EB',
    description: 'Living traditions and community practices'
  },
  {
    id: 'dance-forms',
    name: 'Dance Forms',
    icon: 'music',
    color: '#DC2626',
    description: 'Traditional and classical dance styles'
  },
  {
    id: 'scriptures',
    name: 'Scriptures',
    icon: 'book-open',
    color: '#059669',
    description: 'Ancient texts and manuscripts'
  },
  {
    id: 'cuisine',
    name: 'Cuisine',
    icon: 'coffee',
    color: '#D97706',
    description: 'Traditional food and culinary arts'
  }
];

// Sample data with one complete item
export const sampleData: CultureItem[] = [
  {
    id: 'jaisalmer-fort',
    title: 'Jaisalmer Fort: The Golden Citadel',
    image: 'https://images.unsplash.com/photo-1477587458883-47160a8ef1d3',
    thumbnailImage: 'https://images.unsplash.com/photo-1477587458883-47160a8ef1d3?w=400&q=80',
    category: 'Heritage Sites',
    region: 'Jaisalmer, Rajasthan',
    era: '12th Century',
    style: 'Rajput',
    description: "One of the world's few living forts, with honey-colored sandstone walls that house temples, palaces, and havelis.",
    historicalBackground: "Founded in 1156 CE by Rawal Jaisal, Jaisalmer Fort rises from the golden sands of the Thar Desert like a mirage. Built from yellow sandstone that glows golden in the sunset, it became a crucial trading post on ancient caravan routes to Central Asia and the Middle East.",
    culturalSignificance: "Unlike most forts, Jaisalmer remains a living heritage site with approximately 3,000 people still residing within its walls. Its narrow streets house ancient Jain temples with intricate carvings, royal palaces, and merchants' mansions (havelis) that reflect the prosperity of the Silk Road trade.",
    modernRelevance: "As tourism has grown, the fort faces conservation challenges from modern infrastructure and water drainage issues. Yet it continues to be a vibrant cultural center where traditional crafts, music, and cuisine thrive alongside contemporary life.",
    location: {
      latitude: 26.9157,
      longitude: 70.9083,
      address: 'Fort Rd, Jaisalmer, Rajasthan 345001'
    },
    mediaContent: {
      images: [
        'https://images.unsplash.com/photo-1477587458883-47160a8ef1d3',
        'https://images.unsplash.com/photo-1590080748533-30e7eecb3887',
        'https://images.unsplash.com/photo-1584793632154-c10a5a332596'
      ],
      video: 'https://example.com/jaisalmer-fort-tour.mp4'
    },
    tags: ['fort', 'architecture', 'heritage', 'rajasthan', 'unesco'],
    lastUpdated: '2024-03-28',
    offlineAvailable: true,
    isFeatured: true,
    viewCount: 1250
  }
];

// Function to get category data
export const getCategoryData = (categoryId: string): Category | null => {
  return categories.find(category => category.id === categoryId) || null;
};

// Function to get item data based on itemId with better error handling
export const getCultureItemData = (itemId: string): CultureItem | null => {
  return sampleData.find(item => item.id === itemId) || null;
};

// Function to get featured items
export const getFeaturedItems = (): CultureItem[] => {
  return sampleData.filter(item => item.isFeatured).slice(0, 5);
};

// Function to get items by category
export const getItemsByCategory = (categoryId: string): CultureItem[] => {
  const category = getCategoryData(categoryId);
  if (!category) return [];
  
  return sampleData.filter(item => 
    item.category.toLowerCase() === category.name.toLowerCase()
  );
};

// Function to search items
export const searchItems = (query: string): CultureItem[] => {
  const searchTerm = query.toLowerCase();
  return sampleData.filter(item => 
    item.title.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

// Function to get offline available items
export const getOfflineItems = (): CultureItem[] => {
  return sampleData.filter(item => item.offlineAvailable);
};
