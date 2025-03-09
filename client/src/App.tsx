import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import TelegramBot from "./components/TelegramBot";
import PriceSection from "./components/PriceSection";
import HowToBuy from "./components/HowToBuy";
import Roadmap from "./components/Roadmap";
import Community from "./components/Community";
import Team from "./components/Team";
import Footer from "./components/Footer";
import BotWidget from "./components/BotWidget";
import CustomCursor from "./components/CustomCursor";
import ProgressBar from "./components/ProgressBar";

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Set up background
  useEffect(() => {
    document.body.classList.add('bg-drip-dark');
    document.body.style.backgroundImage = `
      radial-gradient(circle at 20% 30%, rgba(138, 43, 226, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(255, 126, 0, 0.1) 0%, transparent 50%)
    `;
    document.body.style.scrollBehavior = "smooth";
    
    return () => {
      document.body.classList.remove('bg-drip-dark');
      document.body.style.backgroundImage = '';
      document.body.style.scrollBehavior = "";
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <motion.div className="progress-bar" style={{ scaleX }} />
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <About />
        <TelegramBot />
        <PriceSection />
        <HowToBuy />
        <Roadmap />
        <Community />
        <Team />
      </main>
      <BotWidget />
      <Footer />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
