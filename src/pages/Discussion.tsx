
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Heart, Share, User, Search, Filter, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatWithAI from '../components/ChatWithAI';

// Sample discussion data
const discussions = [
  {
    id: '1',
    title: 'How has storytelling evolved in Indian cinema?',
    author: 'Priya Sharma',
    avatar: 'P',
    date: '2 days ago',
    content: 'Indian cinema has seen a remarkable evolution in storytelling techniques over the decades. From the mythological films of the early era to the socially conscious narratives of the 50s and 60s, to the masala films of the 70s and 80s, to the globalized, content-driven cinema of today. How do you see this evolution and what are your favorite turning points?',
    likes: 34,
    replies: 15,
    tags: ['Cinema', 'Storytelling', 'Evolution'],
    isPinned: true
  },
  {
    id: '2',
    title: 'The influence of Sanskrit on modern Indian languages',
    author: 'Rahul Verma',
    avatar: 'R',
    date: '1 week ago',
    content: "Sanskrit, as one of the oldest documented languages, has had a profound influence on most Indian languages. From vocabulary to grammar structures, its legacy continues. I've been studying how Sanskrit loanwords have been incorporated differently across various regional languages. What patterns have you observed in your mother tongue?",
    likes: 27,
    replies: 22,
    tags: ['Languages', 'Sanskrit', 'Linguistics'],
    isPinned: false
  },
  {
    id: '3',
    title: 'How do we preserve dying folk art forms?',
    author: 'Meena Kumari',
    avatar: 'M',
    date: '2 weeks ago',
    content: "Many traditional Indian folk art forms are facing extinction as younger generations pursue other careers. I've been documenting the Patachitra artists of Odisha and their struggles. What are some effective strategies you've seen for preserving these art forms while ensuring the artists can make a sustainable living?",
    likes: 41,
    replies: 19,
    tags: ['Folk Art', 'Preservation', 'Traditions'],
    isPinned: false
  },
  {
    id: '4',
    title: 'The role of textiles in Indian cultural identity',
    author: 'Arjun Singh',
    avatar: 'A',
    date: '3 weeks ago',
    content: "From Banarasi silk to Kanchipuram, from Bandhani to Ikat - textiles have always been a strong marker of cultural identity in India. Each region has its unique techniques, motifs, and cultural significance. How do you see the relationship between textiles and regional identity evolving in modern India?",
    likes: 19,
    replies: 8,
    tags: ['Textiles', 'Handloom', 'Heritage'],
    isPinned: false
  },
  {
    id: '5',
    title: 'Lost recipes of Mughal cuisine',
    author: 'Kabir Khan',
    avatar: 'K',
    date: '1 month ago',
    content: "I've been researching historical food manuscripts and found references to several Mughal dishes that are no longer prepared today. The sophisticated cooking techniques and unique spice combinations seem to have been lost over time. Has anyone come across historical recipes that have disappeared from our modern kitchens?",
    likes: 53,
    replies: 31,
    tags: ['Cuisine', 'Mughal', 'History'],
    isPinned: false
  }
];

// Topic categories
const categories = [
  'All Topics',
  'Culture Debates',
  'Ancient vs. Modern',
  'Lost Traditions',
  'Story of the Week',
  'Regional Spotlights'
];

// Sort options
const sortOptions = [
  'Trending',
  'Recent',
  'Most Liked',
  'Most Discussed'
];

