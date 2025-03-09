import React, { createContext, useContext, useState, useEffect } from 'react';

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
};

const defaultContext: AppContextType = {
  mobileMenuOpen: false,
  toggleMobileMenu: () => {},
  closeMobileMenu: () => {},
  price: {
    current: '$0.00421',
    change: '+69.4%',
    volume: '$1.2M',
    marketCap: '$4.2M',
    holders: '12,420',
    circulatingSupply: '1B $DRIP',
  },
  isLoading: false,
  tokenAddress: 'dr1pDRipdRipDr1pDRip123456789abcdefgHJKLm',
  copyToClipboard: () => {},
  copySuccess: false,
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real implementation, this would fetch from an API
  const price = {
    current: '$0.00421',
    change: '+69.4%',
    volume: '$1.2M',
    marketCap: '$4.2M',
    holders: '12,420',
    circulatingSupply: '1B $DRIP',
  };
  
  const tokenAddress = 'dr1pDRipdRipDr1pDRip123456789abcdefgHJKLm';

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
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
        copySuccess
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
