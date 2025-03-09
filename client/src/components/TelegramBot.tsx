import React from 'react';
import { motion } from 'framer-motion';
import DripDogLogo from '../assets/DripDogLogo';
import { useAppContext } from '../context/AppContext';

const TelegramBot: React.FC = () => {
  const { partyMode } = useAppContext();
  
  // Fun reasons to join the Telegram
  const portalFeatures = [
    {
      title: "Community Vibes",
      description: "Join fellow DripDog holders - it's like a digital dog park but with memes",
      emoji: "👥",
      color: "from-yellow-400 to-yellow-500"
    },
    {
      title: "Price Alerts",
      description: "Be the first to know when $DRIP is mooning (or barking at the moon)",
      emoji: "📈",
      color: "from-green-400 to-green-500"
    },
    {
      title: "Exclusive Content",
      description: "Access fresh DripDog memes that'll make even your cat person friends laugh",
      emoji: "🔥",
      color: "from-orange-400 to-red-500"
    }
  ];

  return (
    <section id="bot" className="py-16 relative bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Join the <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">Telegram Portal</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Where DripDog enthusiasts gather to share memes, track prices, and unleash the power of community
          </p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row items-center gap-8 max-w-5xl mx-auto">
          {/* Telegram Preview */}
          <motion.div 
            className="lg:w-1/2 w-full mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              className="bg-black bg-opacity-70 backdrop-blur-sm rounded-2xl p-5 border border-yellow-400 border-opacity-20 shadow-lg relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              {/* Portal effect - animated gradient border */}
              <div className="absolute inset-0 p-[2px] rounded-2xl overflow-hidden pointer-events-none">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 opacity-50"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    repeatType: 'mirror' 
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                />
              </div>
              
              {/* Header */}
              <div className="flex items-center mb-5 border-b border-gray-800 pb-4 relative z-10">
                <DripDogLogo width={48} height={48} className="rounded-full border-2 border-yellow-400" />
                <div className="ml-3">
                  <h3 className="text-xl font-bold text-white">DripDog Portal</h3>
                  <div className="flex items-center">
                    <span className="h-2 w-2 bg-green-500 rounded-full inline-block mr-2"></span>
                    <p className="text-gray-400 text-sm">10,432 members online</p>
                  </div>
                </div>
              </div>
              
              {/* Portal Preview */}
              <div className="relative z-10 mb-6">
                <motion.div 
                  className="aspect-w-16 aspect-h-9 bg-gray-900 rounded-lg overflow-hidden mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="text-8xl"
                      animate={partyMode ? { 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 0.9, 1]
                      } : {}}
                      transition={partyMode ? { 
                        repeat: Infinity, 
                        duration: 3
                      } : {}}
                    >
                      🐕
                    </motion.div>
                    
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.7 }}
                    />
                    
                    <motion.div 
                      className="absolute bottom-4 left-0 right-0 text-center"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <span className="font-bold text-white text-xl">Enter the Portal</span>
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Quick message preview */}
                <div className="flex items-center space-x-3 mb-3 bg-black bg-opacity-50 p-3 rounded-lg">
                  <span className="text-2xl">💬</span>
                  <div className="flex-1">
                    <div className="text-white font-medium">Latest community chat</div>
                    <p className="text-gray-400 text-sm">$DRIP is up 42.0% today! LFG! 🚀</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 bg-black bg-opacity-50 p-3 rounded-lg">
                  <span className="text-2xl">🤖</span>
                  <div className="flex-1">
                    <div className="text-white font-medium">DripBot</div>
                    <p className="text-gray-400 text-sm">Join now to access price alerts and DripDog memes</p>
                  </div>
                </div>
              </div>
              
              {/* Portal Button */}
              <motion.a
                href="https://t.me/NBT_portal"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-3 rounded-xl text-center font-bold text-lg relative z-10 shadow-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                animate={partyMode ? {
                  y: [0, -3, 0],
                  boxShadow: ['0 0 10px rgba(253,224,71,0.4)', '0 0 20px rgba(253,224,71,0.6)', '0 0 10px rgba(253,224,71,0.4)']
                } : {}}
                transition={partyMode ? { repeat: Infinity, duration: 2 } : {}}
              >
                <i className="fas fa-door-open mr-2"></i> Enter the Portal
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Community Benefits */}
          <motion.div 
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-5">
              {portalFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-black bg-opacity-60 rounded-xl p-5 border border-yellow-400 border-opacity-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.15) }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                >
                  <div className="flex items-start">
                    <motion.div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl flex-shrink-0`}
                      animate={partyMode ? { rotate: [0, 10, -10, 0] } : {}}
                      transition={partyMode ? { repeat: Infinity, duration: 3 } : {}}
                    >
                      {feature.emoji}
                    </motion.div>
                    <div className="ml-4">
                      <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                      <p className="text-gray-300 mt-1">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Community Quote */}
              <motion.div
                className="mt-6 p-4 rounded-xl bg-black bg-opacity-50 border border-yellow-400 border-opacity-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-3">
                  <span className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-gray-300 italic">
                  "The DripDog Telegram is where I found my crypto family. We laugh, we cry (mostly when we see those green candles), and we meme our way to the moon."
                </p>
                <p className="text-right text-yellow-400 mt-2 text-sm">- Loyal DripDog Fan</p>
              </motion.div>
              
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <a
                  href="https://t.me/NBT_portal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-yellow-400 font-medium"
                >
                  <span className="mr-2">Join 10,000+ others in the community</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TelegramBot;
