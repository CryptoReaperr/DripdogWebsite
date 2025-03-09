import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, fadeInUp, staggerChildren } from '../styles/animations';
import { useAppContext } from '../context/AppContext';

const Footer: React.FC = () => {
  const { partyMode } = useAppContext();
  
  const quickLinks = [
    { name: '🐕 About', href: '#about' },
    { name: '🤖 Bot', href: '#bot' },
    { name: '💰 Buy $DRIP', href: '#buy' },
  ];

  const socialLinks = [
    { platform: 'telegram', url: 'https://t.me/dripdogcoin', icon: 'fab fa-telegram-plane', color: 'text-[#0088cc]' },
    { platform: 'telegram-portal', url: 'https://t.me/NBT_portal', icon: 'fas fa-door-open', color: 'text-[#0088cc]' },
    { platform: 'twitter', url: 'https://twitter.com/DripDogSolana', icon: 'fab fa-twitter', color: 'text-[#1DA1F2]' },
    { platform: 'discord', url: 'https://discord.gg/dripdog', icon: 'fab fa-discord', color: 'text-[#5865F2]' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-10 bg-black relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="flex flex-col items-center mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.a 
            href="#hero" 
            className="mb-6"
            variants={fadeIn}
            onClick={(e) => handleScrollTo(e, '#hero')}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-3xl font-['Archivo_Black'] text-white">DRIP<span className="text-yellow-400">DOG</span></span>
          </motion.a>
          
          {/* Portal Button - Prominently displayed */}
          <motion.a
            href="https://t.me/NBT_portal"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3 rounded-full font-bold flex items-center shadow-[0_0_15px_rgba(253,224,71,0.4)]"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            animate={partyMode ? {
              y: [0, -3, 0],
              rotate: [-1, 1, -1]
            } : {}}
            transition={partyMode ? { repeat: Infinity, duration: 2 } : {}}
          >
            <i className="fas fa-door-open mr-2"></i> 
            Enter the Telegram Portal
          </motion.a>
          
          {/* Social Links */}
          <motion.div 
            className="flex space-x-6 mb-6"
            variants={fadeIn}
          >
            {socialLinks.map((link, index) => (
              <motion.a 
                key={index}
                href={link.url} 
                target="_blank"
                rel="noopener noreferrer"
                className={`${link.color} transition`}
                whileHover={{ scale: 1.2, rotate: partyMode ? [0, 10, -10] : 5 }}
                transition={{
                  rotate: partyMode ? { repeat: Infinity, duration: 0.5 } : {}
                }}
              >
                <i className={`${link.icon} text-3xl`}></i>
              </motion.a>
            ))}
          </motion.div>
          
          {/* Quick Links */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-6"
            variants={fadeIn}
          >
            {quickLinks.map((link, index) => (
              <motion.a 
                key={index}
                href={link.href} 
                className="text-gray-300 hover:text-yellow-400 transition text-lg"
                onClick={(e) => handleScrollTo(e, link.href)}
                whileHover={{ scale: 1.1 }}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="border-t border-gray-800 mt-6 pt-6 flex flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <motion.div 
            className="bg-black bg-opacity-70 backdrop-blur-xl p-4 rounded-xl max-w-xl text-center border border-yellow-400 border-opacity-20 mb-6"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-gray-400 text-sm">
              $DRIP is just a fluffy meme coin with no utility besides being adorable. 
              This is not financial advice. DripDog lives for the memes. 
              <span className="block mt-1">WOOF WOOF! 🐕💧</span>
            </p>
          </motion.div>
          
          <p className="text-gray-500">&copy; {new Date().getFullYear()} DripDog. Much rights. Very reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
