
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

const LoadingState: React.FC = () => {
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
};

export default LoadingState;
