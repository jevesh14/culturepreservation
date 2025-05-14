
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

// Function to get item data based on itemId and category
const getCultureItemData = (itemId: string): CultureItem | null => {
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

  // Dance forms data
  const danceItems = [
    {
      id: 'ghoomar',
      title: 'Ghoomar',
      image: 'https://images.unsplash.com/photo-1583002083769-0b8b36d612f8',
      category: 'Dance Forms',
      region: 'Rajasthan',
      era: 'Traditional',
      description: 'A graceful dance of swaying ghagras and spinning silhouettes, symbolizing feminine elegance and celebration.',
      historicalBackground: 'Originating with the Bhil tribe and later embraced by Rajput royalty, Ghoomar is a graceful dance of swaying ghagras and spinning silhouettes. Initially performed during religious rituals and royal functions, its rhythmic elegance became a symbol of celebration across Rajasthan.',
      culturalSignificance: 'Ghoomar is the heartbeat of festive Rajasthan. Often performed by brides and womenfolk during Teej and Gangaur, it signifies auspicious beginnings, feminine strength, and communal joy. Each pirouette and hand gesture is coded in folklore.',
      modernRelevance: 'From wedding sangeets in Mumbai to dance academies in New Jersey, Ghoomar now graces global stages and cinema, notably immortalized in Bollywood\'s period epics.'
    },
    {
      id: 'kalbeliya',
      title: 'Kalbeliya',
      image: 'https://images.unsplash.com/photo-1583318432730-a19c89692732',
      category: 'Dance Forms',
      region: 'Rajasthan',
      era: 'Traditional',
      description: 'A hypnotic dance performed by the Kalbeliya tribe that mimics the slithering grace of serpents.',
      historicalBackground: 'Performed by the Kalbeliya tribe of snake charmers, this dance mimics the slithering grace of serpents. Rooted in nomadic desert life, it was once entertainment and enchantment in village squares.',
      culturalSignificance: 'With hypnotic twirls and dramatic costumes adorned with mirror-work, Kalbeliya is both resistance and ritual—an ode to survival and mystique.',
      modernRelevance: 'Honored by UNESCO as Intangible Cultural Heritage, Kalbeliya is now a staple at international folk festivals and fusion performances.'
    },
    {
      id: 'terah-taali',
      title: 'Terah Taali',
      image: 'https://images.unsplash.com/photo-1501162946741-4960f990fdf4',
      category: 'Dance Forms',
      region: 'Rajasthan',
      era: 'Traditional',
      description: 'A devotional seated dance performed with 13 brass cymbals tied to the body.',
      historicalBackground: 'A devotional seated dance from the Kamad and Bhil communities, performed with 13 brass cymbals (taals) tied to the body.',
      culturalSignificance: 'It is an act of worship and endurance, often performed in honor of Baba Ramdev. Sometimes dancers balance pots or swords on their heads while syncing cymbal strikes to devotional songs.',
      modernRelevance: 'Featured in Rajasthan Utsav and folk heritage circuits, it attracts scholars for its complex spiritual geometry.'
    },
    {
      id: 'bhavai',
      title: 'Bhavai',
      image: 'https://images.unsplash.com/photo-1532517891316-72a08e5c03a7',
      category: 'Dance Forms',
      region: 'Western Rajasthan',
      era: 'Traditional',
      description: 'A balancing act where dancers whirl atop swords or glass while balancing brass pots.',
      historicalBackground: 'Emerging from the western desert regions, Bhavai is a balancing act like no other—dancers whirl atop swords or glass while balancing up to 11 brass pots.',
      culturalSignificance: 'Bhavai embodies female resilience, precision, and grace. Performed during marriages and temple events, it blurs the line between risk and beauty.',
      modernRelevance: 'A symbol of feminine power in international theatre and dance showcases. Often used as a metaphor in gender empowerment workshops.'
    },
    {
      id: 'chari-dance',
      title: 'Chari Dance',
      image: 'https://images.unsplash.com/photo-1583318432730-a19c89692732',
      category: 'Dance Forms',
      region: 'Kishangarh, Rajasthan',
      era: 'Traditional',
      description: 'Women balance brass pots, sometimes lit with fire, celebrating the labor of collecting water.',
      historicalBackground: 'Originating in Kishangarh, Chari celebrates the labor of collecting water—an act sacred in Rajasthan\'s arid culture.',
      culturalSignificance: 'Women balance brass pots, sometimes lit with fire, while dancing. It honors grace, motherhood, and daily sacrifice.',
      modernRelevance: 'Taught in schools and featured in state tourism festivals. The props are now an artisanal export item.'
    },
    {
      id: 'dhol-nritya',
      title: 'Drum Dance (Dhol Nritya)',
      image: 'https://images.unsplash.com/photo-1533669955142-6a73332af4db',
      category: 'Dance Forms',
      region: 'Rajasthan',
      era: 'Traditional',
      description: 'A pulsating tribute to valor featuring large percussion instruments strapped across the body.',
      historicalBackground: 'Born from the warrior clans and nomadic tribes of Rajasthan, Drum Dance—known as Dhol Nritya—features large percussion instruments strapped across the body, pounded in coordination with swords, spears, or battle stances.',
      culturalSignificance: 'A pulsating tribute to valor and strength, it was originally a part of temple processions and martial festivals. The thunder of dhols signifies power, community defense, and rhythmic unity.',
      modernRelevance: 'Today, it electrifies stages at national parades, international tribal expos, and cultural fairs. Its dramatic presence is also popular in youth folk competitions.'
    },
    {
      id: 'kathputli-puppet-dance',
      title: 'Kathputli Puppet Dance',
      image: 'https://images.unsplash.com/photo-1582730147924-d92f4da00474',
      category: 'Dance Forms',
      region: 'Rajasthan',
      era: 'Traditional',
      description: 'Dancers mimic the stylized movements of traditional string puppets used for storytelling.',
      historicalBackground: 'Rajasthan\'s ancient puppetry legacy inspired this human-imitating-puppet form. Dancers mimic the stylized movements of Kathputlis—traditional string puppets used for centuries to narrate myth and morality tales.',
      culturalSignificance: 'It pays homage to the Bhatt community\'s storytelling tradition. With exaggerated jerks and frozen smiles, the dance is a nostalgic, often humorous, reflection on control, fate, and tradition.',
      modernRelevance: 'Kathputli Dance has found its place in educational theatre, global puppet forums, and heritage tourism promotions.'
    },
    {
      id: 'gair',
      title: 'Gair',
      image: 'https://images.unsplash.com/photo-1532517891316-72a08e5c03a7',
      category: 'Dance Forms',
      region: 'Mewar, Rajasthan',
      era: 'Traditional',
      description: 'A tribal dance where participants move in spiraling circles, wielding wooden sticks called Khanda.',
      historicalBackground: 'From the region of Mewar, Gair evolved as a tribal dance during Holi and festive processions. Men and women move in spiraling circles, wielding wooden sticks called Khanda.',
      culturalSignificance: 'It\'s a celebration of harvest, harmony, and collective strength. With drumbeats in the background, it becomes a visual echo of unity.',
      modernRelevance: 'Performed in state-sponsored youth events, Gair has now become choreographed art for stage festivals and dance dramas.'
    },
    {
      id: 'dandiya-raas',
      title: 'Dandiya Raas (Rajasthani Variant)',
      image: 'https://images.unsplash.com/photo-1533669955142-6a73332af4db',
      category: 'Dance Forms',
      region: 'Rajasthan',
      era: 'Traditional',
      description: 'A dance form with narrative-rich movements where the clashing of sticks represents cosmic play.',
      historicalBackground: 'Originating in Gujarat, Rajasthan gave it a local twist with narrative-rich movements and slower tempos. Costumes became more elaborate and steps were tied to Krishna lore.',
      culturalSignificance: 'The clashing of sticks represents the cosmic play between Radha and Krishna. It\'s not just festive fun—it\'s symbolic devotion in motion.',
      modernRelevance: 'Dandiya nights in metros and colleges reflect this version with folk authenticity and popular flair. Cultural festivals abroad celebrate this as the heart of Indo-Western fusions.'
    },
    {
      id: 'mayur-nritya',
      title: 'Mayur Nritya',
      image: 'https://images.unsplash.com/photo-1582730147924-d92f4da00474',
      category: 'Dance Forms',
      region: 'Rajasthan',
      era: 'Traditional',
      description: 'Dancers dress in feathered fans and masks to become peacocks, inspired by Lord Krishna\'s association with these birds.',
      historicalBackground: 'Rooted in devotional traditions, Mayur Nritya takes inspiration from Lord Krishna\'s association with peacocks. Dancers dress in feathered fans and masks to become the bird incarnate.',
      culturalSignificance: 'It glorifies nature, rain, and divine love—embodying themes from Puranic tales. Movements are slow, majestic, and emotion-laden.',
      modernRelevance: 'Revived in temple festivals, eco-cultural programs, and nature-themed parades. Schools and NGOs also use it for conservation awareness.'
    },
    {
      id: 'rasiya-dance',
      title: 'Rasiya Dance',
      image: 'https://images.unsplash.com/photo-1582730147924-d92f4da00474',
      category: 'Dance Forms',
      region: 'Braj, Rajasthan',
      era: 'Traditional',
      description: 'A dramatic musical storytelling format involving Radha-Krishna\'s romantic escapades.',
      historicalBackground: 'Birthed in Braj, Rasiya is a dramatic musical storytelling format involving Radha-Krishna\'s romantic escapades. Dancers often sing and act.',
      culturalSignificance: 'Blends folklore, spirituality, and playful emotion. Performed in open-air theatres, it captivates audiences with layered verses.',
      modernRelevance: 'Digitized into short YouTube musicals and used in youth theatre training for character and expression.'
    },
    {
      id: 'matki-dance',
      title: 'Matki Dance',
      image: 'https://images.unsplash.com/photo-1583318432730-a19c89692732',
      category: 'Dance Forms',
      region: 'Madhya Pradesh / Rajasthan Border',
      era: 'Traditional',
      description: 'Women balance multiple clay pots while dancing, expressing balance, responsibility, and household elegance.',
      historicalBackground: 'Originated from the tribal belts of Madhya Pradesh but seamlessly woven into Rajasthan\'s folk identity in border districts.',
      culturalSignificance: 'Women balance multiple clay pots while dancing, expressing balance, responsibility, and elegance in household roles.',
      modernRelevance: 'A centerpiece at rural fairs, art museums, and government-sponsored heritage days.'
    },
    {
      id: 'braj-folk-dances',
      title: 'Braj Folk Dances',
      image: 'https://images.unsplash.com/photo-1533669955142-6a73332af4db',
      category: 'Dance Forms',
      region: 'Bharatpur & Mathura, Rajasthan',
      era: 'Traditional',
      description: 'Dances that trace divine episodes of Krishna\'s life from the spiritual epicenter of the region.',
      historicalBackground: 'From the spiritual epicenter of Bharatpur and Mathura, these dances trace divine episodes of Krishna\'s life.',
      culturalSignificance: 'The dances embody devotion and storytelling, often dramatizing Krishna\'s mischief, miracles, and love.',
      modernRelevance: 'Central to temple festivals, Krishna Janmashtami events, and devotional tourism.'
    },
    {
      id: 'kathak-jaipur-gharana',
      title: 'Kathak (Jaipur Gharana)',
      image: 'https://images.unsplash.com/photo-1582730147924-d92f4da00474',
      category: 'Dance Forms',
      region: 'Jaipur, Rajasthan',
      era: 'Classical',
      description: 'A classical dance form known for vigor, dramatic storytelling, and intricate footwork.',
      historicalBackground: 'Evolving under royal Rajput and Mughal courts, this Kathak lineage is known for vigor, dramatic storytelling, and footwork.',
      culturalSignificance: 'The Jaipur Gharana emphasizes intricate rhythms, powerful pirouettes, and mythological narratives—performing both in temples and courts.',
      modernRelevance: 'Showcased at global dance summits, taught online, and revived by young artists through fusion with modern genres.'
    },
    {
      id: 'nagaras-dhol-dances',
      title: 'Nagaras and Dhol Dances',
      image: 'https://images.unsplash.com/photo-1533669955142-6a73332af4db',
      category: 'Dance Forms',
      region: 'Rajasthan',
      era: 'Traditional',
      description: 'Percussion traditions that were royal heralds announcing important events and celebrations.',
      historicalBackground: 'These percussion traditions were royal heralds—announcing coronations, temple openings, or victories.',
      culturalSignificance: 'They still signal beginnings and celebrations. Their roaring presence unites people in sound and spirit.',
      modernRelevance: 'Sampled in folk-electronic collaborations, opening acts at festivals, and school parades.'
    }
  ];

  // First check the scripture items
  const scriptureItem = scriptureItems.find(item => item.id === itemId);
  if (scriptureItem) {
    return scriptureItem;
  }
  
  // Then check the dance items
  const danceItem = danceItems.find(item => item.id === itemId);
  if (danceItem) {
    return danceItem;
  }
  
  // If no match found in either array
  return null;
};

const CultureItemDetail = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'scriptures';
  
  const [item, setItem] = useState<CultureItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (itemId) {
      // Simulating API call
      setTimeout(() => {
        const data = getCultureItemData(itemId);
        setItem(data);
        setLoading(false);
      }, 500);
    }
  }, [itemId]);

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
