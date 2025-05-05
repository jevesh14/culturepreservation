
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-cultural-silk/70 to-white border-t mt-10">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cultural-saffron to-cultural-maroon flex items-center justify-center text-white font-bold text-xl shadow-md">
                भा
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-gradient">
                  भारत संस्कृति
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">Bharat Cultural Hub</p>
              </div>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Preserving and celebrating the rich cultural heritage of India through community contributions and shared knowledge.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-cultural-saffron transition-colors">
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-cultural-saffron transition-colors">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-cultural-saffron transition-colors">
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-cultural-saffron transition-colors">
                <Youtube size={18} />
                <span className="sr-only">Youtube</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/library" className="text-gray-600 hover:text-cultural-saffron transition-colors">Library</Link></li>
              <li><Link to="/upload" className="text-gray-600 hover:text-cultural-saffron transition-colors">Upload Content</Link></li>
              <li><Link to="/discussion" className="text-gray-600 hover:text-cultural-saffron transition-colors">Discussion Forum</Link></li>
              <li><Link to="/events" className="text-gray-600 hover:text-cultural-saffron transition-colors">Cultural Events</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/library/scriptures" className="text-gray-600 hover:text-cultural-saffron transition-colors">Scriptures</Link></li>
              <li><Link to="/library/dance-forms" className="text-gray-600 hover:text-cultural-saffron transition-colors">Dance Forms</Link></li>
              <li><Link to="/library/art-forms" className="text-gray-600 hover:text-cultural-saffron transition-colors">Art Forms</Link></li>
              <li><Link to="/library/sculptures" className="text-gray-600 hover:text-cultural-saffron transition-colors">Sculptures</Link></li>
              <li><Link to="/library/festivals" className="text-gray-600 hover:text-cultural-saffron transition-colors">Festivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={16} className="mr-2 mt-0.5 text-cultural-saffron" />
                <span className="text-gray-600">contact@bharatculturalhub.gov.in</span>
              </li>
              <li className="text-gray-600">
                Ministry of Culture<br />
                Government of India<br />
                New Delhi, India
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Bharat Cultural Hub. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-cultural-saffron">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-cultural-saffron">Terms of Service</Link>
            <Link to="/accessibility" className="text-sm text-gray-500 hover:text-cultural-saffron">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
