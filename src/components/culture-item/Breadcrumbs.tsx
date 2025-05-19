
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { CultureItem } from '../../data/cultureItemData';

interface BreadcrumbsProps {
  item: CultureItem;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ item }) => {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex overflow-x-auto hide-scrollbar" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3 whitespace-nowrap">
            <li className="inline-flex items-center">
              <Link to="/" className="text-sm text-gray-500 hover:text-cultural-saffron inline-flex items-center">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <Link to="/library" className="ml-1 text-sm text-gray-500 hover:text-cultural-saffron">
                  Library
                </Link>
              </div>
            </li>
            {item.category && (
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <Link 
                    to={`/library/${item.category.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="ml-1 text-sm text-gray-500 hover:text-cultural-saffron"
                  >
                    {item.category}
                  </Link>
                </div>
              </li>
            )}
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="ml-1 text-sm font-medium text-cultural-saffron">
                  {item.title?.split(':')?.[0] || item.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      
      <style>
        {`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        `}
      </style>
    </section>
  );
};

export default Breadcrumbs;
