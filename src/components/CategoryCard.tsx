
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  icon: ReactNode;
  color: string;
  link: string;
  description: string;
}

const CategoryCard = ({ title, icon, color, link, description }: CategoryCardProps) => {
  return (
    <Link 
      to={link}
      className="relative group overflow-hidden rounded-2xl shadow-md bg-white card-hover"
    >
      <div className={`absolute inset-0 opacity-10 ${color}`} />
      <div className="p-6">
        <div className="mb-4">
          <div className={`inline-flex items-center justify-center h-12 w-12 rounded-lg ${color} text-white`}>
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className={`absolute bottom-0 left-0 h-1 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ${color.replace('bg-', 'bg-')}`}></div>
      </div>
    </Link>
  );
};

export default CategoryCard;
