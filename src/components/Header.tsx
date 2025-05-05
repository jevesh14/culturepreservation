
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, MessageSquare, Search, Upload, User, Bell, Settings } from 'lucide-react';

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="w-full bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Site Title */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cultural-saffron to-cultural-maroon flex items-center justify-center text-white font-bold text-xl shadow-md">
              भा
            </div>
            <div className="hidden md:block">
              <h1 className="text-2xl font-bold tracking-tight text-gradient">
                भारत संस्कृति
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">Bharat Cultural Hub</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className={`flex-1 max-w-2xl mx-4 transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-full bg-white/80 focus:outline-none focus:border-cultural-saffron focus:ring-2 focus:ring-cultural-saffron/20 transition-all duration-200"
                placeholder="Search culture, heritage, stories..."
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button className="hover:bg-gray-100 p-1 rounded-full text-gray-500">
                  <Bell className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-1 md:space-x-2">
            <Link to="/library" className="cultural-icon-button tooltip-wrapper">
              <Book className="h-5 w-5" />
              <span className="sr-only md:not-sr-only md:hidden">Library</span>
              <span className="tooltip">Library</span>
            </Link>
            
            <Link to="/upload" className="cultural-icon-button tooltip-wrapper">
              <Upload className="h-5 w-5" />
              <span className="sr-only md:not-sr-only md:hidden">Upload</span>
              <span className="tooltip">Upload</span>
            </Link>
            
            <Link to="/discussion" className="cultural-icon-button tooltip-wrapper">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only md:not-sr-only md:hidden">Discussions</span>
              <span className="tooltip">Discussions</span>
            </Link>

            <Link to="/profile" className="flex items-center space-x-2 ml-2 pl-2 border-l">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cultural-peacock to-cultural-blue flex items-center justify-center text-white">
                <User className="h-5 w-5" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
