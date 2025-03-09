import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (scrollHeight > 0) {
        setProgress((currentScrollPos / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    
    // Initialize on mount
    updateScrollProgress();
    
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return progress;
};

export default useScrollProgress;
