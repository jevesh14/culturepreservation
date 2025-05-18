
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const RelatedCategories: React.FC = () => {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-bold mb-4">Related Categories</h3>
      <ul className="space-y-2">
        <li>
          <Link to="/library/heritage-sites" className="text-cultural-saffron hover:underline flex items-center">
            <ChevronRight className="h-4 w-4 mr-1" />
            <span>Heritage Sites</span>
          </Link>
        </li>
        <li>
          <Link to="/library/architectural-beauties" className="text-cultural-saffron hover:underline flex items-center">
            <ChevronRight className="h-4 w-4 mr-1" />
            <span>Architectural Beauties</span>
          </Link>
        </li>
        <li>
          <Link to="/library/folk-life-traditions" className="text-cultural-saffron hover:underline flex items-center">
            <ChevronRight className="h-4 w-4 mr-1" />
            <span>Folk Life & Traditions</span>
          </Link>
        </li>
        <li>
          <Link to="/library/dance-forms" className="text-cultural-saffron hover:underline flex items-center">
            <ChevronRight className="h-4 w-4 mr-1" />
            <span>Dance Forms</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default RelatedCategories;
