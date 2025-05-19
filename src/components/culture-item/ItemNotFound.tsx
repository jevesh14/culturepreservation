
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { BookX, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const ItemNotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-50 py-16">
        <Card className="max-w-md mx-auto p-8 shadow-lg border-0">
          <div className="text-center">
            <div className="mx-auto bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <BookX className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Item Not Found</h1>
            <p className="text-gray-600 mb-8">
              The item you're looking for doesn't exist or hasn't been added to our database yet.
            </p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
              <Button asChild variant="default" className="bg-cultural-saffron hover:bg-cultural-saffron/90">
                <Link to="/library">
                  Return to Library
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ItemNotFound;
