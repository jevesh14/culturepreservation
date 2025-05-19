
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

const CultureItemDetail = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [item, setItem] = useState<CultureItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!itemId) {
      setError(true);
      setLoading(false);
      return;
    }

    // Simulating API call with timeout
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      
      try {
        // Small delay to simulate network request
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const data = getCultureItemData(itemId);
        console.log(`Fetching data for ID: ${itemId}`, data);
        
        if (data) {
          setItem(data);
        } else {
          setError(true);
          console.error(`No data found for ID: ${itemId}`);
        }
      } catch (err) {
        console.error('Error fetching culture item:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

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
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main content column */}
              <div className="lg:col-span-2">
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
