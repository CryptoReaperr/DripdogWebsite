import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, fadeInUp, staggerChildren } from '../styles/animations';
import { useAppContext } from '../context/AppContext';

const HowToBuy: React.FC = () => {
  const { tokenAddress, copyToClipboard, copySuccess } = useAppContext();

  const steps = [
    {
      number: 1,
      title: 'Get a Solana Wallet',
      description: 'Download and set up a Solana-compatible wallet like Phantom, Solflare, or Backpack.',
      links: [
        { name: 'Phantom', url: 'https://phantom.app/', icon: 'fas fa-ghost', color: 'bg-[#4B19CA] bg-opacity-30' },
        { name: 'Solflare', url: 'https://solflare.com/', icon: 'fas fa-sun', color: 'bg-[#FC9022] bg-opacity-30' },
        { name: 'Backpack', url: 'https://www.backpack.app/', icon: 'fas fa-suitcase', color: 'bg-[#2277ff] bg-opacity-30' },
      ]
    },
    {
      number: 2,
      title: 'Get SOL',
      description: 'Purchase SOL from an exchange and transfer it to your Solana wallet.',
      links: [
        { name: 'Coinbase', url: 'https://www.coinbase.com/', icon: 'fas fa-exchange-alt', color: 'bg-[#0052FF] bg-opacity-30' },
        { name: 'Binance', url: 'https://www.binance.com/', icon: 'fas fa-exchange-alt', color: 'bg-[#F0B90B] bg-opacity-30' },
        { name: 'Kraken', url: 'https://www.kraken.com/', icon: 'fas fa-exchange-alt', color: 'bg-[#5741D9] bg-opacity-30' },
      ]
    },
    {
      number: 3,
      title: 'Use a DEX',
      description: 'Connect your wallet to a Solana DEX and swap SOL for $DRIP.',
      links: [
        { name: 'Raydium', url: 'https://raydium.io/swap/', icon: 'fas fa-random', color: 'bg-[#3AEAFF] bg-opacity-30' },
        { name: 'Jupiter', url: 'https://jup.ag/', icon: 'fas fa-random', color: 'bg-[#FF7A45] bg-opacity-30' },
        { name: 'Orca', url: 'https://www.orca.so/', icon: 'fas fa-random', color: 'bg-[#7C44F6] bg-opacity-30' },
      ]
    },
    {
      number: 4,
      title: 'Swap for $DRIP',
      description: 'Enter the $DRIP token address, set your slippage to 1%, and confirm the swap.',
      tokenAddress: true,
    },
  ];

  return (
    <section id="buy" className="py-20 relative bg-black">
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop')] bg-cover bg-center"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-['Archivo_Black'] text-white mb-4">
            How to <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">Buy $DRIP</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-['Inter']">
            Follow these simple steps to join the DripDog family and secure your bag.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
          >
            {steps.map((step) => (
              <motion.div 
                key={step.number}
                className="flex flex-col md:flex-row items-center mb-16"
                variants={fadeIn}
              >
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <motion.div 
                    className="bg-black bg-opacity-70 backdrop-blur-xl w-24 h-24 rounded-full flex items-center justify-center mx-auto border border-white border-opacity-10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className="text-5xl font-['Archivo_Black'] text-orange-500">{step.number}</span>
                  </motion.div>
                </div>
                <div className="md:w-2/3 bg-black bg-opacity-70 backdrop-blur-xl rounded-2xl p-6 border border-white border-opacity-10">
                  <h3 className="text-2xl font-['Archivo_Black'] text-white mb-3">{step.title}</h3>
                  <p className="text-gray-300 mb-4 font-['Inter']">{step.description}</p>
                  
                  {step.links && (
                    <div className="flex flex-wrap gap-4">
                      {step.links.map((link, index) => (
                        <a 
                          key={index}
                          href={link.url} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${link.color} px-4 py-2 rounded-lg text-white flex items-center hover:bg-opacity-50 transition`}
                        >
                          <i className={`${link.icon} mr-2`}></i> {link.name}
                        </a>
                      ))}
                    </div>
                  )}
                  
                  {step.tokenAddress && (
                    <>
                      <div className="bg-black p-4 rounded-lg border border-orange-500 border-dashed mb-4">
                        <p className="font-mono text-sm text-white break-all select-all">{tokenAddress}</p>
                      </div>
                      <div className="flex justify-center">
                        <motion.button 
                          className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-opacity-80 transition shadow-[0_0_15px_rgba(255,126,0,0.7)]"
                          onClick={() => copyToClipboard(tokenAddress)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <i className={`${copySuccess ? 'fas fa-check' : 'fas fa-copy'} mr-2`}></i> 
                          {copySuccess ? 'Copied!' : 'Copy Token Address'}
                        </motion.button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Quick Buy Button */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.a 
              href="https://jup.ag/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-500 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-opacity-80 transition shadow-[0_0_15px_rgba(255,126,0,0.7)] hover:shadow-[0_0_25px_rgba(255,126,0,0.9)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-bolt mr-2"></i> Quick Buy on Jupiter
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowToBuy;
