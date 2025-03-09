import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import RealDripDog from '../assets/RealDripDog';
import { fadeIn, fadeInUp, staggerChildren } from '../styles/animations';
import { useAppContext } from '../context/AppContext';

const Hero: React.FC = () => {
  const { 
    partyMode, 
    togglePartyMode, 
    price, 
    tokenAddress, 
    copyToClipboard 
  } = useAppContext();
  
  const controls = useAnimation();
  const textControls = useAnimation();
  
  useEffect(() => {
    if (partyMode) {
      // Trigger chaotic animations
      controls.start({
        x: [0, -20, 15, -10, 0],
        y: [0, 15, -20, 10, 0],
        transition: { duration: 0.6, ease: "easeInOut" }
      });
      textControls.start({
        scale: [1, 1.2, 0.9, 1.1, 1],
        rotate: [0, -2, 3, -1, 0],
        transition: { duration: 0.5 }
      });
    } else {
      controls.start({ x: 0, y: 0 });
      textControls.start({ scale: 1, rotate: 0 });
    }
  }, [partyMode, controls, textControls]);

  const handleScrollToBot = (e: React.MouseEvent) => {
    e.preventDefault();
    const botSection = document.querySelector('#bot');
    if (botSection) {
      botSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const dogPhrases = [
    "Much wow!",
    "Such gains!",
    "Very moon!",
    "Woof woof!",
    "So drippy!",
    "Buy the dip!",
    "To the moon!"
  ];
  
  const randomPhrase = () => {
    return dogPhrases[Math.floor(Math.random() * dogPhrases.length)];
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Elements - more chaotic and fun */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-16 -right-16 w-64 h-64 bg-yellow-400 opacity-20 rounded-full filter blur-3xl"
          animate={{ 
            rotate: 360,
            scale: partyMode ? [1, 1.2, 0.9, 1.3, 1] : 1
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div 
          className="absolute top-1/4 -left-24 w-80 h-80 bg-orange-500 opacity-20 rounded-full filter blur-3xl"
          animate={{ 
            rotate: 360,
            scale: partyMode ? [1, 0.8, 1.1, 0.9, 1] : 1
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-10 w-72 h-72 bg-orange-300 opacity-15 rounded-full filter blur-3xl"
          animate={{ 
            rotate: 360,
            x: partyMode ? [0, 50, -30, 20, 0] : 0,
            y: partyMode ? [0, -30, 20, -10, 0] : 0
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            x: { duration: 8, repeat: Infinity },
            y: { duration: 10, repeat: Infinity }
          }}
        />
      </div>
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        <motion.div 
          className="flex flex-col lg:flex-row items-center"
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
            variants={fadeInUp}
            animate={textControls}
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-['Archivo_Black'] text-white leading-tight mb-4"
              animate={controls}
            >
              Not Just A <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">Fluffy Boi.</span><br />
              A <span className="text-yellow-400">Legend.</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0 font-['Inter']"
              animate={controls}
            >
              The cutest meme coin on Solana with <span className="font-['Permanent_Marker'] text-yellow-400">maximum fluff</span>. No utility, just <span className="font-['Permanent_Marker'] text-orange-500">swagger</span> & pure vibes.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.a
                href={`https://jup.ag/swap/SOL-${tokenAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 text-black px-10 py-4 rounded-full text-lg font-bold hover:bg-opacity-80 transition shadow-[0_0_15px_rgba(250,204,21,0.7)] hover:shadow-[0_0_25px_rgba(250,204,21,0.9)] hover:-translate-y-0.5 w-full sm:w-auto text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-bone mr-2"></i> Get $DRIP
              </motion.a>
              <motion.a
                href="#bot"
                className="bg-black bg-opacity-70 backdrop-blur-xl text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white hover:bg-opacity-10 transition w-full sm:w-auto text-center border border-white border-opacity-10"
                onClick={handleScrollToBot}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-paw mr-2"></i> Try The Bot
              </motion.a>
            </div>

            {/* Party Mode Toggle */}
            <motion.button
              className="mt-6 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black rounded-full font-bold text-sm flex items-center justify-center mx-auto lg:mx-0"
              onClick={togglePartyMode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{partyMode ? "Chill Mode" : "Party Mode"}</span>
              <i className={`fas ${partyMode ? "fa-moon" : "fa-sun"}`}></i>
            </motion.button>
            
            {/* Token Stats - stylized and playful */}
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start mt-8 gap-4"
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="bg-black bg-opacity-70 backdrop-blur-xl p-4 rounded-xl border border-yellow-400 border-opacity-30 transform rotate-1"
                variants={fadeIn}
                whileHover={{ rotate: 0, scale: 1.05 }}
              >
                <div className="flex items-center">
                  <i className="fas fa-chart-line text-yellow-400 mr-2"></i>
                  <p className="text-gray-400 text-sm">Market Cap</p>
                </div>
                <p className="font-['Archivo_Black'] text-2xl text-white">{price.marketCap}</p>
              </motion.div>
              
              <motion.div 
                className="bg-black bg-opacity-70 backdrop-blur-xl p-4 rounded-xl border border-yellow-400 border-opacity-30 transform -rotate-1"
                variants={fadeIn}
                whileHover={{ rotate: 0, scale: 1.05 }}
              >
                <div className="flex items-center">
                  <i className="fas fa-users text-yellow-400 mr-2"></i>
                  <p className="text-gray-400 text-sm">Holders</p>
                </div>
                <p className="font-['Archivo_Black'] text-2xl text-white">{price.holders}</p>
              </motion.div>
              
              <motion.div 
                className="bg-black bg-opacity-70 backdrop-blur-xl p-4 rounded-xl relative overflow-hidden border border-yellow-400 border-opacity-30 transform rotate-1"
                variants={fadeIn}
                whileHover={{ rotate: 0, scale: 1.05 }}
              >
                <motion.div 
                  className="absolute -right-2 -bottom-2 w-12 h-12 bg-green-400 opacity-30 rounded-full filter blur-md"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <div className="flex items-center">
                  <i className="fas fa-rocket text-green-400 mr-2"></i>
                  <p className="text-gray-400 text-sm">24h Change</p>
                </div>
                <p className="font-['Archivo_Black'] text-2xl text-green-400">{price.change}</p>
              </motion.div>
            </motion.div>
            
            {/* Token Address */}
            <motion.div
              className="mt-8 p-4 bg-black bg-opacity-50 backdrop-blur-xl rounded-xl border border-yellow-400 border-opacity-20 transform hover:scale-105 transition-transform"
              whileHover={{ y: -5 }}
              onClick={() => copyToClipboard(tokenAddress)}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-white font-bold">Token Address:</p>
                <motion.button
                  className="text-yellow-400 hover:text-yellow-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fas fa-copy"></i>
                </motion.button>
              </div>
              <p className="text-gray-300 font-mono text-xs break-all cursor-pointer"
                 onClick={() => copyToClipboard(tokenAddress)}>
                {tokenAddress}
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 relative"
            variants={fadeIn}
            animate={controls}
          >
            {/* Real DripDog character */}
            <div className="relative">
              <RealDripDog className="mx-auto" width={300} height={300} animated={true} />
              
              {/* Speech bubble */}
              <motion.div
                className="absolute -top-10 right-10 bg-white text-black font-bold py-2 px-4 rounded-xl transform -rotate-6"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0],
                  rotate: [-6, 6, -3, 6, -6]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white transform rotate-45"></div>
                {randomPhrase()}
              </motion.div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute top-10 -left-6 w-16 h-16 flex items-center justify-center"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: partyMode ? [0, 360] : [0, 0]
                }}
                transition={{ 
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 2, repeat: Infinity }
                }}
              >
                <span className="text-3xl">💧</span>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-10 right-0 w-16 h-16 flex items-center justify-center"
                animate={{ 
                  y: [0, 15, 0],
                  x: partyMode ? [0, 20, 0, -20, 0] : [0, 0],
                  rotate: partyMode ? [0, -360] : [0, 0]
                }}
                transition={{ 
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: 5, repeat: Infinity },
                  rotate: { duration: 3, repeat: Infinity }
                }}
              >
                <span className="text-3xl">🔥</span>
              </motion.div>
              
              <motion.div 
                className="absolute top-1/3 -right-10 w-16 h-16 flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: partyMode ? [0, 360] : [0, 0]
                }}
                transition={{ 
                  scale: { duration: 2, repeat: Infinity },
                  rotate: { duration: 2, repeat: Infinity }
                }}
              >
                <span className="text-3xl">💰</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
