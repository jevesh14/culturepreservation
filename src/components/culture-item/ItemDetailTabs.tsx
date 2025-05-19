
import React from 'react';
import { Tag, MapPin, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CultureItem } from '../../data/cultureItemData';

interface ItemDetailTabsProps {
  item: CultureItem;
}

const ItemDetailTabs: React.FC<ItemDetailTabsProps> = ({ item }) => {
  // Check if any detailed content exists
  const hasHistory = item.historicalBackground && item.historicalBackground.trim() !== '';
  const hasSignificance = item.culturalSignificance && item.culturalSignificance.trim() !== '';
  const hasRelevance = item.modernRelevance && item.modernRelevance.trim() !== '';
  
  // If no detailed content exists, we'll only show overview
  const hasDetailedContent = hasHistory || hasSignificance || hasRelevance;

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="w-full justify-start border-b mb-6 pb-0 bg-transparent space-x-4">
        <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-cultural-saffron rounded-none">
          Overview
        </TabsTrigger>
        {hasHistory && (
          <TabsTrigger value="history" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-cultural-saffron rounded-none">
            Historical Background
          </TabsTrigger>
        )}
        {hasSignificance && (
          <TabsTrigger value="significance" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-cultural-saffron rounded-none">
            Cultural Significance
          </TabsTrigger>
        )}
        {hasRelevance && (
          <TabsTrigger value="relevance" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-cultural-saffron rounded-none">
            Modern Relevance
          </TabsTrigger>
        )}
      </TabsList>
      
      <TabsContent value="overview" className="mt-0">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl lead font-medium text-gray-700">{item.description}</p>
          
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold mb-3">About {item.title.split(':')[0]}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Tag className="h-5 w-5 text-cultural-saffron mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Category: <span className="font-medium">{item.category}</span>
                </span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-cultural-saffron mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Region: <span className="font-medium">{item.region || 'Various Regions'}</span>
                </span>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-cultural-saffron mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  Era: <span className="font-medium">{item.era || 'Traditional'}</span>
                </span>
              </li>
            </ul>
          </div>
          
          {!hasDetailedContent && (
            <div className="mt-8 p-6 border border-dashed border-gray-200 rounded-lg text-center">
              <p className="text-gray-500">
                We're currently expanding our knowledge base for {item.title.split(':')[0]}.
                More detailed information will be available soon.
              </p>
            </div>
          )}
        </div>
      </TabsContent>
      
      {hasHistory && (
        <TabsContent value="history" className="mt-0">
          <div className="prose prose-lg max-w-none">
            <h2>Historical Background</h2>
            <p>{item.historicalBackground}</p>
          </div>
        </TabsContent>
      )}
      
      {hasSignificance && (
        <TabsContent value="significance" className="mt-0">
          <div className="prose prose-lg max-w-none">
            <h2>Cultural Significance</h2>
            <p>{item.culturalSignificance}</p>
          </div>
        </TabsContent>
      )}
      
      {hasRelevance && (
        <TabsContent value="relevance" className="mt-0">
          <div className="prose prose-lg max-w-none">
            <h2>Modern Relevance</h2>
            <p>{item.modernRelevance}</p>
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
};

export default ItemDetailTabs;
