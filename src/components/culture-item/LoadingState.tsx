
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section skeleton */}
        <div className="relative h-[50vh] bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
          <div className="container mx-auto px-4 h-full flex items-end pb-12 relative">
            <div className="w-full max-w-3xl">
              <div className="h-10 w-36 bg-gray-300 rounded-lg mb-8"></div>
              <div className="h-8 w-64 bg-gray-300 rounded-lg mb-4"></div>
              <div className="h-12 w-3/4 bg-gray-300 rounded-lg mb-4"></div>
              <div className="h-6 w-2/3 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Breadcrumbs skeleton */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex space-x-2">
              <div className="h-5 w-16 bg-gray-200 rounded"></div>
              <div className="h-5 w-5 bg-gray-200 rounded"></div>
              <div className="h-5 w-20 bg-gray-200 rounded"></div>
              <div className="h-5 w-5 bg-gray-200 rounded"></div>
              <div className="h-5 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        
        {/* Content skeleton */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content column skeleton */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                <div className="space-y-6">
                  <div className="flex space-x-4 border-b">
                    <div className="h-10 w-28 bg-gray-200 rounded"></div>
                    <div className="h-10 w-28 bg-gray-200 rounded"></div>
                    <div className="h-10 w-28 bg-gray-200 rounded"></div>
                  </div>
                  
                  <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                  
                  <div className="h-8 w-64 bg-gray-200 rounded mb-4 mt-8"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
              
              {/* Sidebar skeleton */}
              <div>
                <div className="bg-gray-100 rounded-xl p-6">
                  <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-full"></div>
                    <div className="h-5 bg-gray-200 rounded w-full"></div>
                    <div className="h-5 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoadingState;
