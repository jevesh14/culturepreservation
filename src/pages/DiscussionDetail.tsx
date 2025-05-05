
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Textarea } from '../components/ui/textarea';
import ChatWithAI from '../components/ChatWithAI';

const DiscussionDetail = () => {
  const { id } = useParams();
  const [comment, setComment] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <Link to="/discussion" className="inline-flex items-center text-gray-600 hover:text-cultural-saffron mb-6">
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to discussions</span>
          </Link>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Discussion #{id}</h1>
            
            <div className="py-6 border-t border-b my-6">
              <p className="text-gray-600">
                This is a placeholder for the discussion content. Real discussion data needs to be added here.
              </p>
            </div>
            
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-gray-500 text-center">No comments yet for this discussion.</p>
            </div>
            
            <div className="mt-8">
              <h3 className="font-medium mb-2">Add your comment</h3>
              <Textarea
                placeholder="Write your thoughts..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mb-3 min-h-[100px]"
              />
              <button 
                className="px-4 py-2 bg-cultural-saffron text-white rounded-lg hover:bg-cultural-saffron/90 transition-colors"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ChatWithAI />
    </div>
  );
};

export default DiscussionDetail;
