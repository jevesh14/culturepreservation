
import { useState } from 'react';
import { MessageCircle, X, SendHorizontal, Mic } from 'lucide-react';

const ChatWithAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, you would send this message to an AI service
      console.log("Sending message:", message);
      setMessage('');
    }
  };

  const suggestions = [
    "Tell me about Indian classical dance forms",
    "What are the major festivals of India?",
    "Explain the significance of Ramayana",
    "Show me traditional Indian art styles"
  ];

  return (
    <>
      {/* Chat Button */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-cultural-saffron to-cultural-maroon text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            <span className="ml-2 font-medium hidden md:inline">Chat with AI</span>
          </>
        )}
      </button>
      
      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-cultural-saffron/20 overflow-hidden z-40 animate-scale-in">
          <div className="bg-gradient-to-r from-cultural-saffron to-cultural-maroon p-4 text-white">
            <h3 className="font-bold">Cultural Knowledge Assistant</h3>
            <p className="text-sm opacity-90">Ask me anything about Indian culture and heritage</p>
          </div>
          
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {/* AI Welcome Message */}
            <div className="flex items-start mb-4">
              <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
                <p className="text-sm">
                  नमस्ते! Welcome to Bharat Cultural Hub! How can I help you explore Indian culture today?
                </p>
              </div>
            </div>
            
            {/* Suggested Questions */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button 
                    key={index} 
                    className="bg-white text-xs py-1.5 px-3 rounded-full border border-cultural-saffron/30 text-gray-700 hover:bg-cultural-saffron/10 transition-colors"
                    onClick={() => setMessage(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <button 
                type="button" 
                className="text-gray-400 hover:text-cultural-saffron"
                aria-label="Voice input"
              >
                <Mic className="h-5 w-5" />
              </button>
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-cultural-saffron focus:ring-1 focus:ring-cultural-saffron/20"
                placeholder="Type your question here..."
              />
              <button 
                type="submit" 
                className={`rounded-full p-2 ${message.trim() ? 'bg-cultural-saffron text-white' : 'bg-gray-200 text-gray-400'}`}
                disabled={!message.trim()}
                aria-label="Send message"
              >
                <SendHorizontal className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWithAI;
