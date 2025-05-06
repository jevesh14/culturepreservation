
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, Upload, MessageSquare, ArrowRight, Search, Calendar, Bookmark, Home } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryCard from '../components/CategoryCard';
import ChatWithAI from '../components/ChatWithAI';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-hero-pattern bg-cover py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/80 to-white/70"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                <span className="text-gradient">भारत संस्कृति</span><br/>
                <span className="text-gray-800">Discover India's Cultural Heritage</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Explore and contribute to a vast repository of Indian art, dance, music, scriptures, and cultural traditions.
              </p>
              
              {/* Main Search */}
              <div className="relative max-w-xl mb-8">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Search className="h-5 w-5 text-cultural-saffron" />
                </div>
                <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-cultural-saffron/30 rounded-xl bg-white/80 focus:outline-none focus:border-cultural-saffron focus:ring-2 focus:ring-cultural-saffron/20 transition-all duration-200 shadow-sm text-lg backdrop-blur-sm"
                  placeholder="Search culture, heritage, stories..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute inset-y-0 right-0 flex items-center pr-4 text-cultural-saffron">
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 md:gap-4">
                <Link to="/library" className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-cultural-saffron text-white shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <Book className="h-5 w-5" />
                  <span>Browse Library</span>
                </Link>
                <Link to="/upload" className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-white border border-cultural-saffron/40 text-cultural-saffron shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <Upload className="h-5 w-5" />
                  <span>Upload Content</span>
                </Link>
                <Link to="/auth/mobile" className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-white border border-cultural-saffron/40 text-cultural-saffron shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                  <MessageSquare className="h-5 w-5" />
                  <span>Sign In</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Categories Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Cultural Categories</h2>
                <p className="text-gray-600">Explore India's diverse cultural treasures</p>
              </div>
              <Link to="/library" className="flex items-center text-cultural-saffron mt-4 md:mt-0 hover:underline">
                <span>View all categories</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <CategoryCard
                title="Scriptures"
                icon={<Book className="h-6 w-6" />}
                color="bg-cultural-saffron"
                link="/library/scriptures"
                description="Ancient texts and manuscripts from various periods of Indian history."
              />
              <CategoryCard
                title="Dance Forms"
                icon={<Calendar className="h-6 w-6" />}
                color="bg-cultural-peacock"
                link="/library/dance-forms"
                description="Classical and folk dance traditions from across India's diverse regions."
              />
              <CategoryCard
                title="Art Forms"
                icon={<Home className="h-6 w-6" />}
                color="bg-cultural-green"
                link="/library/art-forms"
                description="Painting, sculpture, and decorative arts showcasing India's artistic legacy."
              />
              <CategoryCard
                title="Festivals"
                icon={<Calendar className="h-6 w-6" />}
                color="bg-cultural-maroon"
                link="/library/festivals"
                description="Celebrations and traditions that mark India's cultural and religious calendar."
              />
            </div>
          </div>
        </section>
        
        {/* Navigation Cards */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Explore the Cultural Hub</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-cultural-silk to-white rounded-2xl p-6 shadow-md border border-cultural-saffron/20 hover:shadow-cultural-hover transition-all duration-300">
                <div className="rounded-full bg-cultural-saffron/10 p-4 w-16 h-16 flex items-center justify-center mb-4">
                  <Book className="h-8 w-8 text-cultural-saffron" />
                </div>
                <h3 className="text-xl font-bold mb-2">Library</h3>
                <p className="text-gray-600 mb-4">Explore a vast open-source repository of cultural content, including scriptures, art, and sculptures.</p>
                <Link to="/library" className="inline-flex items-center text-cultural-saffron font-medium hover:underline">
                  <span>Visit Library</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-gradient-to-br from-cultural-silk to-white rounded-2xl p-6 shadow-md border border-cultural-saffron/20 hover:shadow-cultural-hover transition-all duration-300">
                <div className="rounded-full bg-cultural-saffron/10 p-4 w-16 h-16 flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-cultural-saffron" />
                </div>
                <h3 className="text-xl font-bold mb-2">Upload Content</h3>
                <p className="text-gray-600 mb-4">Contribute your own cultural content to share with the community and preserve heritage.</p>
                <Link to="/upload" className="inline-flex items-center text-cultural-saffron font-medium hover:underline">
                  <span>Upload Content</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-gradient-to-br from-cultural-silk to-white rounded-2xl p-6 shadow-md border border-cultural-saffron/20 hover:shadow-cultural-hover transition-all duration-300">
                <div className="rounded-full bg-cultural-saffron/10 p-4 w-16 h-16 flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-cultural-saffron" />
                </div>
                <h3 className="text-xl font-bold mb-2">Discussion Portal</h3>
                <p className="text-gray-600 mb-4">Engage in discussions, share ideas, and connect with others passionate about culture.</p>
                <Link to="/discussion" className="inline-flex items-center text-cultural-saffron font-medium hover:underline">
                  <span>Join Discussions</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
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

export default Index;
