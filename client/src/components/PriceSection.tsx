import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, fadeInUp, staggerChildren } from '../styles/animations';
import { useAppContext } from '../context/AppContext';

const PriceSection: React.FC = () => {
  const { price } = useAppContext();
  const [activeTab, setActiveTab] = useState('birdeye');

  const priceItems = [
    { label: '$DRIP/USDC', value: price.current, change: price.change },
    { label: '24h Volume', value: price.volume },
    { label: 'Market Cap', value: price.marketCap },
    { label: 'Holders', value: price.holders },
    { label: 'Circulating Supply', value: price.circulatingSupply },
  ];

  const chartResources = [
    {
      name: 'Birdeye',
      icon: 'fas fa-chart-bar',
      description: 'View detailed token analytics',
      url: 'https://birdeye.so/',
    },
    {
      name: 'DexScreener',
      icon: 'fas fa-search-dollar',
      description: 'Track trading pairs & liquidity',
      url: 'https://dexscreener.com/',
    },
    {
      name: 'DexTools',
      icon: 'fas fa-tools',
      description: 'Advanced trading tools & info',
      url: 'https://www.dextools.io/',
    },
  ];

  return (
    <section id="price" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-['Archivo_Black'] text-white mb-4">
            Live <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">Price & Charts</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-['Inter']">
            Real-time data from the top DEX platforms. Stay updated with the latest $DRIP price movements.
          </p>
        </motion.div>
        
        {/* Price Ticker Bar */}
        <motion.div 
          className="bg-black bg-opacity-70 backdrop-blur-xl rounded-xl p-4 mb-12 overflow-hidden border border-white border-opacity-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="overflow-hidden">
            <motion.div 
              className="flex items-center space-x-16 whitespace-nowrap"
              animate={{ 
                x: [100, -1500, 100],
              }}
              transition={{ 
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...priceItems, ...priceItems].map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-gray-400 mr-2">{item.label}:</span>
                  <span className="text-white font-bold">{item.value}</span>
                  {item.change && <span className="text-green-400 ml-2">{item.change}</span>}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        
        {/* Chart Tabs */}
        <motion.div 
          className="bg-black bg-opacity-70 backdrop-blur-xl rounded-2xl p-6 mb-12 border border-white border-opacity-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="flex flex-wrap border-b border-gray-700 mb-6">
            <button 
              className={`px-6 py-3 font-bold ${activeTab === 'birdeye' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400 hover:text-white transition'}`}
              onClick={() => setActiveTab('birdeye')}
            >
              Birdeye
            </button>
            <button 
              className={`px-6 py-3 font-bold ${activeTab === 'dexscreener' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400 hover:text-white transition'}`}
              onClick={() => setActiveTab('dexscreener')}
            >
              DexScreener
            </button>
            <button 
              className={`px-6 py-3 font-bold ${activeTab === 'dextools' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400 hover:text-white transition'}`}
              onClick={() => setActiveTab('dextools')}
            >
              DexTools
            </button>
          </div>
          
          {/* Chart Placeholder */}
          <div className="aspect-video bg-black rounded-xl overflow-hidden relative border border-gray-800">
            <div className="absolute inset-0 flex items-center justify-center">
              {activeTab === 'birdeye' && (
                <div className="text-center">
                  <div className="w-full h-80 bg-gradient-to-r from-black to-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <motion.i 
                        className="fas fa-chart-line text-6xl text-orange-500 mb-4"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <p className="text-xl text-gray-300">Live Price Chart</p>
                      <p className="text-sm text-gray-500">Birdeye chart widget</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'dexscreener' && (
                <div className="text-center">
                  <div className="w-full h-80 bg-gradient-to-r from-black to-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <motion.i 
                        className="fas fa-search-dollar text-6xl text-orange-500 mb-4"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <p className="text-xl text-gray-300">Live Price Chart</p>
                      <p className="text-sm text-gray-500">DexScreener chart widget</p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'dextools' && (
                <div className="text-center">
                  <div className="w-full h-80 bg-gradient-to-r from-black to-gray-900 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <motion.i 
                        className="fas fa-tools text-6xl text-orange-500 mb-4"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <p className="text-xl text-gray-300">Live Price Chart</p>
                      <p className="text-sm text-gray-500">DexTools chart widget</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Additional Chart Resources */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
        >
          {chartResources.map((resource, index) => (
            <motion.a 
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black bg-opacity-70 backdrop-blur-xl rounded-xl p-6 flex items-center transition-all hover:scale-105 border border-white border-opacity-10"
              variants={fadeIn}
              whileHover={{ y: -5 }}
            >
              <i className={`${resource.icon} text-orange-500 text-3xl mr-4`}></i>
              <div>
                <h3 className="text-xl font-['Archivo_Black'] text-white">{resource.name}</h3>
                <p className="text-gray-400">{resource.description}</p>
              </div>
              <i className="fas fa-external-link-alt ml-auto text-gray-400"></i>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PriceSection;
