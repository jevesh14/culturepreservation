
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookX, ArrowLeft, HomeIcon, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import Header from '../Header';
import Footer from '../Footer';
import { toast } from '@/hooks/use-toast';

const ItemNotFound: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();

  useEffect(() => {
    // Show toast notification when component mounts
    if (itemId) {
      toast({
        title: "Item Not Found",
        description: `We couldn't find an item with ID: ${itemId}`,
        variant: "destructive"
      });
      
      // Log error for debugging
      console.error(`404 Error: Item with ID "${itemId}" not found in the database`);
    }
  }, [itemId]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-50 py-16">
        <div className="w-full max-w-lg px-6">
          <Card className="p-8 border-0 shadow-lg relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cultural-saffron/5 rounded-full -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cultural-saffron/5 rounded-full -ml-10 -mb-10"></div>
            
            <div className="relative z-10 text-center">
              <div className="mx-auto bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <BookX className="w-10 h-10 text-red-500" />
              </div>
              
              <h1 className="text-3xl font-bold mb-3">Item Not Found</h1>
              
              <p className="text-gray-600 mb-6">
                The item "{itemId}" doesn't exist or hasn't been added to our database yet.
              </p>
              
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
                <Button asChild variant="default" className="bg-cultural-saffron hover:bg-cultural-saffron/90 gap-2">
                  <Link to="/library">
                    <Search className="w-4 h-4" />
                    Browse Library
                  </Link>
                </Button>
                
                <Button asChild variant="outline">
                  <Link to="/" className="flex items-center gap-2">
                    <HomeIcon className="h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 text-sm text-gray-500">
                <p>Would you like to contribute this item to our database?</p>
                <Button asChild variant="link" className="text-cultural-saffron">
                  <Link to="/upload">Add this cultural item</Link>
                </Button>
              </div>
            </div>
          </Card>
          
          <div className="mt-6 bg-red-100 p-4 rounded-md">
            <p className="text-sm font-medium text-red-800">Technical Details</p>
            <p className="text-xs text-red-700">
              Item ID: {itemId || 'No ID provided'}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ItemNotFound;
