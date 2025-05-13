// ✅ Final full CategoryDetail.tsx page with examples for 'scriptures'
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, BookOpen, Tag, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatWithAI from '../components/ChatWithAI';
import CultureCard from '../components/CultureCard';

interface CategoryData {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  coverImage: string;
  historicalBackground: string;
  culturalSignificance: string;
  modernRelevance: string;
  items: Array<{
    id: string;
    title: string;
    image: string;
    category: string;
    region?: string;
    era?: string;
    description: string;
  }>;
}

// 📌 Custom data for categories, with populated examples for 'scriptures'
const getCategoryData = (categoryId: string): CategoryData => {
  return {
    id: categoryId,
    title: categoryId === 'scriptures' ? 'Scriptures' :
           categoryId === 'dance-forms' ? 'Dance Forms' :
           categoryId === 'art-forms' ? 'Art Forms' :
           categoryId === 'festivals' ? 'Festivals' : 'Unknown Category',
    description: 'Discover the rich heritage and tradition of Indian culture',
    longDescription: 'This category showcases the diverse and profound aspects of Indian cultural heritage, reflecting centuries of wisdom, creativity, and spiritual traditions.',
    coverImage: 'https://images.unsplash.com/photo-1470290378698-263af93ea456',
    historicalBackground: 'Dating back thousands of years, these cultural expressions have evolved through various dynasties and historical periods, each adding unique elements to the tradition.',
    culturalSignificance: 'These cultural elements are not merely art forms but integral parts of social identity, religious practices, and community cohesion across diverse regions of India.',
    modernRelevance: 'While deeply rooted in tradition, these cultural expressions continue to evolve and remain relevant in contemporary society, influencing art, design, spirituality, and personal identity.',
    items: categoryId === 'scriptures' ? [
      {
        id: 'vedas-upanishads',
        title: 'Vedas & Upanishads',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Ancient_Vedic_Texts.jpg/1024px-Ancient_Vedic_Texts.jpg',
        category: 'Scriptures',
        region: 'Pan India',
        era: 'Vedic Period',
        description: 'Preserved orally by priest families in Rajasthan, these sacred texts explore rituals, cosmos, and consciousness.'
      },
      {
        id: 'bhagavad-gita',
        title: 'Bhagavad Gita',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Krishna_Arjuna_in_mah_bharata.jpg',
        category: 'Scriptures',
        region: 'India',
        era: 'Epic Period',
        description: 'Philosophical dialogue between Krishna and Arjuna, recited during festivals and life transitions in Rajasthan.'
      },
      {
        id: 'ramcharitmanas',
        title: 'Ramcharitmanas',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Tulsidas_Ramayana.jpg',
        category: 'Scriptures',
        region: 'North India',
        era: 'Medieval',
        description: 'Tulsidas’s poetic retelling of the Ramayana, performed and sung in rural gatherings and festivals.'
      }
    ] : []
  };
};

const CategoryDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      setTimeout(() => {
        setCategoryData(getCategoryData(categoryId));
        setLoading(false);
      }, 500);
    }
  }, [categoryId]);

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

  if (!categoryData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Category Not Found</h1>
            <p className="text-gray-600 mb-6">The category you're looking for doesn't exist or has been removed.</p>
            <Link to="/library" className="text-cultural-saffron hover:underline">Return to Library</Link>
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
        <section className="relative h-[50vh] overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${categoryData.coverImage})`, transform: 'translateZ(0)' }}></div>
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
          <div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-20">
            <div className="text-white max-w-3xl">
              <Link to="/library" className="inline-flex items-center text-white/80 hover:text-white mb-4">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Back to Library</span>
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{categoryData.title}</h1>
              <p className="text-xl text-white/90">{categoryData.description}</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-sm text-gray-500 hover:text-cultural-saffron inline-flex items-center">Home</Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <Link to="/library" className="ml-1 text-sm text-gray-500 hover:text-cultural-saffron">Library</Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="ml-1 text-sm text-cultural-saffron font-medium">{categoryData.title}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <article className="prose prose-lg max-w-none">
                  <p className="text-xl lead font-medium text-gray-700">{categoryData.longDescription}</p>
                  <h2>Historical Background</h2>
                  <p>{categoryData.historicalBackground}</p>
                  <h2>Cultural Significance</h2>
                  <p>{categoryData.culturalSignificance}</p>
                  <h2>Modern Relevance</h2>
                  <p>{categoryData.modernRelevance}</p>
                </article>

                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">Examples</h2>
                  {categoryData.items.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {categoryData.items.map(item => (
                        <CultureCard
                          key={item.id}
                          id={item.id}
                          title={item.title}
                          image={item.image}
                          category={item.category}
                          region={item.region}
                          era={item.era}
                          description={item.description}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                      <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">Content Coming Soon</h3>
                      <p className="text-gray-600 mb-4">We're currently curating examples for this category.</p>
                      <p className="text-sm text-gray-500">Check back later for a rich collection of cultural content.</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="sticky top-6">
                  <div className="bg-cultural-saffron/5 border border-cultural-saffron/20 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-bold mb-4">About This Category</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Tag className="h-5 w-5 text-cultural-saffron mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Type: <span className="font-medium">{categoryData.title}</span></span>
                      </li>
                      <li className="flex items-start">
                        <MapPin className="h-5 w-5 text-cultural-saffron mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Origin: <span className="font-medium">Various regions of India</span></span>
                      </li>
                      <li className="flex items-start">
                        <Clock className="h-5 w-5 text-cultural-saffron mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Time Period: <span className="font-medium">Ancient to Modern</span></span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">Related Categories</h3>
                    <ul className="space-y-2">
                      <li><Link to="/library/scriptures" className="text-cultural-saffron hover:underline flex items-center"><ChevronRight className="h-4 w-4 mr-1" /><span>Scriptures</span></Link></li>
                      <li><Link to="/library/art-forms" className="text-cultural-saffron hover:underline flex items-center"><ChevronRight className="h-4 w-4 mr-1" /><span>Art Forms</span></Link></li>
                      <li><Link to="/library/dance-forms" className="text-cultural-saffron hover:underline flex items-center"><ChevronRight className="h-4 w-4 mr-1" /><span>Dance Forms</span></Link></li>
                      <li><Link to="/library/festivals" className="text-cultural-saffron hover:underline flex items-center"><ChevronRight className="h-4 w-4 mr-1" /><span>Festivals</span></Link></li>
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

export default CategoryDetail;
