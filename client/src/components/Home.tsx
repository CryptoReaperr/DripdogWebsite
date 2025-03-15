
import React from 'react';
import Hero from './Hero';
import HowToBuy from './HowToBuy';
import { motion, useScroll, useSpring } from "framer-motion";

export const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX }} />
      <main>
        <Hero />
        <HowToBuy />
      </main>
    </>
  );
};
