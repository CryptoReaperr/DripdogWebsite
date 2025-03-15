import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowToBuy from "./components/HowToBuy";
import Footer from "./components/Footer";
import Community from "./components/Community"; // Added
import Team from "./components/Team"; // Added

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
      radial-gradient(circle at 20% 30%, rgba(250, 204, 21, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(249, 115, 22, 0.08) 0%, transparent 50%)
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
      <Header />
      <main>
        <Hero />
        <HowToBuy />
        <Community /> {/* Added */}
        <Team /> {/* Added */}
      </main>
      <Footer />
      <Toaster />
    </QueryClientProvider>
  );
}

// Website created by @Crypto_Reaperr
export default App;
      <li>@Swaffelpaard</li>
      <li>@tryptoknight</li>
    </ul>
  </div>
);