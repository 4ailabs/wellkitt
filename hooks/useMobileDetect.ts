import { useState, useEffect } from 'react';

interface MobileDetect {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  userAgent: string;
}

const useMobileDetect = (): MobileDetect => {
  const [mobileDetect, setMobileDetect] = useState<MobileDetect>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    userAgent: '',
  });

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
    
    // Detectar dispositivos móviles
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    
    // Detectar tablets específicamente
    const isTablet = /ipad|android(?=.*\b(?:tablet|tab)\b)/i.test(userAgent.toLowerCase());
    
    // Detectar móviles (excluyendo tablets)
    const isMobileOnly = isMobile && !isTablet;
    
    // Detectar desktop
    const isDesktop = !isMobile;

    setMobileDetect({
      isMobile: isMobileOnly,
      isTablet,
      isDesktop,
      userAgent,
    });
  }, []);

  return mobileDetect;
};

export default useMobileDetect;
