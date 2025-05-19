
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Tag, MapPin, Clock } from 'lucide-react';
import { CultureItem } from '../../data/cultureItemData';
import { Button } from '../ui/button';

interface HeroSectionProps {
  item: CultureItem;
}

const HeroSection: React.FC<HeroSectionProps> = ({ item }) => {
  // Fallback image if item.image is invalid
  const backgroundImage = item.image || 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb';

  return (
    <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700" 
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          transform: 'translateZ(0) scale(1.02)',
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30 z-10"></div>
      
      <div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-20">
        <div className="text-white max-w-4xl">
          <Button 
            asChild 
            variant="outline" 
            className="mb-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white"
          >
            <Link to="/library" className="inline-flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Back to Library</span>
            </Link>
          </Button>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.category && (
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-cultural-saffron/90 text-white">
                <Tag className="h-3 w-3 mr-1" />
                {item.category}
              </div>
            )}
            {item.region && (
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white">
                <MapPin className="h-3 w-3 mr-1" />
                {item.region}
              </div>
            )}
            {item.era && (
              <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white">
                <Clock className="h-3 w-3 mr-1" />
                {item.era}
              </div>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-md">{item.title}</h1>
          <p className="text-xl text-white/90 max-w-3xl drop-shadow-sm">{item.description}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
