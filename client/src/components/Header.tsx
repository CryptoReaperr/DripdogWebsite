import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import DripDogLogo from '../assets/DripDogLogo';

const Header: React.FC = () => {
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useAppContext();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navItems = [
    { title: 'About', href: '#about' },
    { title: 'Bot', href: '#bot' },
    { title: 'Price', href: '#price' },
    { title: 'How to Buy', href: '#buy' },
    { title: '$Dripmap', href: '#roadmap' },
    { title: 'Community', href: '#community' },
    { title: 'Team', href: '#team' },
  ];

  const handleNavClick = (href: string) => {
    closeMobileMenu();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="bg-black bg-opacity-70 backdrop-blur-xl px-6 py-4 border border-white border-opacity-10"
          style={{ backdropFilter: 'blur(12px)' }}>
          <div className="container mx-auto flex items-center justify-between">
            <a href="#hero" className="flex items-center" onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}>
              <DripDogLogo width={40} height={40} className="mr-2" />
              <span className="text-2xl md:text-3xl font-['Archivo_Black'] text-white">DRIP<span className="text-orange-500">DOG</span></span>
            </a>
            
            {/* Mobile Menu Button */}
            <div className="block lg:hidden">
              <button 
                onClick={toggleMobileMenu} 
                className="text-white focus:outline-none"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a 
                  key={item.title}
                  href={item.href} 
                  className="text-white hover:text-orange-500 transition-colors font-['Inter'] font-semibold"
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                >
                  {item.title}
                </a>
              ))}
              <a 
                href="https://jup.ag/" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold hover:bg-opacity-80 transition shadow-[0_0_15px_rgba(255,126,0,0.7)] hover:shadow-[0_0_25px_rgba(255,126,0,0.9)] hover:-translate-y-0.5"
              >
                Buy $DRIP
              </a>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="lg:hidden bg-black bg-opacity-70 backdrop-blur-xl absolute w-full border-t border-white border-opacity-10"
              style={{ backdropFilter: 'blur(12px)' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a 
                    key={item.title}
                    href={item.href} 
                    className="text-white hover:text-orange-500 transition-colors font-['Inter'] font-semibold py-2"
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  >
                    {item.title}
                  </a>
                ))}
                <a 
                  href="https://jup.ag/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold hover:bg-opacity-80 transition shadow-[0_0_15px_rgba(255,126,0,0.7)] text-center"
                >
                  Buy $DRIP
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
