import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, fadeInUp, staggerChildren } from '../styles/animations';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'About $DRIP', href: '#about' },
    { name: 'Telegram Bot', href: '#bot' },
    { name: 'How to Buy', href: '#buy' },
    { name: '$Dripmap', href: '#roadmap' },
  ];

  const resources = [
    { name: 'Documentation', href: '#' },
    { name: 'Brand Assets', href: '#' },
    { name: 'Media Kit', href: '#' },
    { name: 'FAQs', href: '#' },
  ];

  const communityLinks = [
    { name: 'Meme Contest', href: '#' },
    { name: 'Events', href: '#' },
    { name: 'Partners', href: '#' },
    { name: 'Leaderboard', href: '#' },
  ];

  const socialLinks = [
    { platform: 'telegram', url: 'https://t.me/dripdogcoin', icon: 'fab fa-telegram-plane', color: '[#0088cc]' },
    { platform: 'twitter', url: 'https://twitter.com/DripDogSolana', icon: 'fab fa-twitter', color: '[#1DA1F2]' },
    { platform: 'discord', url: 'https://discord.gg/dripdog', icon: 'fab fa-discord', color: '[#5865F2]' },
    { platform: 'reddit', url: 'https://reddit.com/r/DripDogCoin', icon: 'fab fa-reddit-alien', color: '[#FF4500]' },
    { platform: 'medium', url: 'https://medium.com/@DripDogSolana', icon: 'fab fa-medium-m', color: '[#00AB6C]' },
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
          className="flex flex-col md:flex-row justify-between items-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <motion.a 
            href="#hero" 
            className="mb-6 md:mb-0"
            variants={fadeIn}
            onClick={(e) => handleScrollTo(e, '#hero')}
          >
            <span className="text-3xl font-['Archivo_Black'] text-white">DRIP<span className="text-orange-500">DOG</span></span>
          </motion.a>
          
          <motion.div 
            className="flex space-x-4"
            variants={fadeIn}
          >
            {socialLinks.map((link, index) => (
              <motion.a 
                key={index}
                href={link.url} 
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 hover:text-${link.color} transition`}
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                <i className={`${link.icon} text-2xl`}></i>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="border-t border-gray-800 pt-8 pb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-['Archivo_Black'] text-xl mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-orange-500 transition"
                      onClick={(e) => handleScrollTo(e, link.href)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-['Archivo_Black'] text-xl mb-4">Resources</h3>
              <ul className="space-y-2">
                {resources.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-orange-500 transition">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-['Archivo_Black'] text-xl mb-4">Community</h3>
              <ul className="space-y-2">
                {communityLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-orange-500 transition">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-['Archivo_Black'] text-xl mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Stay updated with the latest $DRIP news and events.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-black border border-gray-700 text-white rounded-full px-6 py-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white rounded-full h-9 w-9 flex items-center justify-center hover:bg-opacity-80 transition">
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="text-gray-500 mb-4 md:mb-0">&copy; {new Date().getFullYear()} DripDog. All rights reserved.</p>
          
          <motion.div 
            className="bg-black bg-opacity-70 backdrop-blur-xl p-4 rounded-xl max-w-2xl text-center border border-white border-opacity-10"
            whileHover={{ scale: 1.02 }}
          >
            <h4 className="text-white font-bold mb-2">Legal Disclaimer</h4>
            <p className="text-gray-400 text-sm">$DRIP is a meme coin with no intrinsic value or financial expectation. The token is purely for entertainment and community purposes. This is not financial advice. Always do your own research.</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
