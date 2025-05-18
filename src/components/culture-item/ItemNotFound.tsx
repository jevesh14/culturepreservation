
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const ItemNotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Item Not Found</h1>
          <p className="text-gray-600 mb-6">The item you're looking for doesn't exist or has been removed.</p>
          <Link to="/library" className="text-cultural-saffron hover:underline">
            Return to Library
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ItemNotFound;
