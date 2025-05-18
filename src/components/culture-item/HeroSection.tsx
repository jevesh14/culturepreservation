
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CultureItem } from '../../data/cultureItemData';

interface HeroSectionProps {
  item: CultureItem;
}

const HeroSection: React.FC<HeroSectionProps> = ({ item }) => {
  return (
    <section className="relative h-[40vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: `url(${item.image})`,
          transform: 'translateZ(0)',
        }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
      <div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-20">
        <div className="text-white max-w-3xl">
          <Link to="/library" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Library</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{item.title}</h1>
          <p className="text-xl text-white/90">{item.description}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
