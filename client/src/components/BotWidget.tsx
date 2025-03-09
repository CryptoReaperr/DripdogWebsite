import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DripDogLogo from '../assets/DripDogLogo';

const BotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      content: "Hey there! I'm DripDog Bot. How can I help you today?"
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const closeWidget = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages([...messages, { sender: 'user', content: inputValue }]);
    
    // Simulate bot response
    const userInput = inputValue.toLowerCase();
    setInputValue('');
    
    setTimeout(() => {
      let response = "I'm not sure how to respond to that. Try asking about the price, how to buy $DRIP, or request a meme!";
      
      if (userInput.includes('price')) {
        response = "Current $DRIP price:\n$0.00421 (+69.4%)\nUpdated 2 minutes ago";
      } else if (userInput.includes('buy') || userInput.includes('how to')) {
        response = "To buy $DRIP:\n1. Get a Solana wallet (Phantom, Solflare)\n2. Get some SOL\n3. Go to Jupiter or Raydium\n4. Swap SOL for $DRIP";
      } else if (userInput.includes('meme')) {
        response = "Here's a fresh DripDog meme for you! [DripDog meme]";
      }
      
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', content: response }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <motion.button 
        className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        onClick={toggleWidget}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className="fab fa-telegram-plane text-white text-3xl"></i>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute bottom-20 right-0 w-80"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-black bg-opacity-70 backdrop-blur-xl rounded-2xl overflow-hidden border border-white border-opacity-10">
              <div className="bg-orange-500 px-4 py-3 flex items-center">
                <DripDogLogo width={40} height={40} className="rounded-full border-2 border-white" />
                <div className="ml-3">
                  <h3 className="text-white font-['Archivo_Black']">@dripdogbot</h3>
                  <p className="text-white text-opacity-80 text-sm">Online now</p>
                </div>
                <button 
                  onClick={closeWidget} 
                  className="ml-auto text-white hover:text-black transition"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="p-4 max-h-80 overflow-y-auto bg-black">
                <div className="flex flex-col space-y-4">
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex items-start ${message.sender === 'user' ? 'justify-end' : ''}`}
                    >
                      {message.sender === 'bot' && (
                        <DripDogLogo width={32} height={32} className="rounded-full mr-2" />
                      )}
                      <div 
                        className={`${
                          message.sender === 'bot' 
                            ? 'bg-gray-800 rounded-lg rounded-tl-none' 
                            : 'bg-orange-500 rounded-lg rounded-tr-none'
                        } p-3 max-w-[80%] whitespace-pre-line`}
                      >
                        <p className="text-white text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-700 bg-black">
                <form onSubmit={handleSubmit} className="relative">
                  <input 
                    type="text" 
                    placeholder="Type a message..." 
                    className="bg-gray-800 border border-gray-700 text-white rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-white transition"
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BotWidget;
