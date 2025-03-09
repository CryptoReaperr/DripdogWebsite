import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, fadeInUp, staggerChildren } from '../styles/animations';
import { useAppContext } from '../context/AppContext';

const HowToBuy: React.FC = () => {
  const { tokenAddress, copyToClipboard, copySuccess, partyMode } = useAppContext();

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
        { name: 'Jupiter', url: `https://jup.ag/swap/SOL-${tokenAddress}`, icon: 'fas fa-random', color: 'bg-[#FF7A45] bg-opacity-30' },
        { name: 'Pump.fun', url: `https://pump.fun/token/${tokenAddress}`, icon: 'fas fa-rocket', color: 'bg-[#FF4500] bg-opacity-30' },
      ]
    },
    {
      number: 4,
      title: 'HODL to the Moon',
      description: 'Enter the $DRIP token address, set your slippage to 1%, and confirm the swap. Then share memes and join the community.',
      tokenAddress: true,
    },
  ];

  // Generate random emojis for party mode
  const partyEmojis = ['🚀', '💎', '🌕', '🔥', '💰', '🐶', '💧'];
  const getRandomEmoji = () => partyEmojis[Math.floor(Math.random() * partyEmojis.length)];

  return (
    <section id="buy" className="py-20 relative bg-black">
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-b from-black to-yellow-900 bg-cover bg-center"></div>
      </div>
      
      {/* Party mode floating elements */}
      {partyMode && (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl pointer-events-none z-10"
              initial={{ 
                x: Math.random() * 100, 
                y: Math.random() * 100,
                opacity: 0
              }}
              animate={{ 
                x: [
                  Math.random() * window.innerWidth, 
                  Math.random() * window.innerWidth, 
                  Math.random() * window.innerWidth
                ],
                y: [
                  Math.random() * window.innerHeight, 
                  Math.random() * window.innerHeight, 
                  Math.random() * window.innerHeight
                ],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 15 + Math.random() * 10,
                delay: Math.random() * 5
              }}
            >
              {getRandomEmoji()}
            </motion.div>
          ))}
        </>
      )}
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-['Archivo_Black'] text-white mb-4">
            How to <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">Buy $DRIP</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-['Inter']">
            Follow these simple steps to join the DripDog fam and secure your bag of fluffiness.
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
                    className="bg-black bg-opacity-70 backdrop-blur-xl w-24 h-24 rounded-full flex items-center justify-center mx-auto border border-yellow-400 border-opacity-30"
                    whileHover={{ scale: 1.1, rotate: partyMode ? [0, 10, -10, 0] : 5 }}
                    transition={{
                      rotate: partyMode ? { repeat: Infinity, duration: 0.5 } : {}
                    }}
                  >
                    <span className="text-5xl font-['Archivo_Black'] text-yellow-400">{step.number}</span>
                  </motion.div>
                </div>
                <div className="md:w-2/3 bg-black bg-opacity-70 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400 border-opacity-20 shadow-lg">
                  <h3 className="text-2xl font-['Archivo_Black'] text-white mb-3 flex items-center">
                    {step.title} 
                    {partyMode && <motion.span 
                      className="ml-2"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      {step.number === 4 ? '🌕' : '✨'}
                    </motion.span>}
                  </h3>
                  <p className="text-gray-300 mb-4 font-['Inter']">{step.description}</p>
                  
                  {step.links && (
                    <div className="flex flex-wrap gap-4">
                      {step.links.map((link, index) => (
                        <motion.a 
                          key={index}
                          href={link.url} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${link.color} px-4 py-2 rounded-lg text-white flex items-center hover:bg-opacity-50 transition`}
                          whileHover={{ 
                            scale: 1.05, 
                            y: partyMode ? [-2, 2, -2] : -2 
                          }}
                          transition={{
                            y: partyMode ? { repeat: Infinity, duration: 0.3 } : {}
                          }}
                        >
                          <i className={`${link.icon} mr-2`}></i> {link.name}
                        </motion.a>
                      ))}
                    </div>
                  )}
                  
                  {step.tokenAddress && (
                    <>
                      <motion.div 
                        className="bg-black p-4 rounded-lg border border-yellow-400 border-opacity-30 mb-4"
                        whileHover={{ 
                          boxShadow: "0 0 15px rgba(253, 224, 71, 0.3)",
                          borderColor: "rgba(253, 224, 71, 0.7)"
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-white font-bold">$DRIP Token Address:</p>
                          <motion.span 
                            className="text-yellow-400"
                            animate={partyMode ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            (tap to copy)
                          </motion.span>
                        </div>
                        <p 
                          className="font-mono text-sm text-white break-all select-all cursor-pointer"
                          onClick={() => copyToClipboard(tokenAddress)}
                        >
                          {tokenAddress}
                        </p>
                      </motion.div>
                      <div className="flex justify-center">
                        <motion.button 
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3 rounded-full font-bold hover:bg-opacity-80 transition shadow-[0_0_15px_rgba(253,224,71,0.4)]"
                          onClick={() => copyToClipboard(tokenAddress)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          animate={partyMode ? {
                            y: [0, -5, 0],
                            boxShadow: ['0 0 15px rgba(253,224,71,0.4)', '0 0 25px rgba(253,224,71,0.7)', '0 0 15px rgba(253,224,71,0.4)']
                          } : {}}
                          transition={partyMode ? { repeat: Infinity, duration: 2 } : {}}
                        >
                          <i className={`${copySuccess ? 'fas fa-check' : 'fas fa-copy'} mr-2`}></i> 
                          {copySuccess ? 'Copied to Clipboard!' : 'Copy Token Address'}
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
              href={`https://jup.ag/swap/SOL-${tokenAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-10 py-4 rounded-full text-lg font-bold hover:bg-opacity-80 transition shadow-[0_0_15px_rgba(253,224,71,0.7)] hover:shadow-[0_0_25px_rgba(253,224,71,0.9)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={partyMode ? {
                rotate: [-1, 1, -1],
                scale: [1, 1.02, 1]
              } : {}}
              transition={partyMode ? { repeat: Infinity, duration: 1.5 } : {}}
            >
              <i className="fas fa-bolt mr-2"></i> Quick Buy on Jupiter
            </motion.a>
            
            <motion.a 
              href={`https://solscan.io/token/${tokenAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black bg-opacity-70 backdrop-blur-xl text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white hover:bg-opacity-10 transition border border-yellow-400 border-opacity-20 mt-4 ml-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-search mr-2"></i> View on Solscan
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowToBuy;
