import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const HowToBuy: React.FC = () => {
  const { tokenAddress, copyToClipboard, copySuccess, partyMode } = useAppContext();

  // Super simple steps with humor
  const steps = [
    {
      emoji: "👛",
      title: "Get a Wallet",
      description: "Download Phantom wallet, add some SOL. No wallet, no $DRIP. Simple math.",
      link: { name: "Get Phantom", url: "https://phantom.app/", icon: "fas fa-ghost" }
    },
    {
      emoji: "🔄",
      title: "Buy $DRIP", 
      description: "Copy our token address, head to Jupiter, swap SOL for $DRIP. Click. Approve. Done.",
      link: { name: "Buy on Jupiter", url: `https://jup.ag/swap/SOL-${tokenAddress}`, icon: "fas fa-exchange-alt" }
    },
    {
      emoji: "💬",
      title: "Join Us",
      description: "Enter our Telegram portal. We're like a family, but you can actually choose to join.",
      link: { name: "Telegram Portal", url: "https://t.me/NBT_portal", icon: "fab fa-telegram-plane" }
    }
  ];

  // Function to handle copying with visual feedback
  const handleCopyToken = () => {
    copyToClipboard(tokenAddress);
    
    if (partyMode) {
      // Create a simpler confetti effect
      for (let i = 0; i < 10; i++) {
        const confetti = document.createElement('div');
        confetti.innerText = ['💧', '🐕'][Math.floor(Math.random() * 2)];
        confetti.style.position = 'fixed';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `${Math.random() * 100}vh`;
        confetti.style.fontSize = '24px';
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none';
        document.body.appendChild(confetti);
        
        // Simple animation
        confetti.animate([
          { transform: 'translate(0, 0)', opacity: 1 },
          { transform: `translate(0, ${Math.random() * 100 + 50}px)`, opacity: 0 }
        ], {
          duration: 1500,
          easing: 'ease-out'
        });
        
        // Remove after animation
        setTimeout(() => {
          document.body.removeChild(confetti);
        }, 1500);
      }
    }
  };

  return (
    <section id="buy" className="py-16 relative bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-white mb-3">
            Get Your <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">$DRIP</span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            So easy a cat person could do it (and that's saying something).
          </p>
        </motion.div>
        
        {/* Token Address - The Most Important Part */}
        <motion.div
          className="max-w-sm mx-auto mb-10 bg-black bg-opacity-70 p-4 rounded-xl border border-yellow-400 border-opacity-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleCopyToken}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="text-xl mr-2">📋</span>
              <h3 className="text-white font-bold">Token Address</h3>
            </div>
            
            <AnimatePresence>
              {copySuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-green-400 text-sm bg-black bg-opacity-70 px-2 py-1 rounded-full"
                >
                  Copied! ✓
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-yellow-400 text-sm"
                >
                  <i className="fas fa-copy"></i> Copy
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          
          <p className="text-gray-300 font-mono text-xs break-all bg-black bg-opacity-60 p-2 rounded-lg cursor-pointer">
            {tokenAddress}
          </p>
        </motion.div>
        
        {/* Quick Links */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.a
            href={`https://jup.ag/swap/SOL-${tokenAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-bold shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-exchange-alt mr-2"></i> Buy on Jupiter
          </motion.a>
          <motion.a
            href="https://t.me/NBT_portal"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black border border-yellow-400 border-opacity-40 text-white px-6 py-2 rounded-full font-bold"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fab fa-telegram-plane mr-2"></i> Join Telegram
          </motion.a>
        </motion.div>
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-black bg-opacity-60 rounded-lg p-5 border border-yellow-400 border-opacity-20"
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <motion.div 
                className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl mb-3"
                animate={partyMode ? { rotate: [0, 10, -10, 0] } : {}}
                transition={partyMode ? { repeat: Infinity, duration: 3 } : {}}
              >
                {step.emoji}
              </motion.div>
              
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{step.description}</p>
              
              <motion.a
                href={step.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-yellow-400 text-sm font-medium"
                whileHover={{ x: 3 }}
              >
                <i className={`${step.link.icon} mr-1`}></i>
                {step.link.name} <i className="fas fa-arrow-right ml-1 text-xs"></i>
              </motion.a>
            </motion.div>
          ))}
        </div>
        
        {/* Fun Quote */}
        <motion.p
          className="text-center text-gray-400 italic max-w-md mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.6 }}
        >
          "The only thing I regret about buying $DRIP is not buying more."
          <br />— Your future self, probably
        </motion.p>
      </div>
    </section>
  );
};

export default HowToBuy;
