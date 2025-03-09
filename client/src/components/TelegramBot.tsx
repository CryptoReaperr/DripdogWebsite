import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, fadeInLeft, fadeInRight, staggerChildren } from '../styles/animations';
import DripDogLogo from '../assets/DripDogLogo';
import { useAppContext } from '../context/AppContext';

const TelegramBot: React.FC = () => {
  const { partyMode } = useAppContext();
  
  const botCommands = [
    { 
      command: '/woof', 
      description: 'Get a randomized dog bark',
      emoji: '🐶',
      color: 'bg-yellow-400 bg-opacity-20',
      textColor: 'text-yellow-400'
    },
    { 
      command: '/meme', 
      description: 'Get dank DripDog memes',
      emoji: '🤣',
      color: 'bg-purple-600 bg-opacity-20',
      textColor: 'text-purple-500'
    },
    { 
      command: '/price', 
      description: 'Latest $DRIP price info',
      emoji: '💰',
      color: 'bg-green-500 bg-opacity-20',
      textColor: 'text-green-500'
    },
    { 
      command: '/party', 
      description: 'Start the DripDog party',
      emoji: '🎉',
      color: 'bg-blue-400 bg-opacity-20',
      textColor: 'text-blue-400'
    },
  ];

  // Speech bubbles for chat simulation
  const chatMessages = [
    "What's the price looking like?",
    "/price",
    "$DRIP is at $0.00421 (+69.4% in 24h) 🚀",
    "To the mooooooon! 🌕",
    "/meme",
    "Here's your fresh DripDog meme 🤣"
  ];

  return (
    <section id="bot" className="py-16 relative bg-black">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-yellow-900"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInLeft}
        >
          <h2 className="text-4xl md:text-5xl font-['Archivo_Black'] text-white mb-4">
            DripDog <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">Telegram Bot</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your fluffy companion in the Telegram world. Check prices, get memes, and join the pack!
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
        >
          {/* Bot Chat Simulation */}
          <motion.div 
            className="lg:w-1/2 w-full mb-12 lg:mb-0"
            variants={fadeInLeft}
          >
            <motion.div 
              className="bg-black bg-opacity-80 backdrop-blur-xl rounded-2xl p-6 md:p-6 border border-yellow-400 border-opacity-20 shadow-lg"
              whileHover={{ scale: 1.02 }}
              animate={partyMode ? { 
                y: [0, -5, 0],
                boxShadow: ['0 0 10px rgba(253,224,71,0.2)', '0 0 20px rgba(253,224,71,0.4)', '0 0 10px rgba(253,224,71,0.2)']
              } : {}}
              transition={partyMode ? { repeat: Infinity, duration: 3 } : {}}
            >
              <div className="flex items-center mb-6 border-b border-gray-800 pb-4">
                <DripDogLogo width={50} height={50} className="rounded-full border-2 border-yellow-400" />
                <div className="ml-4">
                  <h3 className="text-xl font-['Archivo_Black'] text-white">@DripBot</h3>
                  <div className="flex items-center">
                    <span className="h-2 w-2 bg-green-500 rounded-full inline-block mr-2"></span>
                    <p className="text-gray-400 text-sm">Online now</p>
                  </div>
                </div>
                
                <motion.a 
                  href="https://t.me/NBT_portal" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-door-open mr-1"></i> 
                  Portal
                </motion.a>
              </div>
              
              {/* Chat Messages */}
              <div className="space-y-4 mb-5 min-h-[200px] overflow-y-auto p-2">
                {chatMessages.map((msg, index) => {
                  const isBot = index % 2 === 1 || index === 2 || index === 5;
                  const isCommand = msg.startsWith('/');
                  
                  return (
                    <motion.div 
                      key={index}
                      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          isBot 
                            ? isCommand 
                              ? 'bg-yellow-400 text-black font-mono'
                              : 'bg-gray-800 text-white' 
                            : 'bg-yellow-400 bg-opacity-90 text-black'
                        }`}
                      >
                        {msg}
                        {(index === 5) && (
                          <motion.div 
                            className="mt-2 rounded-lg overflow-hidden w-48 h-48 bg-gray-900"
                            animate={partyMode ? { rotate: [-2, 2, -2] } : {}}
                            transition={partyMode ? { repeat: Infinity, duration: 2 } : {}}
                          >
                            <img 
                              src="https://i.imgur.com/JPLEeVX.jpg" 
                              alt="DripDog Meme" 
                              className="w-full h-full object-cover" 
                            />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Message Input */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Type a command like /woof..." 
                  className="bg-black bg-opacity-60 border border-yellow-400 border-opacity-30 text-white rounded-full px-6 py-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <motion.button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-black rounded-full h-10 w-10 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fas fa-paper-plane"></i>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Bot Commands & Call to Action */}
          <motion.div 
            className="lg:w-1/2 w-full text-center lg:text-left"
            variants={fadeInRight}
          >
            <h3 className="text-2xl font-['Archivo_Black'] text-white mb-6">
              Fun Commands to Try
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {botCommands.map((cmd, index) => (
                <motion.div 
                  key={index}
                  className={`${cmd.color} rounded-xl p-4 border border-white border-opacity-10 flex items-center`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  animate={partyMode ? { y: [0, -5, 0] } : {}}
                  transition={partyMode ? { 
                    y: { repeat: Infinity, duration: 2, delay: index * 0.2 } 
                  } : {}}
                >
                  <span className="text-3xl mr-3">{cmd.emoji}</span>
                  <div>
                    <p className={`${cmd.textColor} font-mono font-bold`}>{cmd.command}</p>
                    <p className="text-sm text-gray-300">{cmd.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center lg:text-left">
              <motion.a 
                href="https://t.me/NBT_portal" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-opacity-90 transition shadow-[0_0_15px_rgba(253,224,71,0.4)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={partyMode ? {
                  y: [0, -5, 0],
                  boxShadow: ['0 0 15px rgba(253,224,71,0.4)', '0 0 25px rgba(253,224,71,0.7)', '0 0 15px rgba(253,224,71,0.4)']
                } : {}}
                transition={partyMode ? { repeat: Infinity, duration: 2 } : {}}
              >
                <i className="fas fa-dog mr-2"></i> Join DripDog Community
              </motion.a>
              
              <p className="text-gray-400 mt-6">
                Join our Telegram to access the bot, discuss $DRIP, and hang with the coolest community in crypto!
              </p>
              
              {/* Testimonial */}
              <motion.div 
                className="mt-8 bg-black bg-opacity-60 p-4 rounded-xl border border-yellow-400 border-opacity-20 relative"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-3">
                  <span className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</span>
                  <span className="ml-2 text-white">Much wow!</span>
                </div>
                <p className="text-gray-300 italic">
                  "This bot is so dank, it's literally the only reason I check my phone anymore. DripDog memes are life."
                </p>
                <p className="text-right text-yellow-400 mt-2 text-sm">- Anonymous Degen</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TelegramBot;
