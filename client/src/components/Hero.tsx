import React from 'react';
import { motion } from 'framer-motion';
import DripDogChar from '../assets/DripDogChar';
import { fadeIn, fadeInUp, staggerChildren } from '../styles/animations';

const Hero: React.FC = () => {
  const handleScrollToBot = (e: React.MouseEvent) => {
    e.preventDefault();
    const botSection = document.querySelector('#bot');
    if (botSection) {
      botSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-16 -right-16 w-64 h-64 bg-purple-600 opacity-20 rounded-full filter blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-1/4 -left-24 w-80 h-80 bg-orange-500 opacity-20 rounded-full filter blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-10 w-72 h-72 bg-blue-400 opacity-10 rounded-full filter blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
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
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-['Archivo_Black'] text-white leading-tight mb-4">
              Not Just A <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">Meme Coin.</span><br />
              A <span className="text-orange-500">Lifestyle.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0 font-['Inter']">
              The Solana meme coin with <span className="font-['Permanent_Marker'] text-orange-500">street cred</span>. No utility, just straight-up <span className="font-['Permanent_Marker'] text-orange-500">vibes</span> & community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.a
                href="https://jup.ag/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-opacity-80 transition shadow-[0_0_15px_rgba(255,126,0,0.7)] hover:shadow-[0_0_25px_rgba(255,126,0,0.9)] hover:-translate-y-0.5 w-full sm:w-auto text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Buy $DRIP
              </motion.a>
              <motion.a
                href="#bot"
                className="bg-black bg-opacity-70 backdrop-blur-xl text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white hover:bg-opacity-10 transition w-full sm:w-auto text-center border border-white border-opacity-10"
                onClick={handleScrollToBot}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Try The Bot
              </motion.a>
            </div>
            
            {/* Token Stats */}
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start mt-12 gap-6"
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="bg-black bg-opacity-70 backdrop-blur-xl p-4 rounded-xl border border-white border-opacity-10"
                variants={fadeIn}
              >
                <p className="text-gray-400 text-sm">Market Cap</p>
                <p className="font-['Archivo_Black'] text-2xl text-white">$4.2M</p>
              </motion.div>
              <motion.div 
                className="bg-black bg-opacity-70 backdrop-blur-xl p-4 rounded-xl border border-white border-opacity-10"
                variants={fadeIn}
              >
                <p className="text-gray-400 text-sm">Holders</p>
                <p className="font-['Archivo_Black'] text-2xl text-white">12,420</p>
              </motion.div>
              <motion.div 
                className="bg-black bg-opacity-70 backdrop-blur-xl p-4 rounded-xl relative overflow-hidden border border-white border-opacity-10"
                variants={fadeIn}
              >
                <motion.div 
                  className="absolute -right-2 -bottom-2 w-12 h-12 bg-green-400 opacity-30 rounded-full filter blur-md"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <p className="text-gray-400 text-sm">24h Change</p>
                <p className="font-['Archivo_Black'] text-2xl text-green-400">+69.4%</p>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 relative"
            variants={fadeIn}
          >
            {/* Custom DripDog character */}
            <DripDogChar className="w-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
