
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const ItemNotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-50 py-16">
        <div className="text-center max-w-lg px-4">
          <h1 className="text-3xl font-bold mb-4">Item Not Found</h1>
          <p className="text-gray-600 mb-8">
            The item you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            to="/library" 
            className="inline-block px-6 py-3 text-cultural-saffron hover:underline font-medium"
          >
            Return to Library
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ItemNotFound;
