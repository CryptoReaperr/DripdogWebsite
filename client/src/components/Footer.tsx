import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const Footer: React.FC = () => {
  const { partyMode } = useAppContext();
  
  const socialLinks = [
    { url: 'https://t.me/NBT_portal', icon: 'fas fa-door-open', label: 'Telegram Portal' },
    { url: 'https://twitter.com/DripDogSolana', icon: 'fab fa-twitter', label: 'Twitter' },
    { url: 'https://solscan.io/token/rXKYBdFqtFuTbieQh2DBxuy6tCi8yDRY3h1kfwSpump', icon: 'fas fa-search', label: 'Solscan' },
  ];

  // Random dog facts - because why not?
  const dogFacts = [
    "Dogs have three eyelids. The third one helps keep their eyes moist.",
    "A dog's nose print is unique, much like a human's fingerprint.",
    "Dogs' sense of smell is up to 100,000 times stronger than humans'.",
    "$DRIP dogs can smell the moon from Earth. True story.",
    "DripDog has never seen utility, and he's proud of it!",
    "The world's tallest dog was a Great Dane that stood 44 inches tall.",
    "The richest dog in the world is worth over $500 million."
  ];
  
  const randomFact = dogFacts[Math.floor(Math.random() * dogFacts.length)];

  return (
    <footer className="py-8 bg-black bg-opacity-80">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <motion.div 
            className="mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-3xl font-bold text-white">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">$DRIP</span>DOG
            </div>
            <p className="text-gray-400 mt-1">The fluffiest meme on Solana</p>
          </motion.div>
          
          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black bg-opacity-60 text-yellow-400 hover:text-yellow-300 px-4 py-2 rounded-full flex items-center space-x-2 border border-yellow-400 border-opacity-20"
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  borderColor: "rgba(250, 204, 21, 0.5)"
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <i className={link.icon}></i>
                <span>{link.label}</span>
              </motion.a>
            ))}
          </div>
          
          {/* Random Dog Fact */}
          <motion.div
            className="mb-6 bg-black bg-opacity-50 p-4 rounded-xl border border-yellow-400 border-opacity-10 max-w-md text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-center mb-2">
              <span className="text-xl mr-2">🐕</span>
              <h3 className="text-yellow-400 font-medium">Random Dog Fact</h3>
            </div>
            <p className="text-gray-300 text-sm italic">{randomFact}</p>
          </motion.div>
        </div>
        
        {/* Disclaimer */}
        <motion.div
          className="text-center text-gray-500 text-xs mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5 }}
        >
          <p className="mb-1">$DRIP is a meme coin with no intrinsic value or financial expectation.</p>
          <p>Just vibes. No promises. Much wow. Such legal.</p>
          <p className="mt-4">&copy; {new Date().getFullYear()} DripDog</p>
        </motion.div>
        
        {/* Party Mode Mini Easter Egg */}
        {partyMode && (
          <motion.div 
            className="fixed bottom-4 right-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
            transition={{ 
              scale: { duration: 0.3 },
              rotate: { repeat: Infinity, duration: 2 }
            }}
          >
            <span className="text-4xl filter drop-shadow-lg">🦴</span>
          </motion.div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
