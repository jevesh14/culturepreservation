
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { CultureItem } from '../../data/cultureItemData';

interface BreadcrumbsProps {
  item: CultureItem;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ item }) => {
  // Get category slug for breadcrumb navigation
  const categorySlug = item.category.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <section className="bg-gray-50 border-b">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
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
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <Link to={`/library/${categorySlug}`} className="ml-1 text-sm text-gray-500 hover:text-cultural-saffron">
                  {item.category}
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="ml-1 text-sm text-cultural-saffron font-medium">
                  {item.title.split(':')[0]}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default Breadcrumbs;
