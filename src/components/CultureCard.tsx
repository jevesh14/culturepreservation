
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from './ui/card';

interface CultureCardProps {
  id: string;
  title: string;
  image: string;
  category: string;
  region?: string;
  era?: string;
  description: string;
  historicalBackground?: string;
  culturalSignificance?: string;
  modernRelevance?: string;
}

const CultureCard = ({ 
  id, 
  title, 
  image, 
  category, 
  region, 
  era, 
  description,
  historicalBackground,
  culturalSignificance,
  modernRelevance
}: CultureCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Get colors based on category for consistent styling with CategoryCard
  const getCategoryColor = (): string => {
    const colorMap: Record<string, string> = {
      'Festivals': 'bg-cultural-saffron',
      'Art Forms': 'bg-cultural-lotus',
      'Dance Forms': 'bg-cultural-peacock',
      'Dance': 'bg-cultural-peacock',
      'Music': 'bg-cultural-blue',
      'Architecture': 'bg-cultural-spice',
      'Architectural Beauties': 'bg-cultural-spice',
      'Scriptures': 'bg-cultural-green',
      'Cuisine': 'bg-cultural-mehendi',
      'Clothing': 'bg-cultural-maroon',
      'Philosophy': 'bg-cultural-gold',
      'Heritage Sites': 'bg-cultural-maroon',
      'Folk Life & Traditions': 'bg-cultural-blue'
    };
    
    return colorMap[category] || 'bg-cultural-saffron';
  };

  // Ensure we have a valid ID for the link
  const safeId = id?.trim() || '';
  
  // Only create a link if we have a valid ID
  if (!safeId) {
    console.warn(`Culture card with title "${title}" has no valid ID`);
  }
  
  const linkPath = safeId ? `/culture/${safeId}` : '/library';
  
  // Check if we have detailed content to show
  const hasDetailedContent = historicalBackground || culturalSignificance || modernRelevance;
  
  const categoryColorClass = getCategoryColor();
  const fallbackImage = 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb';

  return (
    <Link 
      to={linkPath}
      className="block group"
    >
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-md relative bg-white">
        <div className={`absolute inset-0 opacity-5 ${categoryColorClass}`} />
        
        <div className="relative h-48 overflow-hidden">
          {imageLoaded ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => {
                console.warn(`Image failed to load for "${title}". Using fallback.`);
                setImageLoaded(false);
                (e.target as HTMLImageElement).src = fallbackImage;
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <img 
                src={fallbackImage}
                alt={title} 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Favorite button */}
          <button 
            onClick={toggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center backdrop-blur-sm shadow-sm hover:bg-white transition-colors z-10"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-cultural-lotus text-cultural-lotus' : 'text-gray-600'}`} />
          </button>
          
          {/* Category and region tags */}
          <div className="absolute bottom-3 left-3 flex gap-1.5 z-10">
            {category && (
              <div className={`px-2 py-1 text-white ${categoryColorClass} rounded-md text-xs font-medium`}>
                {category}
              </div>
            )}
            {region && (
              <div className="px-2 py-1 bg-white/80 backdrop-blur-sm rounded-md text-xs font-medium text-gray-700">
                {region}
              </div>
            )}
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="text-xl font-bold mb-2 group-hover:text-cultural-saffron transition-colors line-clamp-2">{title}</h3>
          
          {era && (
            <p className="text-xs text-gray-500 mb-2">
              <span className="font-medium">Era:</span> {era}
            </p>
          )}
          
          <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
          
          {hasDetailedContent && (
            <div className={`absolute bottom-0 left-0 h-1 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ${categoryColorClass}`}></div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default CultureCard;
