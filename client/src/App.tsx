
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Route, Switch, useLocation } from "wouter";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import HowToBuy from "./components/HowToBuy";
import Footer from "./components/Footer";
import Community from "./components/Community";
import Team from "./components/Team";

// Pages
import AdminPage from "./pages/admin";
import NotFound from "./pages/not-found";

function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
    <>
      <motion.div className="progress-bar" style={{ scaleX }} />
      <Header />
      <main>
        <Hero />
        <HowToBuy />
        <Community />
        <Team />
      </main>
      <Footer />
    </>
  );
}

function App() {
  // Get current location for handling page specific styling
  const [location] = useLocation();
  
  // Apply body background only on the homepage
  useEffect(() => {
    if (location === '/') {
      document.body.classList.add('bg-drip-dark');
      document.body.style.backgroundImage = `
        radial-gradient(circle at 20% 30%, rgba(250, 204, 21, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(249, 115, 22, 0.08) 0%, transparent 50%)
      `;
    } else {
      document.body.classList.add('bg-drip-dark');
      document.body.style.backgroundImage = '';
    }
    
    document.body.style.scrollBehavior = "smooth";
    
    return () => {
      document.body.classList.remove('bg-drip-dark');
      document.body.style.backgroundImage = '';
      document.body.style.scrollBehavior = "";
    };
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/admin" component={AdminPage} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
