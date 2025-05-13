import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, BookOpen, Tag, ChevronRight, Plus } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatWithAI from '../components/ChatWithAI';
import CultureCard from '../components/CultureCard';
import AddCultureItemModal from '../components/AddCultureItemModal';
import { toast } from "@/hooks/use-toast";

// This type will eventually be replaced with real data from your backend
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
    historicalBackground?: string;
    culturalSignificance?: string;
    modernRelevance?: string;
  }>;
}

// Placeholder data - you'll replace this with real data later
const getCategoryData = (categoryId: string): CategoryData => {
  // Scripture items data
  const scriptureItems = [
    {
      id: 'vedas-upanishads',
      title: 'Vedas and Upanishads',
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      category: 'Scriptures',
      region: 'Ancient India',
      era: 'Vedic Period (1500 - 500 BCE)',
      description: 'The fountainhead of Indian spiritual and philosophical thought, preserved through oral tradition and written manuscripts.',
      historicalBackground: 'These ancient Sanskrit texts—composed over 3,000 years ago—are the fountainhead of Indian spiritual and philosophical thought. In Rajasthan, they have been preserved not just in books, but in sound—chanted with precision by Brahmin families across centuries. Their oral recitation, passed like sacred flame, is an art of breath, rhythm, and memory.',
      culturalSignificance: 'They are not just read—they are lived. The Vedas guide temple architecture, fire rituals, and seasonal celebrations. The Upanishads\' probing metaphysics have shaped local storytelling, folklore, and moral codes. Even in rural shrines, their echo lingers.',
      modernRelevance: 'From gurukuls in the Aravallis to iPads in classrooms, these texts are being digitized and taught to new generations. Meditation apps quote them. Podcasts break them down. Rajasthan\'s desert wisdom now travels the globe.'
    },
    {
      id: 'bhagavad-gita',
      title: 'Bhagavad Gita',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
      category: 'Scriptures',
      region: 'Ancient India',
      era: 'Epic Period',
      description: 'The divine dialogue between Krishna and Arjuna, offering guidance on duty, ethics, and spiritual wisdom.',
      historicalBackground: 'Embedded in the Mahabharata, this divine dialogue between Krishna and Arjuna arrived in Rajasthan via saints, storytellers, and royal courts. It became a text of leadership, ethics, and inner war.',
      culturalSignificance: 'The Gita is not a book—it\'s a compass. Rajput warriors, Jain merchants, and housewives alike turn to its verses for guidance. It\'s recited before battles, exams, and even court verdicts.',
      modernRelevance: 'IAS aspirants study it. Motivational speakers quote it. Rajasthan\'s dusty scrolls now scroll across Instagram feeds, blessing the day with #ShlokOfTheDay.'
    },
    {
      id: 'ramcharitmanas',
      title: 'Ramcharitmanas',
      image: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098',
      category: 'Scriptures',
      region: 'North India',
      era: '16th Century',
      description: 'Tulsidas\'s retelling of the Ramayana in Awadhi language, widely revered and recited throughout Rajasthan.',
      historicalBackground: 'In the 16th century, Tulsidas gave the Ramayana a lyrical rebirth in Awadhi. Rajasthan embraced it like a desert finds monsoon. Bhajan groups, temple reciters, and even grandmothers made it theirs.',
      culturalSignificance: 'It is part lullaby, part life-guide. Women memorize it. Children hear it in bedtime tales. It\'s chanted during Ram Navami, read in mourning, and whispered for luck.',
      modernRelevance: 'WhatsApp forwards carry its verses. YouTube livestreams of Sundarkand draw thousands every Tuesday. It\'s spiritual fuel in a digital bottle.'
    },
    {
      id: 'devnarayan-mahagatha',
      title: 'Devnarayan Mahagatha',
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e',
      category: 'Scriptures',
      region: 'Rajasthan',
      era: 'Medieval',
      description: 'Epic of a divine hero riding a horse, sung by Bhopa priest-singers using scrolls called Phads.',
      historicalBackground: 'This epic of a divine hero riding a horse through Rajasthan\'s spiritual soil is sung by Bhopa priest-singers, using scrolls 15 feet long called Phads.',
      culturalSignificance: 'It\'s performed in night-long gatherings, blending music, myth, and message. Each line is memorized, each character painted with reverence.',
      modernRelevance: 'Now being archived by cultural ministries, and reimagined through animation for kids. Myth meets multimedia.'
    },
    {
      id: 'tejaji-pabuji-phad',
      title: 'Tejaji & Pabuji Ki Phad',
      image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840',
      category: 'Scriptures',
      region: 'Rajasthan',
      era: 'Medieval',
      description: 'Epic tales of Rajasthan\'s folk deities painted on massive scrolls and narrated by Bhopa storytellers.',
      historicalBackground: 'Tejaji, the fearless protector against snakebites, and Pabuji, the camel-riding folk deity who defends honor and cattle, are among Rajasthan\'s most beloved epic heroes. Their tales are painted on enormous scrolls known as Phads—portable temples of pigment and story. These scrolls are not just artistic expressions but religious maps, each segment depicting scenes that Bhopa storytellers bring to life.',
      culturalSignificance: 'These warrior deities embody the Rajasthani ideals of bravery, sacrifice, and deep connection to nature. The Phad becomes a sacred performance space as Bhopa and Bhopi narrators sing the stories, play the ravanhatta, and awaken devotion in village gatherings that last until dawn. Their devotion is so deep, devotees believe invoking their names can heal snakebite victims or bless cattle.',
      modernRelevance: 'Today, these Phads are being digitized by museums, while folk collectives create contemporary adaptations in animation, theatre, and school plays. You\'ll find Tejaji\'s figure on truck murals, temple walls, and even as village fair mascots. Through digital storytelling apps and cultural fairs, these legends now inspire young audiences far beyond the sand dunes.'
    },
    {
      id: 'jain-agamas',
      title: 'Jain Agamas',
      image: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098',
      category: 'Scriptures',
      region: 'Rajasthan',
      era: 'Ancient',
      description: 'Spiritual treatises rooted in logic, ethics, and non-violence, preserved in Jain communities across Rajasthan.',
      historicalBackground: 'Composed in ancient Prakrit and transmitted through a lineage of ascetic scholars, the Jain Agamas are spiritual treatises rooted in logic, ethics, and non-violence. Rajasthan, home to vibrant Jain communities in cities like Bikaner and Jaisalmer, became a stronghold of Agama preservation. The temples and monastic libraries here safeguarded these texts through centuries of turmoil and change, often by copying them onto Kagzi paper made in Sanganer.',
      culturalSignificance: 'The Agamas are not just scripture—they\'re a way of life. Their teachings on ahimsa (non-violence), aparigraha (non-possessiveness), and satya (truth) influence daily choices, diet, business ethics, and festival observances. In Rajasthan, monks still recite these texts aloud in morning rituals, while followers participate in study groups and philosophical debates.',
      modernRelevance: 'In an age hungry for ethical clarity, the Agamas have found new life through digitization projects led by Jain trusts. Online Jain libraries, mobile apps, and even VR temple tours now include Agama teachings. The message of compassion and restraint resonates deeply with today\'s environmentally conscious and mindfulness-seeking youth.'
    },
    {
      id: 'tantric-texts',
      title: 'Tantric Texts (Nath Sect)',
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e',
      category: 'Scriptures',
      region: 'Mount Abu and Alwar',
      era: 'Medieval',
      description: 'Esoteric scriptures exploring spiritual transformation through energy work, mantras, and ritual practices.',
      historicalBackground: 'Passed down through shadowed caves, whispering forests, and ascetic silence, the Tantric scriptures of the Nath Sect have long been concealed from the public eye. Rooted in Mount Abu and Alwar, these manuals weren\'t written for scholars—they were lived by yogis who carved their path with discipline and secrecy.',
      culturalSignificance: 'These texts go beyond rituals—they explore chakras, energy flows, mantras, and mudras as vehicles for liberation. Fire ceremonies, symbolic diagrams drawn with ash, and practices like kundalini awakening are grounded in these teachings. The Nath yogis treat them as divine codes—keys to spiritual transformation.',
      modernRelevance: 'With the rise of global yoga and tantra studies, these once-guarded traditions are now surfacing in academic conferences, yoga teacher trainings, and holistic healing centers. Documentaries and heritage researchers are decoding these scripts, making Rajasthan a hub for seekers from LA to London.'
    },
    {
      id: 'kavad-shrines',
      title: 'Kavad Shrines',
      image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840',
      category: 'Scriptures',
      region: 'Rajasthan',
      era: 'Traditional',
      description: 'Hand-painted wooden shrines that unfold to reveal stories from epics and mythology, carried by storytellers.',
      historicalBackground: 'The Kavad is no ordinary shrine—it is a hand-painted, story-filled wooden temple that folds like a cabinet and unfolds into myth. Carried by the Kavadiya Bhats across Rajasthan\'s sunbaked terrain, each Kavad is a library on foot, holding episodes from Ramayana, Mahabharata, and folk epics.',
      culturalSignificance: 'When the storyteller opens each panel, he opens a new chapter. The act of storytelling becomes devotional performance, where pilgrims gather in dusty courtyards to witness the layered visuals. It\'s a sacred theatre where the divine walks door to door.',
      modernRelevance: 'Today, design institutes, museums, and educational kits across India have embraced the Kavad format. It\'s being revived in school storytelling programs and featured in art biennales worldwide as a model of portable narrative architecture.'
    },
    {
      id: 'bhopa-bhopi',
      title: 'Bhopa & Bhopi Traditions',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
      category: 'Scriptures',
      region: 'Rajasthan',
      era: 'Traditional',
      description: 'Oral epic performers who use music and storytelling to keep Rajasthan\'s spiritual memory alive through night-long performances.',
      historicalBackground: 'A duet of devotion and drama, the Bhopa and Bhopi are oral epic performers who preserve Rajasthan\'s spiritual memory. The Bhopa sings and plays the ravanhatta—a haunting stringed instrument—while the Bhopi joins in chorus or percussion. Together, they animate giant Phad scrolls in performances that often last entire nights.',
      culturalSignificance: 'These performers are more than musicians—they are living vessels of divine narrative. Their songs invoke gods, heroes, and moral tales that guide rural ethics. Often barefoot, sitting by lantern-light, they are welcomed into villages like wandering sages.',
      modernRelevance: 'With support from folk arts organizations and UNESCO, Bhopa-Bhopi duos now perform at international folk festivals and conferences. Their art is also being archived in audiovisual libraries, and young Bhopas are being trained in music academies to keep the tradition thriving.'
    }
  ];

  // Common category data structure
  const baseCategory = {
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
    items: []
  };

  // Customize based on category
  if (categoryId === 'scriptures') {
    return {
      ...baseCategory,
      title: 'Scriptures',
      description: 'Sacred texts that form the foundation of Indian spiritual and philosophical traditions',
      longDescription: 'Indian scriptures represent some of the world\'s oldest and most profound literary and philosophical works. These texts range from the ancient Vedas to folk epics preserved through oral tradition, each offering unique insights into spirituality, ethics, and cultural values that continue to shape Indian society today.',
      coverImage: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
      historicalBackground: 'India\'s scriptural traditions span several millennia, from the ancient Vedic compositions (1500 BCE) to medieval devotional texts. These works have been preserved through various means—palm leaf manuscripts, oral recitation, temple inscriptions, and illustrated scrolls. Each text emerged from specific historical contexts but transcended its origins to become timeless wisdom.',
      culturalSignificance: 'These sacred texts are not merely religious documents but the foundation of Indian thought, art, ethics, and social structures. They provide philosophical frameworks, moral codes, and spiritual practices that have guided countless generations. The teachings found in these texts inform everything from daily rituals to architectural principles, from music to governance.',
      modernRelevance: 'In today\'s digital age, ancient wisdom finds new expression. These texts are being digitized, translated, and shared globally. Their ethical principles address contemporary issues like environmental ethics and mental well-being. Modern scholars, spiritualists, and even business leaders continue to find relevant guidance in these ancient words.',
      items: scriptureItems
    };
  } else if (categoryId === 'dance-forms') {
    // Return dance forms data (we'll add this content later)
    return {
      ...baseCategory,
      title: 'Dance Forms',
      coverImage: 'https://images.unsplash.com/photo-1466442929976-97f336a657be'
    };
  } else if (categoryId === 'art-forms') {
    // Return art forms data (we'll add this content later)
    return {
      ...baseCategory,
      title: 'Art Forms',
      coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
    };
  } else if (categoryId === 'festivals') {
    // Return festivals data (we'll add this content later)
    return {
      ...baseCategory,
      title: 'Festivals',
      coverImage: 'https://images.unsplash.com/photo-1500673922987-e212871fec22'
    };
  }

  // Default return
  return baseCategory;
};

const CategoryDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (categoryId) {
      // Simulating an API call
      setTimeout(() => {
        setCategoryData(getCategoryData(categoryId));
        setLoading(false);
      }, 500);
    }
  }, [categoryId]);

  const handleAddItem = (newItem: {
    title: string;
    image: string;
    region?: string;
    era?: string;
    description: string;
  }) => {
    if (categoryData) {
      const updatedItem = {
        ...newItem,
        id: `item-${Date.now()}`, // Create a unique ID
        category: categoryData.title
      };
      
      setCategoryData({
        ...categoryData,
        items: [...categoryData.items, updatedItem]
      });
      
      toast({
        title: "Item Added",
        description: `"${newItem.title}" has been added to ${categoryData.title}`
      });
      
      setShowAddModal(false);
    }
  };

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
            <Link to="/library" className="text-cultural-saffron hover:underline">
              Return to Library
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
        {/* Hero section with parallax effect */}
        <section className="relative h-[50vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ 
              backgroundImage: `url(${categoryData.coverImage})`,
              transform: 'translateZ(0)',
            }}
          ></div>
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
                <li aria-current="page">
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="ml-1 text-sm text-cultural-saffron font-medium">
                      {categoryData.title}
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
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Examples</h2>
                    <button 
                      onClick={() => setShowAddModal(true)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-cultural-saffron text-white rounded-lg hover:bg-cultural-saffron/90 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add New</span>
                    </button>
                  </div>
                  
                  {categoryData.items.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {categoryData.items.map(item => (
                        <CultureCard
                          key={item.id}
                          id={item.id}
                          title={item.title}
                          image={item.image}
                          category={item.category}
                          region={item.region || ""}
                          era={item.era}
                          description={item.description}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                      <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Examples Yet</h3>
                      <p className="text-gray-600 mb-4">
                        Add your first example to this category.
                      </p>
                      <button 
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2 bg-cultural-saffron text-white rounded-lg hover:bg-cultural-saffron/90 transition-colors"
                      >
                        Add New Item
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Sidebar */}
              <div>
                <div className="sticky top-6">
                  <div className="bg-cultural-saffron/5 border border-cultural-saffron/20 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-bold mb-4">About This Category</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Tag className="h-5 w-5 text-cultural-saffron mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">
                          Type: <span className="font-medium">{categoryData.title}</span>
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MapPin className="h-5 w-5 text-cultural-saffron mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">
                          Origin: <span className="font-medium">Various regions of India</span>
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Clock className="h-5 w-5 text-cultural-saffron mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">
                          Time Period: <span className="font-medium">Ancient to Modern</span>
                        </span>
                      </li>
                    </ul>
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
      
      {/* Add Item Modal */}
      {showAddModal && (
        <AddCultureItemModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddItem}
          category={categoryData.title}
        />
      )}
      
      <Footer />
      <ChatWithAI />
    </div>
  );
};

export default CategoryDetail;
