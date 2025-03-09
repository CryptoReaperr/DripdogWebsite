import React from 'react';
import { motion } from 'framer-motion';
import dogImage from './images/dripdog.jpg';

interface RealDripDogProps {
  className?: string;
  width?: number;
  height?: number;
  animated?: boolean;
}

const RealDripDog: React.FC<RealDripDogProps> = ({ 
  className = '', 
  width = 200, 
  height = 200,
  animated = true
}) => {
  const containerVariants = {
    hover: {
      scale: 1.05,
      rotate: [-2, 2, -2],
      transition: {
        rotate: {
          repeat: Infinity,
          duration: 0.5
        }
      }
    }
  };

  const WrapperComponent = animated ? motion.div : 'div';

  return (
    <WrapperComponent 
      className={`relative inline-block ${className}`}
      whileHover={animated ? "hover" : undefined}
      variants={animated ? containerVariants : undefined}
    >
      <div 
        className="relative rounded-full overflow-hidden"
        style={{ 
          width: `${width}px`,
          height: `${height}px`,
          boxShadow: '0 0 20px rgba(255, 126, 0, 0.6)'
        }}
      >
        <img 
          src={dogImage} 
          alt="DripDog" 
          className="w-full h-full object-cover"
        />
        
        {/* Glowing effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/40 to-yellow-400/40 mix-blend-overlay"></div>
        
        {/* Bling elements */}
        {animated && (
          <>
            <motion.div 
              className="absolute top-0 right-0 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ 
                scale: [0.8, 1.2, 0.8], 
                opacity: [0.8, 1, 0.8],
                rotate: 360
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              $
            </motion.div>
            
            <motion.div 
              className="absolute bottom-2 left-2 text-xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              🔥
            </motion.div>
          </>
        )}
      </div>
    </WrapperComponent>
  );
};

export default RealDripDog;