import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, fadeInLeft, fadeInRight, staggerChildren } from '../styles/animations';
import DripDogLogo from '../assets/DripDogLogo';

const TelegramBot: React.FC = () => {
  const botCommands = [
    { 
      command: '/price', 
      description: 'Get the latest $DRIP price',
      color: 'bg-orange-500 bg-opacity-20',
      textColor: 'text-orange-500'
    },
    { 
      command: '/meme', 
      description: 'Generate a fresh DripDog meme',
      color: 'bg-purple-600 bg-opacity-20',
      textColor: 'text-purple-500'
    },
    { 
      command: '/buy', 
      description: 'Instructions to buy $DRIP',
      color: 'bg-blue-400 bg-opacity-20',
      textColor: 'text-blue-400'
    },
    { 
      command: '/stats', 
      description: 'View current token statistics',
      color: 'bg-green-500 bg-opacity-20',
      textColor: 'text-green-500'
    },
  ];

  const botFeatures = [
    {
      icon: 'fas fa-chart-pie',
      title: 'Real-time Price Updates',
      description: 'Get instant price information with detailed charts and market data.'
    },
    {
      icon: 'fas fa-images',
      title: 'AI Meme Generator',
      description: 'Generate custom DripDog memes with our advanced AI technology.'
    },
    {
      icon: 'fas fa-bell',
      title: 'Alerts & Notifications',
      description: 'Set custom price alerts and get notified about important events.'
    }
  ];

  return (
    <section id="bot" className="py-20 relative bg-black">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="flex flex-col lg:flex-row items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
        >
          <motion.div 
            className="lg:w-1/2 mb-12 lg:mb-0"
            variants={fadeInLeft}
          >
            <motion.div 
              className="bg-black bg-opacity-70 backdrop-blur-xl rounded-2xl p-6 md:p-10 max-w-lg mx-auto lg:mx-0 transform transition-all hover:scale-105 border border-white border-opacity-10"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-6">
                <DripDogLogo width={64} height={64} className="rounded-full border-2 border-orange-500" />
                <div className="ml-4">
                  <h3 className="text-xl font-['Archivo_Black'] text-white">@dripdogbot</h3>
                  <p className="text-gray-400 font-['Inter']">Telegram Bot</p>
                </div>
              </div>
              
              <div className="mb-6 bg-black bg-opacity-50 rounded-lg p-4 border border-gray-700">
                <p className="text-white font-['Inter']">Hey DripFam! What can I do for you today? Try one of these commands:</p>
              </div>
              
              {/* Bot Commands */}
              <div className="space-y-3 mb-6">
                {botCommands.map((cmd, index) => (
                  <motion.div 
                    key={index}
                    className={`${cmd.color} rounded-lg p-3 transform transition-all`}
                    whileHover={{ x: 10 }}
                  >
                    <p className={`${cmd.textColor} font-mono`}>{cmd.command}</p>
                    <p className="text-sm text-gray-300">{cmd.description}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Try the bot */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Try a command here..." 
                  className="bg-black border border-gray-700 text-white rounded-full px-6 py-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white rounded-full h-10 w-10 flex items-center justify-center hover:bg-opacity-80 transition">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            variants={fadeInRight}
          >
            <h2 className="text-4xl md:text-5xl font-['Archivo_Black'] text-white mb-6">
              Meet The <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">@dripdogbot</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 font-['Inter']">
              Your personal assistant in the DripDog universe. Get price updates, memes, and connect with the community – all from your Telegram!
            </p>
            
            <motion.div 
              className="space-y-6 mb-8"
              variants={staggerChildren}
            >
              {botFeatures.map((feature, index) => (
                <motion.div key={index} className="flex items-start" variants={fadeIn}>
                  <div className="text-orange-500 text-2xl mt-1 mr-4">
                    <i className={feature.icon}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-['Archivo_Black'] text-white mb-1">{feature.title}</h3>
                    <p className="text-gray-300 font-['Inter']">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.a 
              href="https://t.me/dripdogbot" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-500 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-opacity-80 transition shadow-[0_0_15px_rgba(255,126,0,0.7)] hover:shadow-[0_0_25px_rgba(255,126,0,0.9)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <i className="fab fa-telegram mr-2"></i> Launch Bot on Telegram
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TelegramBot;
