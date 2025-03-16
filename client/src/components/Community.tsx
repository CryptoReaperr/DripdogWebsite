import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, fadeInUp, staggerChildren } from '../styles/animations';

const Community: React.FC = () => {
  const socialLinks = [
    {
      name: 'Telegram',
      icon: 'fab fa-telegram-plane',
      iconColor: 'text-[#0088cc]',
      bgColor: 'bg-[#0088cc] bg-opacity-20',
      handle: 't.me/NBT_Portal',
      url: 'https://t.me/NBT_Portal',
    },
    {
      name: 'Twitter',
      icon: 'fab fa-twitter',
      iconColor: 'text-[#1DA1F2]',
      bgColor: 'bg-[#1DA1F2] bg-opacity-20',
      handle: '@DripDog_sol',
      url: 'https://x.com/DripDog_sol',
    },
  ];

  const memes = [
    {
      user: '@dripfan69',
      likes: '423',
      comments: '42',
    },
    {
      user: '@dripking',
      likes: '777',
      comments: '69',
    },
    {
      user: '@dripper420',
      likes: '555',
      comments: '21',
    },
  ];

  const stats = [
    { label: 'Telegram Members', value: '25K+' },
    { label: 'Twitter Followers', value: '12.4K+' },
    { label: 'Discord Members', value: '18K+' },
  ];

  return (
    <section id="community" className="py-20 relative bg-black">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
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
            Join The <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">Community</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-['Inter']">
            Connect with fellow DripDog enthusiasts and stay updated with the latest memes and news.
          </p>
        </motion.div>
        
        {/* Social Media Links */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerChildren}
        >
          {socialLinks.map((social, index) => (
            <motion.a 
              key={index}
              href={social.url} 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black bg-opacity-70 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center text-center transition-all hover:scale-105 border border-white border-opacity-10"
              variants={fadeIn}
              whileHover={{ y: -10 }}
            >
              <div className={`w-16 h-16 rounded-full ${social.bgColor} flex items-center justify-center mb-4`}>
                <i className={`${social.icon} text-3xl ${social.iconColor}`}></i>
              </div>
              <h3 className="text-xl font-['Archivo_Black'] text-white mb-2">{social.name}</h3>
              <p className="text-gray-400 font-['Inter']">Join our main community channel</p>
              <span className={`mt-4 ${social.iconColor} font-bold`}>{social.handle}</span>
            </motion.a>
          ))}
        </motion.div>
        
        {/* Meme Gallery */}
        <motion.div 
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h3 
            className="text-3xl font-['Archivo_Black'] text-white mb-8 text-center"
            variants={fadeInUp}
          >
            Latest <span className="text-orange-500">Memes</span>
          </motion.h3>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerChildren}
          >
            {memes.map((meme, index) => (
              <motion.div 
                key={index}
                className="bg-black bg-opacity-70 backdrop-blur-xl rounded-xl overflow-hidden transition-all hover:scale-105 border border-white border-opacity-10"
                variants={fadeIn}
                whileHover={{ y: -10 }}
              >
                {/* Placeholder for meme image */}
                <div className="w-full aspect-square bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 5 }}
                  >
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50 10C45 10 40 25 40 25L30 15L20 25C20 25 15 10 10 10C5 10 0 20 0 30C0 40 5 45 10 45C15 45 20 35 20 35L30 45L40 35C40 35 45 45 50 45C55 45 60 40 60 30C60 20 55 10 50 10Z" fill="#FF7E00"/>
                      <circle cx="15" cy="25" r="3" fill="white"/>
                      <circle cx="45" cy="25" r="3" fill="white"/>
                    </svg>
                  </motion.div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
                        <i className="fas fa-user"></i>
                      </div>
                      <span className="ml-2 text-white font-['Inter']">{meme.user}</span>
                    </div>
                    <div className="flex items-center">
                      <button className="text-gray-400 hover:text-orange-500 mr-3 transition-colors">
                        <i className="far fa-heart"></i> {meme.likes}
                      </button>
                      <button className="text-gray-400 hover:text-orange-500 transition-colors">
                        <i className="far fa-comment"></i> {meme.comments}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-8"
            variants={fadeInUp}
          >
            <motion.button 
              className="bg-black bg-opacity-70 backdrop-blur-xl px-8 py-3 rounded-full text-white font-bold hover:bg-white hover:bg-opacity-10 transition border border-white border-opacity-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Memes
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Community Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerChildren}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-black bg-opacity-70 backdrop-blur-xl rounded-2xl p-6 text-center border border-white border-opacity-10"
              variants={fadeIn}
              whileHover={{ y: -10 }}
            >
              <motion.h3 
                className="text-4xl font-['Archivo_Black'] text-orange-500 mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-white">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Community;
