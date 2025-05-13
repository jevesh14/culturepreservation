
import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, MapPin, Tag, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatWithAI from '../components/ChatWithAI';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CultureItem {
  id: string;
  title: string;
  image: string;
  category: string;
  region?: string;
  era?: string;
  description: string;
  historicalBackground?: string;
  culturalSignificance?: string;
  modernRelevance?: string;
}

// Placeholder function to get item data - will be replaced with real data fetching
const getCultureItemData = (itemId: string, category: string): CultureItem | null => {
  // This is just a placeholder - in a real app, you would fetch this data from an API
  // or a database. For now, we're returning null to show the not found message.
  return null;
};

const CultureItemDetail = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  
  const [item, setItem] = useState<CultureItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (itemId) {
      // Simulating API call
      setTimeout(() => {
        const data = getCultureItemData(itemId, category);
        setItem(data);
        setLoading(false);
      }, 500);
    }
  }, [itemId, category]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-48 h-6 bg-gray-200 rounded-md mb-4"></div>
            <div className="w-72 h-4 bg-gray-200 rounded-md"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Item Not Found</h1>
            <p className="text-gray-600 mb-6">The item you're looking for doesn't exist or has been removed.</p>
            <Link to={`/library/${category}`} className="text-cultural-saffron hover:underline">
              Return to {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
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
              <Link to={`/library/${category}`} className="inline-flex items-center text-white/80 hover:text-white mb-4">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Back to {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{item.title}</h1>
              <p className="text-xl text-white/90">{item.description}</p>
            </div>
          </div>
        </section>
        
        {/* Breadcrumbs */}
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
                    <Link to={`/library/${category}`} className="ml-1 text-sm text-gray-500 hover:text-cultural-saffron">
                      {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="ml-1 text-sm text-cultural-saffron font-medium">
                      {item.title}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </section>
        
        {/* Main content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main content column */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full justify-start border-b mb-6 pb-0 bg-transparent space-x-4">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-cultural-saffron rounded-none">
                      Overview
                    </TabsTrigger>
                    {item.historicalBackground && (
                      <TabsTrigger value="history" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-cultural-saffron rounded-none">
                        Historical Background
                      </TabsTrigger>
                    )}
                    {item.culturalSignificance && (
                      <TabsTrigger value="significance" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-cultural-saffron rounded-none">
                        Cultural Significance
                      </TabsTrigger>
                    )}
                    {item.modernRelevance && (
                      <TabsTrigger value="relevance" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-cultural-saffron rounded-none">
                        Modern Relevance
                      </TabsTrigger>
                    )}
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-0">
                    <div className="prose prose-lg max-w-none">
                      <p className="text-xl lead font-medium text-gray-700">{item.description}</p>
                      
                      <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mt-6">
                        <h3 className="text-lg font-semibold mb-3">About {item.title}</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <Tag className="h-5 w-5 text-cultural-saffron mr-3 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">
                              Category: <span className="font-medium">{item.category}</span>
                            </span>
                          </li>
                          {item.region && (
                            <li className="flex items-start">
                              <MapPin className="h-5 w-5 text-cultural-saffron mr-3 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">
                                Region: <span className="font-medium">{item.region}</span>
                              </span>
                            </li>
                          )}
                          {item.era && (
                            <li className="flex items-start">
                              <Clock className="h-5 w-5 text-cultural-saffron mr-3 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">
                                Era: <span className="font-medium">{item.era}</span>
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {item.historicalBackground && (
                    <TabsContent value="history" className="mt-0">
                      <div className="prose prose-lg max-w-none">
                        <h2>Historical Background</h2>
                        <p>{item.historicalBackground}</p>
                      </div>
                    </TabsContent>
                  )}
                  
                  {item.culturalSignificance && (
                    <TabsContent value="significance" className="mt-0">
                      <div className="prose prose-lg max-w-none">
                        <h2>Cultural Significance</h2>
                        <p>{item.culturalSignificance}</p>
                      </div>
                    </TabsContent>
                  )}
                  
                  {item.modernRelevance && (
                    <TabsContent value="relevance" className="mt-0">
                      <div className="prose prose-lg max-w-none">
                        <h2>Modern Relevance</h2>
                        <p>{item.modernRelevance}</p>
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </div>
              
              {/* Sidebar */}
              <div>
                <div className="sticky top-6">
                  <div className="bg-cultural-saffron/5 border border-cultural-saffron/20 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-bold mb-4">Explore More</h3>
                    <p className="text-gray-600 mb-4">Discover other items in the {item.category} category to deepen your understanding of Indian culture.</p>
                    <Link 
                      to={`/library/${category}`}
                      className="inline-flex items-center text-cultural-saffron hover:underline"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      View all {item.category}
                    </Link>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">Related Categories</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link to="/library/scriptures" className="text-cultural-saffron hover:underline flex items-center">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          <span>Scriptures</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/library/art-forms" className="text-cultural-saffron hover:underline flex items-center">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          <span>Art Forms</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/library/dance-forms" className="text-cultural-saffron hover:underline flex items-center">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          <span>Dance Forms</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/library/festivals" className="text-cultural-saffron hover:underline flex items-center">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          <span>Festivals</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
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
