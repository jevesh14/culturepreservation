
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatWithAI from '../components/ChatWithAI';

// Define empty arrays for categories and sorting options
const categories = [
  'All Topics',
  'Culture Debates',
  'Ancient vs. Modern',
  'Lost Traditions',
  'Story of the Week',
  'Regional Spotlights'
];

// Sort options - reduced to only Trending and Recent
const sortOptions = [
  'Trending',
  'Recent'
];

const Discussion = () => {
  const [activeCategory, setActiveCategory] = useState('All Topics');
  const [sortBy, setSortBy] = useState('Trending');
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Discussion Header */}
        <section className="bg-gradient-to-r from-cultural-silk to-white py-10 border-b">
          <div className="container mx-auto px-4">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-cultural-saffron mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to home</span>
            </Link>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Discussion Portal</h1>
                <p className="text-gray-600">Join conversations about Indian culture and heritage</p>
              </div>
              
              {/* Search */}
              <div className="mt-4 md:mt-0 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-500" />
                  </div>
                  <input 
                    type="text" 
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-cultural-saffron focus:ring-2 focus:ring-cultural-saffron/20 outline-none"
                    placeholder="Search discussions..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Discussion Filters */}
        <section className="py-4 border-b bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between">
              {/* Categories */}
              <div className="flex overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 mr-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category 
                        ? 'bg-cultural-saffron/10 text-cultural-saffron' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Sort Dropdown - only Trending and Recent */}
              <div className="flex items-center mt-3 md:mt-0">
                <label className="text-sm text-gray-600 mr-2">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent border border-gray-300 rounded-lg pl-3 pr-8 py-1.5 text-sm focus:outline-none focus:border-cultural-saffron focus:ring-2 focus:ring-cultural-saffron/20 cursor-pointer"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>
        
        {/* Weekly Featured Topic */}
        <section className="py-6 border-b bg-gradient-to-r from-cultural-saffron/10 to-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-2/3 lg:w-3/4 mb-6 md:mb-0 md:mr-6">
                <div className="bg-white rounded-xl p-6 border border-cultural-saffron/20 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span className="px-3 py-1 text-xs font-medium bg-cultural-saffron text-white rounded-full">Featured Topic</span>
                    </div>
                    <div className="text-sm text-gray-500">Weekly Topic</div>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-2">Ready for discussions about Indian culture</h2>
                  
                  <p className="text-gray-600 mb-4">
                    This space is prepared for authentic discussions about Indian culture, traditions, and heritage. 
                    Add real discussions to engage with the community.
                  </p>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-gray-500">No active discussions yet</span>
                      </div>
                      <Link 
                        to="/discussion/weekly-topic" 
                        className="px-3 py-1.5 bg-cultural-saffron text-white rounded-lg text-sm font-medium hover:bg-cultural-saffron/90 transition-colors"
                      >
                        Start Discussion
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/3 lg:w-1/4">
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Community Guidelines</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <div className="h-4 w-4 rounded-full bg-cultural-saffron/20 text-cultural-saffron flex items-center justify-center mr-2 mt-1 text-xs">1</div>
                      <span>Be respectful of diverse perspectives and cultural sensitivities.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-4 w-4 rounded-full bg-cultural-saffron/20 text-cultural-saffron flex items-center justify-center mr-2 mt-1 text-xs">2</div>
                      <span>Cite sources when sharing historical or academic information.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="h-4 w-4 rounded-full bg-cultural-saffron/20 text-cultural-saffron flex items-center justify-center mr-2 mt-1 text-xs">3</div>
                      <span>Focus on constructive dialogue rather than criticism.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Empty Discussion Topics */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Discussion Topics</h2>
            </div>
            
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <div className="mx-auto w-16 h-16 mb-4 text-gray-300">
                <MessageCircle className="w-16 h-16" />
              </div>
              <h3 className="text-xl font-bold mb-2">No discussions yet</h3>
              <p className="text-gray-600 mb-6">
                Check back later for discussions about Indian culture and heritage
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <ChatWithAI />
    </div>
  );
};

export default Discussion;
