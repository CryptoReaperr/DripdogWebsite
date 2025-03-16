import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import RealDripDog from '../assets/RealDripDog';
import { fadeIn, fadeInUp, staggerChildren } from '../styles/animations';
import { useAppContext } from '../context/AppContext';

const Hero: React.FC = () => {
  const { 
    partyMode, 
    togglePartyMode, 
    price, 
    tokenAddress, 
    copyToClipboard,
    adminContent 
  } = useAppContext();
  
  const [showCopied, setShowCopied] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const controls = useAnimation();
  const doggoControls = useAnimation();

  // Dog animations
  useEffect(() => {
    if (partyMode) {
      doggoControls.start({
        rotate: [0, -5, 5, -5, 0],
        scale: [1, 1.05, 0.95, 1.05, 1],
        transition: { duration: 1.5, repeat: Infinity }
      });
    } else {
      doggoControls.start({
        y: [0, -10, 0],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      });
    }
  }, [partyMode, doggoControls]);

  // Fun dog quotes that change
  const dogQuotes = [
    { text: "I'm not just cute, I'm $DRIP-ping with potential!", emoji: "💧" },
    { text: "Woof! Let's make this pawsome!", emoji: "🐾" },
    { text: "Got treats? I accept $DRIP!", emoji: "🦴" },
    { text: "Moon? Nah, we're going to Mars!", emoji: "🚀" },
    { text: "My bark is worse than the dip!", emoji: "📈" },
    { text: "You had me at woof...", emoji: "❤️" },
    { text: "Copy my address! I won't bite!", emoji: "📋" }
  ];
  
  // Change quotes periodically with longer interval (20 seconds)
  useEffect(() => {
    // Add initial delay before starting to cycle quotes
    const initialDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentQuote(prev => (prev + 1) % dogQuotes.length);
      }, 20000);
      
      // Clean up interval when component unmounts
      return () => clearInterval(interval);
    }, 20000);
    
    // Clean up timeout when component unmounts
    return () => clearTimeout(initialDelay);
  }, []);
  
  // Custom copy to clipboard with visual feedback
  const handleCopy = () => {
    copyToClipboard(tokenAddress);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
    
    // Bonus animation when copying
    controls.start({
      opacity: 1, 
      y: 0,
      scale: [1, 1.1, 1]
    });
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center pt-10 pb-20 overflow-hidden px-4">
      {/* Animated Background - simplified but fun */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400 opacity-10 rounded-full filter blur-3xl"
          animate={{ 
            y: [0, 50, 0],
            scale: partyMode ? [1, 1.1, 0.9, 1] : [1, 1.05, 1]
          }}
          transition={{ 
            y: { duration: 15, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: partyMode ? 5 : 10, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500 opacity-10 rounded-full filter blur-3xl"
          animate={{ 
            y: [0, -50, 0],
            scale: partyMode ? [1, 0.9, 1.1, 1] : [1, 1.05, 1]
          }}
          transition={{ 
            y: { duration: 20, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: partyMode ? 5 : 10, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>
      
      {/* Party Mode Active Effects */}
      {partyMode && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: -30,
                opacity: 0,
                rotate: Math.random() * 360
              }}
              animate={{ 
                y: window.innerHeight + 30,
                opacity: [0, 1, 0],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 20
              }}
            >
              {['💧', '🐕', '💰', '🚀', '✨'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}
      
      <div className="container mx-auto max-w-6xl z-10 flex flex-col items-center">
        {/* Dog Character - Main Focus */}
        <motion.div
          className="relative mb-6 pt-10"
          animate={doggoControls}
        >
          <RealDripDog className="mx-auto" width={220} height={220} animated={true} />
          
          {/* Speech Bubble */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              className="absolute -top-8 right-0 sm:right-[-50px] bg-white text-black font-bold py-3 px-5 rounded-xl max-w-xs text-center shadow-lg"
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -bottom-2 left-10 w-4 h-4 bg-white transform rotate-45"></div>
              {dogQuotes[currentQuote].text} {dogQuotes[currentQuote].emoji}
            </motion.div>
          </AnimatePresence>
          
          {/* Floating Elements */}
          <motion.div 
            className="absolute top-1/3 -left-4 sm:-left-10"
            animate={{ 
              y: [0, -10, 0],
              rotate: partyMode ? [0, 360] : 0 
            }}
            transition={{ 
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 3, repeat: Infinity }
            }}
          >
            <span className="text-3xl">💧</span>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-0 right-0 sm:right-5"
            animate={{ 
              y: [0, 10, 0],
              rotate: partyMode ? [0, -360] : 0
            }}
            transition={{ 
              y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 3, repeat: Infinity }
            }}
          >
            <span className="text-3xl">🔥</span>
          </motion.div>
        </motion.div>
        
        {/* Main Title */}
        <motion.h1 
          className="text-5xl sm:text-7xl font-bold text-center text-white mb-4 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {adminContent.hero ? (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
              {adminContent.hero.title}
            </span>
          ) : (
            <><span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">$DRIP</span>DOG</>
          )}
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-300 text-center mb-8 max-w-md px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {adminContent.hero ? adminContent.hero.description : "No utility. No roadmap. Just a fluffy boi with swagger. The memest dog coin on Solana."}
        </motion.p>
        
        {/* Stats Pills */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div 
            className="bg-black bg-opacity-50 backdrop-blur-sm px-5 py-2 rounded-full border border-yellow-400 border-opacity-30 flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xl mr-2">📈</span>
            <span className="text-white font-mono">{price.current}</span>
          </motion.div>
          
          <motion.div 
            className="bg-black bg-opacity-50 backdrop-blur-sm px-5 py-2 rounded-full border border-yellow-400 border-opacity-30 flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xl mr-2">🚀</span>
            <span className="text-green-400 font-mono">{price.change}</span>
          </motion.div>
          
          <motion.div 
            className="bg-black bg-opacity-50 backdrop-blur-sm px-5 py-2 rounded-full border border-yellow-400 border-opacity-30 flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xl mr-2">👥</span>
            <span className="text-white font-mono">{price.holders} holders</span>
          </motion.div>
        </motion.div>
        
        {/* Token Address Card */}
        <motion.div
          className="w-full max-w-lg mx-auto mb-8 bg-black bg-opacity-50 backdrop-blur-sm p-4 rounded-2xl border border-yellow-400 border-opacity-20"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.3 }}
          onClick={handleCopy}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className="text-xl mr-2">📋</span>
              <h3 className="text-white font-bold">Token Address</h3>
            </div>
            
            <AnimatePresence>
              {showCopied ? (
                <motion.span 
                  className="text-green-400 text-sm bg-black bg-opacity-50 rounded-full px-2 py-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  Copied! ✓
                </motion.span>
              ) : (
                <motion.button
                  className="text-yellow-400 hover:text-yellow-300 flex items-center bg-black bg-opacity-50 rounded-full px-2 py-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  Copy <i className="fas fa-copy ml-1"></i>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          
          <p className="text-gray-300 font-mono text-xs break-all cursor-pointer bg-black bg-opacity-50 p-3 rounded-lg">
            {tokenAddress}
          </p>
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.a
            href={adminContent.hero?.buttonUrl || `https://jup.ag/swap/SOL-${tokenAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-opacity-90 shadow-[0_0_15px_rgba(250,204,21,0.4)] w-full sm:w-auto text-center"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            animate={partyMode ? {
              y: [0, -5, 0],
              boxShadow: ['0 0 15px rgba(250,204,21,0.4)', '0 0 25px rgba(250,204,21,0.7)', '0 0 15px rgba(250,204,21,0.4)']
            } : {}}
            transition={partyMode ? { repeat: Infinity, duration: 2 } : {}}
          >
            <i className="fas fa-shopping-cart mr-2"></i> {adminContent.hero?.buttonText || "Buy $DRIP"}
          </motion.a>
          
          <motion.a
            href="https://t.me/NBT_portal"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black bg-opacity-70 backdrop-blur-xl text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:bg-opacity-10 w-full sm:w-auto text-center border border-yellow-400 border-opacity-20"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fab fa-telegram mr-2"></i> Join Telegram
          </motion.a>
        </motion.div>

        {/* Party Mode Toggle */}
        <motion.button
          className="mt-6 px-5 py-2 bg-black bg-opacity-50 text-white rounded-full font-bold text-sm flex items-center justify-center mx-auto border border-yellow-400 border-opacity-30"
          onClick={togglePartyMode}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <span className="mr-2">{partyMode ? "Chill Mode" : "Party Mode"}</span>
          <i className={`fas ${partyMode ? "fa-moon" : "fa-sun"}`}></i>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
