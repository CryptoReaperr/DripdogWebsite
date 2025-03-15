import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import DripDogChar from '@/assets/DripDogChar';

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex min-h-screen bg-drip-dark items-center justify-center p-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <DripDogChar className="w-32 h-32 mx-auto" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">404 - Page Not Found</h1>
          <p className="text-slate-300 mb-8">
            Oops! Looks like the page you're looking for has gone missing. Our stylish DripDog is searching for it, but in the meantime, head back to the homepage.
          </p>
          
          <Button 
            onClick={() => setLocation('/')}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
          >
            Back to Homepage
          </Button>
        </motion.div>
      </div>
    </div>
  );
}