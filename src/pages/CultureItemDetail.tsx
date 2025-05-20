import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatWithAI from '../components/ChatWithAI';
import HeroSection from '../components/culture-item/HeroSection';
import Breadcrumbs from '../components/culture-item/Breadcrumbs';
import ItemDetailTabs from '../components/culture-item/ItemDetailTabs';
import RelatedCategories from '../components/culture-item/RelatedCategories';
import LoadingState from '../components/culture-item/LoadingState';
import ItemNotFound from '../components/culture-item/ItemNotFound';
import { toast } from '@/hooks/use-toast';
import { libraryData } from '../pages/Library';
import { getCategoryData } from '../pages/CategoryDetail';

const CultureItemDetail = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [item, setItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!itemId) {
      setError(true);
      setLoading(false);
      toast({
        title: 'Error',
        description: 'No item ID was provided',
        variant: 'destructive'
      });
      return;
    }

    setTimeout(() => {
      let matchedItem = libraryData.find(item => item.id === itemId);

      if (!matchedItem) {
        const categoryList = ['scriptures', 'dance-forms', 'festivals', 'art-forms'];
        for (let i = 0; i < categoryList.length; i++) {
          const categoryData: any = getCategoryData(categoryList[i]);
          if (categoryData && Array.isArray(categoryData.items)) {
            const found = categoryData.items.find((itm: any) => itm.id === itemId);
            if (found) {
              matchedItem = found;
              break;
            }
          }
        }
      }

      if (matchedItem) {
        setItem(matchedItem);
        toast({
          title: 'Loaded',
          description: `Loaded item: ${matchedItem.title}`
        });
      } else {
        setError(true);
        toast({
          title: 'Item Not Found',
          description: `No item found for ID: ${itemId}`,
          variant: 'destructive'
        });
      }
      setLoading(false);
    }, 300);
  }, [itemId]);

  if (loading) return <LoadingState />;
  if (error || !item) return <ItemNotFound />;

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