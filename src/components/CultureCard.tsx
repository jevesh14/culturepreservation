
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface CultureCardProps {
  id: string;
  title: string;
  image: string;
  category: string;
  region: string;
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
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Generate category slug for URL
  const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
  
  // Create a more specific link if we have detailed content
  const hasDetailedContent = historicalBackground || culturalSignificance || modernRelevance;
  const linkPath = hasDetailedContent ? `/culture/${id}?category=${categorySlug}` : `/culture/${id}`;

  return (
    <Link to={linkPath} className="group">
      <div className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-cultural-hover transition-all duration-300 group-hover:-translate-y-1">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <button 
            onClick={toggleFavorite}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center backdrop-blur-sm shadow-sm hover:bg-white transition-colors z-10"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-cultural-lotus text-cultural-lotus' : 'text-gray-600'}`} />
          </button>
          
          <div className="absolute bottom-3 left-3 flex gap-1.5 z-10">
            <div className="px-2 py-1 bg-white/80 backdrop-blur-sm rounded-md text-xs font-medium">
              {category}
            </div>
            {region && (
              <div className="px-2 py-1 bg-white/80 backdrop-blur-sm rounded-md text-xs font-medium">
                {region}
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 group-hover:text-cultural-saffron transition-colors">
            {title}
          </h3>
          {era && (
            <p className="text-xs text-gray-500 mb-2">
              Era: {era}
            </p>
          )}
          <p className="text-sm text-gray-600 line-clamp-2">
            {description}
          </p>
          {hasDetailedContent && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-cultural-saffron font-medium">View detailed information</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CultureCard;
