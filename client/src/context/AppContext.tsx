import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';

type TokenInfo = {
  name: string;
  symbol: string;
  price: {
    current: string;
    change: string;
    volume: string;
    marketCap: string;
    holders: string;
    circulatingSupply: string;
  };
  links: {
    telegram: string;
    twitter: string;
    discord: string;
    reddit: string;
  };
  tokenAddress: string;
};

type AppContextType = {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  price: {
    current: string;
    change: string;
    volume: string;
    marketCap: string;
    holders: string;
    circulatingSupply: string;
  };
  isLoading: boolean;
  tokenAddress: string;
  copyToClipboard: (text: string) => void;
  copySuccess: boolean;
  tokenInfo: TokenInfo | null;
  refreshTokenData: () => void;
  partyMode: boolean;
  togglePartyMode: () => void;
};

const defaultPrice = {
  current: '$0.00421',
  change: '+69.4%',
  volume: '$1.2M',
  marketCap: '$4.2M',
  holders: '12,420',
  circulatingSupply: '1B $DRIP',
};

const defaultContext: AppContextType = {
  mobileMenuOpen: false,
  toggleMobileMenu: () => {},
  closeMobileMenu: () => {},
  price: defaultPrice,
  isLoading: false,
  tokenAddress: 'rXKYBdFqtFuTbieQh2DBxuy6tCi8yDRY3h1kfwSpump',
  copyToClipboard: () => {},
  copySuccess: false,
  tokenInfo: null,
  refreshTokenData: () => {},
  partyMode: false,
  togglePartyMode: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [partyMode, setPartyMode] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [price, setPrice] = useState(defaultPrice);
  const [tokenAddress, setTokenAddress] = useState('rXKYBdFqtFuTbieQh2DBxuy6tCi8yDRY3h1kfwSpump');
  const [partyInterval, setPartyInterval] = useState<NodeJS.Timeout | null>(null);
  
  // Function to fetch token data from our API
  const fetchTokenData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/token-info');
      setTokenInfo(response.data);
      
      // Update price and token address
      if (response.data && response.data.price) {
        setPrice(response.data.price);
      }
      
      if (response.data && response.data.tokenAddress) {
        setTokenAddress(response.data.tokenAddress);
      }
    } catch (error) {
      console.error('Error fetching token data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Confetti animation for party mode
  const runPartyEffects = useCallback(() => {
    // Random confetti burst
    const randomConfetti = () => {
      const colors = [
        '#FF9500', // Orange
        '#FFD100', // Yellow
        '#22CFCF', // Teal
        '#FF4E50', // Red
        '#5D26C1', // Purple
        '#00b09b', // Green
      ];
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { 
          y: Math.random(), 
          x: Math.random()
        },
        colors: colors,
        gravity: 0.8,
        scalar: 1.2,
        shapes: ['square', 'circle'],
        ticks: 300,
      });
    };

    // Colorful dog silhouettes animation
    const addDogAnimation = () => {
      const dogElement = document.createElement('div');
      dogElement.className = 'party-dog fixed w-12 h-12 z-50 pointer-events-none';
      dogElement.style.cssText = `
        top: ${Math.random() * 100}vh;
        left: ${Math.random() * 100}vw;
        transform: rotate(${Math.random() * 360}deg);
        animation: float-around 5s linear infinite;
        opacity: 0.8;
      `;

      // Use a dog emoji as content - or you could use an SVG
      dogElement.textContent = '🐕';
      dogElement.style.fontSize = `${Math.random() * 30 + 20}px`;
      document.body.appendChild(dogElement);

      // Remove after animation
      setTimeout(() => {
        document.body.removeChild(dogElement);
      }, 5000);
    };

    // Run both animations randomly
    if (Math.random() > 0.7) {
      randomConfetti();
    }
    if (Math.random() > 0.8) {
      addDogAnimation();
    }
  }, []);
  
  // Initial fetch of token data
  useEffect(() => {
    fetchTokenData();
    
    // Set up interval to refresh token data every 60 seconds
    const refreshInterval = setInterval(() => {
      fetchTokenData();
    }, 60000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  // Party mode effects
  useEffect(() => {
    if (partyMode) {
      // Apply party mode styles to the body
      document.body.classList.add('party-mode');
      
      // Create pulsating background
      const partyBg = document.createElement('div');
      partyBg.className = 'fixed inset-0 pointer-events-none z-0 party-bg';
      document.body.appendChild(partyBg);
      
      // Add animated dog paws
      for (let i = 0; i < 5; i++) {
        const pawprint = document.createElement('div');
        pawprint.className = 'fixed paw-print z-10 pointer-events-none animate-bounce opacity-50';
        pawprint.style.left = `${Math.random() * 100}vw`;
        pawprint.style.top = `${Math.random() * 100}vh`;
        pawprint.style.transform = `rotate(${Math.random() * 360}deg)`;
        pawprint.textContent = '🐾';
        pawprint.style.fontSize = `${Math.random() * 20 + 20}px`;
        document.body.appendChild(pawprint);
      }
      
      // Initial confetti burst
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 }
      });
      
      // Set interval for ongoing party effects
      const interval = setInterval(runPartyEffects, 2000);
      setPartyInterval(interval);
      
      // Make elements bounce
      const headings = document.querySelectorAll('h1, h2, h3');
      headings.forEach(heading => {
        heading.classList.add('animate-pulse');
      });
      
    } else {
      // Remove party mode styles
      document.body.classList.remove('party-mode');
      
      // Clear interval
      if (partyInterval) {
        clearInterval(partyInterval);
        setPartyInterval(null);
      }
      
      // Remove animations
      const headings = document.querySelectorAll('h1, h2, h3');
      headings.forEach(heading => {
        heading.classList.remove('animate-pulse');
      });
      
      // Remove party background
      const partyBg = document.querySelector('.party-bg');
      if (partyBg) {
        document.body.removeChild(partyBg);
      }
      
      // Remove paw prints
      const pawPrints = document.querySelectorAll('.paw-print');
      pawPrints.forEach(paw => {
        document.body.removeChild(paw);
      });
    }
    
    // Cleanup function
    return () => {
      if (partyInterval) {
        clearInterval(partyInterval);
      }
      document.body.classList.remove('party-mode');
      const partyBg = document.querySelector('.party-bg');
      if (partyBg) {
        document.body.removeChild(partyBg);
      }
      const pawPrints = document.querySelectorAll('.paw-print');
      pawPrints.forEach(paw => {
        if (paw.parentNode) {
          paw.parentNode.removeChild(paw);
        }
      });
      const partyDogs = document.querySelectorAll('.party-dog');
      partyDogs.forEach(dog => {
        if (dog.parentNode) {
          dog.parentNode.removeChild(dog);
        }
      });
    };
  }, [partyMode, partyInterval, runPartyEffects]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const togglePartyMode = () => {
    const newMode = !partyMode;
    setPartyMode(newMode);
    
    // Extra confetti burst when turning on party mode
    if (newMode) {
      // Fire multiple confetti bursts in different positions
      const fireConfetti = (x: number, y: number, count: number) => {
        confetti({
          particleCount: count,
          angle: Math.random() * 360,
          spread: 100,
          origin: { x, y },
          colors: ['#FF9500', '#FFD100', '#22CFCF', '#FF4E50', '#5D26C1', '#00b09b'],
        });
      };
      
      // Fire from multiple directions
      fireConfetti(0.2, 0.3, 50);
      setTimeout(() => fireConfetti(0.8, 0.5, 50), 100);
      setTimeout(() => fireConfetti(0.5, 0.8, 50), 200);
      setTimeout(() => fireConfetti(0.3, 0.6, 50), 300);
      
      // Create a brief flash effect
      const flash = document.createElement('div');
      flash.className = 'fixed inset-0 bg-white z-50 pointer-events-none';
      flash.style.animation = 'flash 0.5s forwards';
      document.body.appendChild(flash);
      
      // Remove flash after animation
      setTimeout(() => {
        document.body.removeChild(flash);
      }, 500);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopySuccess(true);
        
        // Party mode when copying token address
        if (partyMode) {
          // Fire money confetti
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.5, x: 0.5 },
            angle: 90,
            startVelocity: 30,
            gravity: 0.5,
            scalar: 1.5,
            drift: 0,
            ticks: 300,
            shapes: ['square'],
            colors: ['#00FF00', '#32CD32', '#90EE90'],
          });
          
          // Create floating dollar signs
          for (let i = 0; i < 10; i++) {
            setTimeout(() => {
              const dollarSign = document.createElement('div');
              dollarSign.className = 'fixed pointer-events-none z-50 dollar-sign';
              dollarSign.textContent = '$';
              dollarSign.style.color = 'green';
              dollarSign.style.fontSize = `${Math.random() * 30 + 20}px`;
              dollarSign.style.left = `${Math.random() * 80 + 10}vw`;
              dollarSign.style.top = '100vh';
              dollarSign.style.transition = 'all 3s ease-out';
              document.body.appendChild(dollarSign);
              
              // Animate upwards
              setTimeout(() => {
                dollarSign.style.top = '0vh';
                dollarSign.style.opacity = '0';
              }, 50);
              
              // Remove element
              setTimeout(() => {
                document.body.removeChild(dollarSign);
              }, 3000);
            }, i * 200);
          }
        }
        
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  
  // Refresh token data
  const refreshTokenData = () => {
    fetchTokenData();
  };

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <AppContext.Provider 
      value={{ 
        mobileMenuOpen, 
        toggleMobileMenu, 
        closeMobileMenu,
        price,
        isLoading,
        tokenAddress,
        copyToClipboard,
        copySuccess,
        tokenInfo,
        refreshTokenData,
        partyMode,
        togglePartyMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
