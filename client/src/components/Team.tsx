import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, fadeInUp, staggerChildren } from '../styles/animations';

const Team: React.FC = () => {
  const teamMembers = [
    {
      name: 'Big Drip',
      role: 'Chief Drip Officer',
      bio: 'Street-smart visionary with 5+ years in crypto. Previously built multiple successful projects in the DeFi space.',
      socialLinks: [
        { platform: 'twitter', url: '#', icon: 'fab fa-twitter', color: 'text-[#1DA1F2]' },
        { platform: 'telegram', url: '#', icon: 'fab fa-telegram-plane', color: 'text-[#0088cc]' },
        { platform: 'github', url: '#', icon: 'fab fa-github', color: 'text-white' },
      ]
    },
    {
      name: 'Drip Coder',
      role: 'Lead Developer',
      bio: 'Blockchain wizard with deep Solana expertise. Developed multiple token contracts and applications with security as priority.',
      socialLinks: [
        { platform: 'twitter', url: '#', icon: 'fab fa-twitter', color: 'text-[#1DA1F2]' },
        { platform: 'telegram', url: '#', icon: 'fab fa-telegram-plane', color: 'text-[#0088cc]' },
        { platform: 'github', url: '#', icon: 'fab fa-github', color: 'text-white' },
      ]
    },
    {
      name: 'Meme Lord',
      role: 'Marketing Lead',
      bio: 'Creative genius with a knack for viral marketing. Previously grew social channels for multiple blue-chip NFT projects.',
      socialLinks: [
        { platform: 'twitter', url: '#', icon: 'fab fa-twitter', color: 'text-[#1DA1F2]' },
        { platform: 'telegram', url: '#', icon: 'fab fa-telegram-plane', color: 'text-[#0088cc]' },
        { platform: 'github', url: '#', icon: 'fab fa-github', color: 'text-white' },
      ]
    },
    {
      name: 'Street Prophet',
      role: 'Community Manager',
      bio: 'Community-building expert who turns members into evangelists. Available 24/7 to grow and nurture the DripDog community.',
      socialLinks: [
        { platform: 'twitter', url: '#', icon: 'fab fa-twitter', color: 'text-[#1DA1F2]' },
        { platform: 'telegram', url: '#', icon: 'fab fa-telegram-plane', color: 'text-[#0088cc]' },
        { platform: 'github', url: '#', icon: 'fab fa-github', color: 'text-white' },
      ]
    },
  ];

  return (
    <section id="team" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-['Archivo_Black'] text-white mb-4">
            Meet The <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-transparent bg-clip-text">Team</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-['Inter']">
            The masterminds behind $DRIP, bringing street smarts to the Solana blockchain.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerChildren}
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="team-card perspective-1000"
              variants={fadeIn}
            >
              <motion.div 
                className="h-80 relative preserve-3d transition-all duration-500"
                whileHover={{ rotateY: 180 }}
              >
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden bg-black bg-opacity-70 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center text-center border border-white border-opacity-10">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-orange-500 bg-gradient-to-br from-gray-600 to-gray-800">
                    {/* Team member icon/avatar */}
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="fas fa-user-tie text-orange-500 text-4xl"></i>
                    </div>
                  </div>
                  <h3 className="text-xl font-['Archivo_Black'] text-white mb-1">{member.name}</h3>
                  <p className="text-orange-500 font-bold mb-4">{member.role}</p>
                  <p className="text-gray-300 text-sm font-['Inter']">Hover to see more</p>
                </div>
                
                {/* Back */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-black bg-opacity-70 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center text-center border border-white border-opacity-10">
                  <h3 className="text-xl font-['Archivo_Black'] text-white mb-3">{member.name}</h3>
                  <p className="text-gray-300 mb-4 font-['Inter']">{member.bio}</p>
                  <div className="flex space-x-4 mt-auto">
                    {member.socialLinks.map((link, idx) => (
                      <a 
                        key={idx}
                        href={link.url} 
                        className={`text-gray-400 hover:${link.color} transition`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className={`${link.icon} text-xl`}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default Team;
