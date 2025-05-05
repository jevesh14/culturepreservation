
import { X } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterChipsProps {
  title: string;
  options: FilterOption[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
}

const FilterChips = ({ title, options, selectedOptions, onChange }: FilterChipsProps) => {
  const toggleOption = (id: string) => {
    if (selectedOptions.includes(id)) {
      onChange(selectedOptions.filter(item => item !== id));
    } else {
      onChange([...selectedOptions, id]);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-2 text-gray-700">{title}:</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selectedOptions.includes(option.id);
          return (
            <button
              key={option.id}
              onClick={() => toggleOption(option.id)}
              className={`cultural-filter-chip ${
                isSelected 
                  ? 'bg-cultural-saffron/10 border-cultural-saffron text-cultural-maroon' 
                  : 'bg-white border-gray-200 text-gray-700 hover:border-cultural-saffron/50'
              }`}
            >
              <span className="flex items-center">
                {option.label}
                {isSelected && <X className="ml-1 h-3 w-3" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterChips;
