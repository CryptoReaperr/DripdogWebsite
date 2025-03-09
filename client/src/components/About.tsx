import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, fadeInUp, staggerChildren } from '../styles/animations';

const About: React.FC = () => {
  const features = [
    {
      icon: 'fas fa-bolt',
      title: 'Meme Power',
      description: 'Backed by the strongest meme game in the Solana ecosystem. We don\'t just make memes, we live them.',
    },
    {
      icon: 'fas fa-users',
      title: 'Community First',
      description: 'A vibrant community of DripDog believers who share, create, and grow the ecosystem together.',
    },
    {
      icon: 'fas fa-rocket',
      title: 'No Utility, Just Vibes',
      description: 'We\'re not trying to solve world problems. We\'re here for good times, community spirit, and legendary returns.',
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Solana Based',
      description: 'Built on Solana for lightning-fast, low-cost transactions so you can buy, trade, and transfer with ease.',
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Moon Potential',
      description: 'With a growing community and strong meme foundation, $DRIP is positioned for legendary growth.',
    },
    {
      icon: 'fas fa-lock',
      title: 'Rug-Proof',
      description: '100% of the liquidity is locked. The only way is up, no rugs in our house. Street cred maintained.',
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-['Archivo_Black'] text-white mb-4">
            About <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">$DRIP</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-['Inter']">
            The ultimate meme coin experience on Solana with swagger and street cred.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerChildren}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-black bg-opacity-70 backdrop-blur-xl rounded-2xl p-8 transform transition-all hover:scale-105 border border-white border-opacity-10"
              variants={fadeIn}
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-orange-500 text-4xl mb-4">
                <i className={feature.icon}></i>
              </div>
              <h3 className="text-2xl font-['Archivo_Black'] text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 font-['Inter']">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
