import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, fadeInLeft, fadeInRight, fadeInUp, staggerChildren } from '../styles/animations';

const Roadmap: React.FC = () => {
  const phases = [
    {
      phase: 'Phase 1: The Birth',
      status: 'Completed',
      statusColor: 'bg-orange-500',
      icon: 'fas fa-check',
      items: [
        'Token launch and initial liquidity',
        'Website launch (version 1.0)',
        'Community building on Telegram and Twitter',
        'DripDog bot development and launch',
      ],
      align: 'right',
    },
    {
      phase: 'Phase 2: The Glow Up',
      status: 'In Progress',
      statusColor: 'bg-orange-500',
      icon: 'fas fa-check',
      items: [
        'Website 2.0 with enhanced features',
        '5,000+ holder milestone',
        'Meme contest platform launch',
        'Partnerships with influencers and projects',
        'AI meme generator integration',
      ],
      align: 'left',
    },
    {
      phase: 'Phase 3: The Takeover',
      status: 'Coming Soon',
      statusColor: 'bg-gray-600',
      icon: 'fas fa-ellipsis-h',
      items: [
        'Major exchange listings',
        '10,000+ holder milestone',
        'DripDog merchandise store',
        'Community treasury for events and giveaways',
        'Cross-chain expansion opportunities',
      ],
      align: 'right',
    },
    {
      phase: 'Phase 4: The Legend',
      status: 'Future',
      statusColor: 'bg-gray-600',
      icon: 'fas fa-question',
      items: [
        'DripDog becomes a global meme phenomenon',
        '50,000+ holder community',
        'Advanced ecosystem expansion',
        'Real-world events and meetups',
        '??? (Secret plans to be revealed)',
      ],
      align: 'left',
    },
  ];

  return (
    <section id="roadmap" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-['Archivo_Black'] text-white mb-4">
            The <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">$Dripmap</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-['Inter']">
            Our journey to dominate the meme coin world and take $DRIP to legendary status.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Roadmap line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-orange-500 bg-opacity-30 transform md:translate-x-[-50%] z-0"></div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
          >
            {phases.map((phase, index) => (
              <motion.div 
                key={index}
                className="relative z-10 flex flex-col md:flex-row items-center md:items-start mb-16"
                variants={fadeIn}
              >
                {/* Left Content - for right-aligned phases */}
                {phase.align === 'right' && (
                  <motion.div 
                    className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0"
                    variants={fadeInLeft}
                  >
                    <motion.div 
                      className="bg-black bg-opacity-70 backdrop-blur-xl rounded-2xl p-6 transform transition-all hover:scale-105 border border-white border-opacity-10"
                      whileHover={{ scale: 1.03 }}
                    >
                      <span className={`inline-block ${phase.statusColor} text-white px-3 py-1 rounded-full text-sm font-bold mb-3`}>{phase.status}</span>
                      <h3 className="text-2xl font-['Archivo_Black'] text-white mb-3">{phase.phase}</h3>
                      <ul className="text-gray-300 space-y-2 list-inside list-disc font-['Inter'] md:list-outside md:ml-4">
                        {phase.items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Circle Indicator */}
                <motion.div 
                  className={`w-10 h-10 ${phase.statusColor} rounded-full flex items-center justify-center border-4 border-black z-20`}
                  whileHover={{ scale: 1.2 }}
                >
                  <i className={`${phase.icon} text-white`}></i>
                </motion.div>
                
                {/* Right Content for left-aligned phases */}
                {phase.align === 'right' ? (
                  <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
                ) : (
                  <motion.div 
                    className="md:w-1/2 md:pl-12 mb-8 md:mb-0"
                    variants={fadeInRight}
                  >
                    <motion.div 
                      className="bg-black bg-opacity-70 backdrop-blur-xl rounded-2xl p-6 transform transition-all hover:scale-105 border border-white border-opacity-10"
                      whileHover={{ scale: 1.03 }}
                    >
                      <span className={`inline-block ${phase.statusColor} text-white px-3 py-1 rounded-full text-sm font-bold mb-3`}>{phase.status}</span>
                      <h3 className="text-2xl font-['Archivo_Black'] text-white mb-3">{phase.phase}</h3>
                      <ul className="text-gray-300 space-y-2 list-inside list-disc font-['Inter']">
                        {phase.items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                )}
                
                {/* For mobile view - to handle left-aligned phases */}
                {phase.align === 'left' && (
                  <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
