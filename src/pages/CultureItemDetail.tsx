
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatWithAI from '../components/ChatWithAI';
import { CultureItem, getCultureItemData } from '../data/cultureItemData';
import HeroSection from '../components/culture-item/HeroSection';
import Breadcrumbs from '../components/culture-item/Breadcrumbs';
import ItemDetailTabs from '../components/culture-item/ItemDetailTabs';
import RelatedCategories from '../components/culture-item/RelatedCategories';
import LoadingState from '../components/culture-item/LoadingState';
import ItemNotFound from '../components/culture-item/ItemNotFound';
import { toast } from '@/hooks/use-toast';

const CultureItemDetail = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [item, setItem] = useState<CultureItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!itemId) {
      setError(true);
      setLoading(false);
      console.error('No itemId provided in URL parameters');
      toast({
        title: "Error",
        description: "No item ID was provided",
        variant: "destructive"
      });
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(false);
      
      try {
        // Small delay to simulate network request
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Log the item ID we're fetching
        console.log(`Fetching data for ID: ${itemId}`);
        
        // Get item from the data source
        let data = getCultureItemData(itemId);
        
        // Check if we found any data
        if (data) {
          console.log(`Found data for ID: ${itemId}`, data);
          
          // Ensure all required fields exist with defaults if missing
          data = {
            ...data,
            region: data.region || 'Various Regions',
            era: data.era || 'Traditional',
            historicalBackground: data.historicalBackground || '',
            culturalSignificance: data.culturalSignificance || '',
            modernRelevance: data.modernRelevance || ''
          };
          
          setItem(data);
          
          // Show success toast
          toast({
            title: "Item Loaded",
            description: `Successfully loaded: ${data.title}`,
            variant: "default"
          });
        } else {
          setError(true);
          console.error(`No data found for ID: ${itemId}`);
          
          // Additional logging to help debug
          const availableIds = [
            'amber-fort', 'jaisalmer-fort', 'mehrangarh-fort', 'hawa-mahal', 
            'jal-mahal', 'patwon-ki-haveli', 'bishnoi', 'pushkar-fair',
            'rajasthani-puppet', 'phad-painting', 'ghoomar', 'vedas-upanishads',
            'umaid-bhawan'
          ];
          
          console.log('Available IDs:', availableIds);
          console.log('Requested ID exists in available IDs:', availableIds.includes(itemId));
          
          toast({
            title: "Item Not Found",
            description: `We couldn't find an item with ID: ${itemId}`,
            variant: "destructive"
          });
        }
      } catch (err) {
        console.error('Error fetching culture item:', err);
        setError(true);
        toast({
          title: "Error",
          description: "Failed to load the requested item",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemId, navigate]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !item) {
    return <ItemNotFound />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection item={item} />
        <Breadcrumbs item={item} />
        
        {/* Main content */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content column */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                <ItemDetailTabs item={item} />
              </div>
              
              {/* Sidebar */}
              <div>
                <div className="sticky top-6">
                  <RelatedCategories />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <ChatWithAI />
    </div>
  );
};

export default CultureItemDetail;
