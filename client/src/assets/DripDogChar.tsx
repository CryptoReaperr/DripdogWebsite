import React from 'react';
import { motion } from 'framer-motion';

interface DripDogCharProps {
  className?: string;
}

const DripDogChar: React.FC<DripDogCharProps> = ({ className = '' }) => {
  return (
    <motion.div 
      className={`relative w-full max-w-lg mx-auto ${className}`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        animate={{ y: [0, -20, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 3,
          ease: "easeInOut"
        }}
      >
        {/* DripDog Character Body */}
        <ellipse cx="150" cy="180" rx="100" ry="90" fill="#3E3E3E" />
        <circle cx="150" cy="130" r="80" fill="#4B4B4B" />
        
        {/* Head */}
        <circle cx="150" cy="120" r="70" fill="#5A5A5A" />
        
        {/* Ears */}
        <motion.path 
          d="M95 70C85 40 60 30 50 35C60 60 75 75 95 70Z" 
          fill="#5A5A5A"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.path 
          d="M205 70C215 40 240 30 250 35C240 60 225 75 205 70Z" 
          fill="#5A5A5A"
          animate={{ rotate: [5, -5, 5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        
        {/* Eyes */}
        <circle cx="125" cy="100" r="10" fill="white" />
        <circle cx="175" cy="100" r="10" fill="white" />
        <circle cx="125" cy="100" r="5" fill="black" />
        <circle cx="175" cy="100" r="5" fill="black" />
        
        {/* Nose */}
        <ellipse cx="150" cy="125" rx="15" ry="10" fill="#333" />
        
        {/* Mouth */}
        <path d="M130 145C130 145 150 165 170 145" stroke="#333" strokeWidth="4" strokeLinecap="round" />
        
        {/* Sunglasses */}
        <rect x="100" y="85" width="35" height="20" rx="5" fill="#FF7E00" />
        <rect x="165" y="85" width="35" height="20" rx="5" fill="#FF7E00" />
        <path d="M135 95L165 95" stroke="#FF7E00" strokeWidth="4" />
        <path d="M100 95L85 80" stroke="#FF7E00" strokeWidth="4" />
        <path d="M200 95L215 80" stroke="#FF7E00" strokeWidth="4" />
        
        {/* Gold Chain */}
        <motion.path 
          d="M100 170C100 170 150 190 200 170" 
          stroke="#FFD700" 
          strokeWidth="8"
          strokeLinecap="round"
          animate={{ y: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <motion.path 
          d="M130 190C130 190 150 200 170 190" 
          stroke="#FFD700" 
          strokeWidth="6"
          strokeLinecap="round"
          animate={{ y: [0, 2, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
        />
        
        {/* Dollar Sign Bling */}
        <motion.g
          animate={{ 
            rotate: [0, 10, 0, -10, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut" 
          }}
        >
          <circle cx="150" cy="170" r="15" fill="#FFD700" />
          <path d="M150 160V180" stroke="black" strokeWidth="3" strokeLinecap="round" />
          <path d="M145 165C145 165 150 160 155 165C160 170 145 175 150 175" stroke="black" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
      </motion.svg>
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute top-6 -left-6 bg-black bg-opacity-70 backdrop-blur-xl p-3 rounded-full hidden md:flex items-center justify-center"
        style={{ backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <i className="fas fa-dollar-sign text-orange-500 text-xl"></i>
      </motion.div>
      
      <motion.div 
        className="absolute top-1/4 -right-4 bg-black bg-opacity-70 backdrop-blur-xl p-3 rounded-full hidden md:flex items-center justify-center"
        style={{ backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <i className="fas fa-fire text-orange-500 text-xl"></i>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-12 -left-8 bg-black bg-opacity-70 backdrop-blur-xl p-3 rounded-full hidden md:flex items-center justify-center"
        style={{ backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
      >
        <i className="fas fa-crown text-orange-500 text-xl"></i>
      </motion.div>
    </motion.div>
  );
};

export default DripDogChar;
