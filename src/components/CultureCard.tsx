
import { ReactNode } from 'react';
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

  // Get colors based on category for consistent styling with CategoryCard
  const getCategoryColor = (): string => {
    const colorMap: Record<string, string> = {
      'Festivals': 'bg-cultural-saffron',
      'Art Forms': 'bg-cultural-lotus',
      'Dance': 'bg-cultural-peacock',
      'Music': 'bg-cultural-blue',
      'Architecture': 'bg-cultural-spice',
      'Scriptures': 'bg-cultural-green',
      'Cuisine': 'bg-cultural-mehendi',
      'Clothing': 'bg-cultural-maroon',
      'Philosophy': 'bg-cultural-gold'
    };
    
    return colorMap[category] || 'bg-cultural-saffron';
  };

  // Always use the direct path to the culture item detail with the ID
  const linkPath = `/culture/${id}`;
  
  // Check if we have detailed content to show
  const hasDetailedContent = historicalBackground || culturalSignificance || modernRelevance;

  return (
    <Link 
      to={linkPath}
      className="relative group overflow-hidden rounded-2xl shadow-md bg-white card-hover"
    >
      <div className={`absolute inset-0 opacity-10 ${getCategoryColor()}`} />
      <div className="p-0">
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
            <div className={`px-2 py-1 text-white ${getCategoryColor()} rounded-md text-xs font-medium`}>
              {category}
            </div>
            {region && (
              <div className="px-2 py-1 bg-white/80 backdrop-blur-sm rounded-md text-xs font-medium">
                {region}
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-cultural-saffron transition-colors">{title}</h3>
          {era && (
            <p className="text-xs text-gray-500 mb-2">
              Era: {era}
            </p>
          )}
          <p className="text-gray-600 text-sm">{description}</p>
          
          {hasDetailedContent && (
            <div className={`absolute bottom-0 left-0 h-1 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ${getCategoryColor()}`}></div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CultureCard;
