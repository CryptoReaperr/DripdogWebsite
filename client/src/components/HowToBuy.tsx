import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const HowToBuy: React.FC = () => {
  const { tokenAddress, copyToClipboard, copySuccess, partyMode } = useAppContext();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Simplify to just 3 steps with fun, engaging content
  const steps = [
    {
      emoji: "👛",
      title: "Get SOL Ready",
      description: "Install Phantom wallet & load it with some SOL. It's like getting dog treats ready!",
      link: { name: "Phantom", url: "https://phantom.app/", icon: "fas fa-ghost" }
    },
    {
      emoji: "🔄",
      title: "Swap for $DRIP", 
      description: "Go to Jupiter, paste our address, swap SOL for $DRIP. As simple as teaching a dog to sit!",
      link: { name: "Jupiter", url: `https://jup.ag/swap/SOL-${tokenAddress}`, icon: "fas fa-random" }
    },
    {
      emoji: "🚀",
      title: "HODL & Join",
      description: "Hold your $DRIP and join our Telegram. We don't bite, we just go to the moon!",
      link: { name: "Telegram", url: "https://t.me/NBT_portal", icon: "fab fa-telegram-plane" }
    }
  ];

  // Function to handle copying with visual feedback
  const handleCopyToken = () => {
    copyToClipboard(tokenAddress);
    
    if (partyMode) {
      // Create confetti effect when copying in party mode
      for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.innerText = ['🎉', '💧', '🐕', '💰', '✨'][Math.floor(Math.random() * 5)];
        confetti.style.position = 'fixed';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `${Math.random() * 100}vh`;
        confetti.style.fontSize = '24px';
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none';
        document.body.appendChild(confetti);
        
        // Animation
        confetti.animate([
          { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
          { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
          duration: 2000,
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        // Remove after animation
        setTimeout(() => {
          document.body.removeChild(confetti);
        }, 2000);
      }
    }
  };

  return (
    <section id="buy" className="py-20 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 right-0 w-full h-full bg-black opacity-90"
          animate={{ opacity: 0.9 }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            How to <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">Grab Some $DRIP</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Three simple steps to join the pack! So easy even your grandma could do it (if she's cool).
          </p>
        </motion.div>
        
        {/* Token Card - Most Important Part */}
        <motion.div
          className="max-w-md mx-auto mb-12 bg-black bg-opacity-60 backdrop-blur-sm p-5 rounded-2xl border border-yellow-400 border-opacity-30 shadow-[0_0_15px_rgba(250,204,21,0.15)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ 
            boxShadow: "0 0 25px rgba(253, 224, 71, 0.3)",
            scale: 1.02
          }}
        >
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🔗</span>
              <h3 className="text-xl text-white font-bold">$DRIP Token Address</h3>
            </div>
            
            <AnimatePresence>
              {copySuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-green-500 bg-opacity-20 text-green-400 text-sm px-3 py-1 rounded-full"
                >
                  <i className="fas fa-check mr-1"></i> Copied!
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-yellow-400 hover:text-yellow-300 bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm"
                  onClick={handleCopyToken}
                >
                  <i className="fas fa-copy mr-1"></i> Copy
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          
          <div 
            className="bg-black bg-opacity-60 p-3 rounded-lg border border-yellow-400 border-opacity-20 cursor-pointer font-mono text-xs break-all text-gray-300"
            onClick={handleCopyToken}
          >
            {tokenAddress}
          </div>
          
          <div className="mt-4 flex justify-around">
            <motion.a
              href={`https://jup.ag/swap/SOL-${tokenAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-yellow-400 hover:text-yellow-300 text-sm"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <i className="fas fa-exchange-alt mr-1"></i> Jupiter
            </motion.a>
            
            <motion.a
              href={`https://pump.fun/token/${tokenAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-yellow-400 hover:text-yellow-300 text-sm"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <i className="fas fa-rocket mr-1"></i> Pump.fun
            </motion.a>
            
            <motion.a
              href={`https://solscan.io/token/${tokenAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-yellow-400 hover:text-yellow-300 text-sm"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <i className="fas fa-search mr-1"></i> Solscan
            </motion.a>
          </div>
        </motion.div>
        
        {/* Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-black bg-opacity-60 backdrop-blur-sm rounded-2xl overflow-hidden border border-yellow-400 border-opacity-20"
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                borderColor: "rgba(253, 224, 71, 0.5)" 
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              onHoverStart={() => setHoveredStep(index)}
              onHoverEnd={() => setHoveredStep(null)}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl shadow-lg"
                    animate={partyMode ? { 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 0.9, 1] 
                    } : {}}
                    transition={partyMode ? { repeat: Infinity, duration: 3 } : {}}
                  >
                    {step.emoji}
                  </motion.div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <div className="h-1 w-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 min-h-[80px]">{step.description}</p>
                
                <motion.a
                  href={step.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-black bg-opacity-50 hover:bg-opacity-70 text-yellow-400 px-4 py-2 rounded-full text-sm font-bold transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`${step.link.icon} mr-2`}></i>
                  {step.link.name}
                </motion.a>
              </div>
              
              {/* Floating particles on hover */}
              <AnimatePresence>
                {hoveredStep === index && partyMode && (
                  <>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-lg pointer-events-none"
                        initial={{ 
                          x: 50 + Math.random() * 100, 
                          y: 50 + Math.random() * 100,
                          opacity: 0
                        }}
                        animate={{ 
                          x: 20 + Math.random() * 150, 
                          y: Math.random() * 100,
                          opacity: [0, 1, 0],
                          rotate: [0, 360]
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                          duration: 1.5 + Math.random(),
                          ease: "easeInOut" 
                        }}
                      >
                        {step.emoji}
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.a
            href={`https://jup.ag/swap/SOL-${tokenAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-4 rounded-full text-lg font-bold shadow-[0_0_15px_rgba(250,204,21,0.4)]"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            animate={partyMode ? {
              y: [0, -5, 0],
              boxShadow: ['0 0 15px rgba(250,204,21,0.4)', '0 0 25px rgba(250,204,21,0.7)', '0 0 15px rgba(250,204,21,0.4)']
            } : {}}
            transition={partyMode ? { repeat: Infinity, duration: 2 } : {}}
          >
            <i className="fas fa-bolt mr-2"></i> Buy $DRIP Now
          </motion.a>
          
          <p className="text-gray-400 mt-4 italic max-w-lg mx-auto text-sm">
            "I bought $DRIP and now I'm so rich, my dog has a dog." - Some Random Internet Guy, Probably
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToBuy;
