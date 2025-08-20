import React, { useState, useEffect } from 'react';

interface CRTScreenProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export const CRTScreen: React.FC<CRTScreenProps> = ({ 
  children, 
  className = '', 
  intensity = 'medium' 
}) => {
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Power on effect
    const timer = setTimeout(() => {
      setIsPoweredOn(true);
    }, 100);

    // Random glitch effects with more variety
    const glitchInterval = setInterval(() => {
      const randomChance = Math.random();
      if (randomChance < 0.015) { // 1.5% chance for glitch
        setGlitchActive(true);
        const glitchDuration = Math.random() * 200 + 50; // Random duration between 50-250ms
        setTimeout(() => setGlitchActive(false), glitchDuration);
      }
    }, Math.random() * 10000 + 5000); // Random interval between 5-15 seconds

    // Additional random flicker effects
    const flickerInterval = setInterval(() => {
      if (Math.random() < 0.02) { // 2% chance for flicker
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 30);
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(glitchInterval);
      clearInterval(flickerInterval);
    };
  }, []);

  return (
    <div className={`crt-bezel ${className}`}>
      <div className={`crt-screen crt-curved ${isPoweredOn ? 'crt-power-on' : ''} h-full`}>
        <div className="crt-static"></div>
        <div className={`crt-content crt-flicker ${glitchActive ? 'crt-glitch' : ''}`}>
          {children}
        </div>
        {/* CRT Power Indicator */}
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-green-500 rounded-full opacity-60 animate-pulse"></div>
      </div>
    </div>
  );
};
