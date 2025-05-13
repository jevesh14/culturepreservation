
import { useState } from 'react';
import { X } from 'lucide-react';

interface AddCultureItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: {
    title: string;
    image: string;
    region?: string;
    era?: string;
    description: string;
  }) => void;
  category: string;
}

// Sample image placeholders
const sampleImages = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
  'https://images.unsplash.com/photo-1500673922987-e212871fec22',
  'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
  'https://images.unsplash.com/photo-1466442929976-97f336a657be',
  'https://images.unsplash.com/photo-1472396961693-142e6e269027'
];

const AddCultureItemModal = ({ isOpen, onClose, onAdd, category }: AddCultureItemModalProps) => {
  const [title, setTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState(sampleImages[0]);
  const [region, setRegion] = useState('');
  const [era, setEra] = useState('');
  const [description, setDescription] = useState('');
  
  if (!isOpen) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    
    onAdd({
      title,
      image: selectedImage,
      region: region || undefined,
      era: era || undefined,
      description
    });
    
    // Reset form
    setTitle('');
    setSelectedImage(sampleImages[0]);
    setRegion('');
    setEra('');
    setDescription('');
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
          <h2 className="text-xl font-bold">Add New {category} Item</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cultural-saffron focus:border-cultural-saffron"
                placeholder="Enter title"
                required
              />
            </div>
            
            {/* Image Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Image <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {sampleImages.map((image, index) => (
                  <div 
                    key={index} 
                    className={`
                      relative aspect-square cursor-pointer overflow-hidden rounded-md border-2 
                      ${selectedImage === image ? 'border-cultural-saffron' : 'border-transparent'}
                    `}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img 
                      src={image}
                      alt={`Option ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Region */}
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <input
                type="text"
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cultural-saffron focus:border-cultural-saffron"
                placeholder="E.g., North India, Tamil Nadu"
              />
            </div>
            
            {/* Era */}
            <div>
              <label htmlFor="era" className="block text-sm font-medium text-gray-700 mb-1">
                Era
              </label>
              <input
                type="text"
                id="era"
                value={era}
                onChange={(e) => setEra(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cultural-saffron focus:border-cultural-saffron"
                placeholder="E.g., Vedic Period, Medieval"
              />
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cultural-saffron focus:border-cultural-saffron"
                placeholder="Enter description"
                required
              />
            </div>
          </div>
          
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cultural-saffron text-white rounded-md hover:bg-cultural-saffron/90"
              disabled={!title || !description}
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCultureItemModal;
