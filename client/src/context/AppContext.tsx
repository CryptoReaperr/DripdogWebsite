import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

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
  
  // Initial fetch of token data
  useEffect(() => {
    fetchTokenData();
    
    // Set up interval to refresh token data every 60 seconds
    const refreshInterval = setInterval(() => {
      fetchTokenData();
    }, 60000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const togglePartyMode = () => {
    setPartyMode(!partyMode);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopySuccess(true);
        
        // Party mode when copying token address
        if (partyMode) {
          const confetti = document.createElement('div');
          confetti.className = 'fixed inset-0 z-50 pointer-events-none';
          document.body.appendChild(confetti);
          
          setTimeout(() => {
            document.body.removeChild(confetti);
          }, 3000);
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