const Discussion = () => {
  const [activeCategory, setActiveCategory] = useState('All Topics');
  const [sortBy, setSortBy] = useState('Trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  
  const toggleLike = (id: string) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter(postId => postId !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };
  
  // Filter discussions based on search and category
  const filteredDiscussions = discussions.filter(discussion => {
    // Search filter
    if (searchQuery && !discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Category filter
    if (activeCategory !== 'All Topics') {
      // This is a simplified filter - in a real app you'd have category data for each post
      // For now, we'll just filter based on tag matching category for demonstration
      if (!discussion.tags.some(tag => tag === activeCategory || 
         (activeCategory === 'Lost Traditions' && tag === 'Preservation'))) {
        return false;
      }
    }
    
    return true;
  });

  // Sort discussions based on selected option
  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    // Always show pinned posts at the top
    if (a.isPinned !== b.isPinned) {
      return a.isPinned ? -1 : 1;
    }
    
    switch (sortBy) {
      case 'Recent':
        // This is simplified sorting based on date string
        return a.date.includes('day') ? -1 : 1;
      case 'Most Liked':
        return b.likes - a.likes;
      case 'Most Discussed':
        return b.replies - a.replies;
      default: // Trending
        // For simplicity, trending is a combination of likes and replies
        return (b.likes + b.replies * 2) - (a.likes + a.replies * 2);
    }
  });

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
              
              {/* Sort Dropdown */}
              <div className="flex items-center mt-3 md:mt-0">
                <label className="text-sm text-gray-600 mr-2">Sort by:</label>
                <div className="relative inline-block">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-transparent border border-gray-300 rounded-lg pl-3 pr-8 py-1.5 text-sm focus:outline-none focus:border-cultural-saffron focus:ring-2 focus:ring-cultural-saffron/20 cursor-pointer"
                  >
                    {sortOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
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
                  
                  <h2 className="text-2xl font-bold mb-2">The Revival of Traditional Indian Games</h2>
                  
                  <p className="text-gray-600 mb-4">
                    From Kabaddi's global resurgence to Pachisi becoming the inspiration for modern board games, traditional Indian games are finding new life in contemporary settings. How can we preserve these cultural treasures while adapting them for today's audiences?
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600">Games</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600">Heritage</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600">Revival</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-cultural-saffron mr-1">28 contributors</span>
                        <span className="text-gray-400 mx-1">•</span>
                        <span className="text-gray-500">86 comments</span>
                      </div>
                      <Link 
                        to="/discussion/weekly-topic" 
                        className="px-3 py-1.5 bg-cultural-saffron text-white rounded-lg text-sm font-medium hover:bg-cultural-saffron/90 transition-colors"
                      >
                        Join Discussion
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
        
        {/* Discussion Topics */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Discussion Topics</h2>
              <Link 
                to="/discussion/new" 
                className="px-4 py-2 bg-cultural-saffron text-white rounded-lg hover:bg-cultural-saffron/90 transition-colors"
              >
                Start New Topic
              </Link>
            </div>
            
            {sortedDiscussions.length > 0 ? (
              <div className="space-y-6">
                {sortedDiscussions.map((discussion) => (
                  <div 
                    key={discussion.id} 
                    className={`bg-white rounded-xl shadow-sm border ${discussion.isPinned ? 'border-cultural-saffron/30' : 'border-gray-200'} overflow-hidden`}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium text-lg mr-3">
                            {discussion.avatar}
                          </div>
                          <div>
                            <p className="font-medium">{discussion.author}</p>
                            <p className="text-xs text-gray-500">{discussion.date}</p>
                          </div>
                        </div>
                        
                        {discussion.isPinned && (
                          <span className="px-3 py-1 text-xs font-medium bg-cultural-saffron/10 text-cultural-saffron rounded-full">
                            Pinned
                          </span>
                        )}
                      </div>
                      
                      <Link to={`/discussion/${discussion.id}`} className="block">
                        <h3 className="text-xl font-bold mb-2 hover:text-cultural-saffron transition-colors">
                          {discussion.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {discussion.content}
                        </p>
                      </Link>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {discussion.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-200 cursor-pointer transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="border-t pt-4 flex justify-between items-center">
                        <div className="flex space-x-4">
                          <button 
                            onClick={() => toggleLike(discussion.id)}
                            className={`flex items-center space-x-1 ${likedPosts.includes(discussion.id) ? 'text-cultural-maroon' : 'text-gray-600'} hover:text-cultural-maroon transition-colors`}
                          >
                            <Heart className={`h-4 w-4 ${likedPosts.includes(discussion.id) ? 'fill-cultural-maroon' : ''}`} />
                            <span className="text-sm">{likedPosts.includes(discussion.id) ? discussion.likes + 1 : discussion.likes}</span>
                          </button>
                          
                          <Link 
                            to={`/discussion/${discussion.id}`} 
                            className="flex items-center space-x-1 text-gray-600 hover:text-cultural-saffron transition-colors"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-sm">{discussion.replies}</span>
                          </Link>
                          
                          <button className="flex items-center space-x-1 text-gray-600 hover:text-cultural-saffron transition-colors">
                            <Share className="h-4 w-4" />
                            <span className="text-sm">Share</span>
                          </button>
                        </div>
                        
                        <Link 
                          to={`/discussion/${discussion.id}`} 
                          className="text-sm text-cultural-saffron hover:underline"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <div className="mx-auto w-16 h-16 mb-4 text-gray-300">
                  <MessageCircle className="w-16 h-16" />
                </div>
                <h3 className="text-xl font-bold mb-2">No discussions found</h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery 
                    ? `We couldn't find any discussions matching "${searchQuery}"`
                    : `No discussions found in the ${activeCategory} category.`
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Clear Search
                    </button>
                  )}
                  <Link 
                    to="/discussion/new" 
                    className="px-4 py-2 bg-cultural-saffron text-white rounded-lg hover:bg-cultural-saffron/90 transition-colors"
                  >
                    Start New Discussion
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
      <ChatWithAI />
    </div>
  );
};

export default Discussion;
