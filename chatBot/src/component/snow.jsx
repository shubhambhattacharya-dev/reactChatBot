import React, { useState, useEffect, useRef } from 'react';

const Snowfall = ({ 
  count = 100, 
  darkMode = false,
  wind = true,
  speed = 5,
  sizeVariation = true,
  accumulation = false,
  accumulationRate = 0.1,
  maxAccumulation = 200,
  interactive = false,
  customImages = [],
  blur = true,
  zIndex = 0
}) => {
  const [flakes, setFlakes] = useState([]);
  const [accumulatedSnow, setAccumulatedSnow] = useState([]);
  const containerRef = useRef(null);
  const nextId = useRef(count);
  const mousePosition = useRef({ x: 0, y: 0 });
  const resizeObserver = useRef(null);

  // Generate initial snowflakes
  useEffect(() => {
    generateFlakes();
    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
    };
  }, [count, speed, wind, sizeVariation]);

  // Handle mouse movement for interactivity
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  // Handle window resize
  useEffect(() => {
    if (!containerRef.current || !accumulation) return;
    
    resizeObserver.current = new ResizeObserver(() => {
      setAccumulatedSnow(prev => 
        prev.map(flake => ({
          ...flake,
          left: (flake.left * 100) / containerRef.current.offsetWidth
        }))
      );
    });
    
    resizeObserver.current.observe(containerRef.current);
    return () => resizeObserver.current.disconnect();
  }, [accumulation]);

  const generateFlakes = () => {
    const flakesArr = Array.from({ length: count }).map((_, i) => createFlake(i));
    setFlakes(flakesArr);
  };

  const createFlake = (id) => {
    const useImage = customImages.length > 0 && Math.random() > 0.7;
    const imageIndex = useImage ? Math.floor(Math.random() * customImages.length) : -1;
    
    return {
      id,
      left: Math.random() * 100,
      top: -10 - Math.random() * 20,
      delay: Math.random() * 5,
      duration: speed + Math.random() * 5,
      size: sizeVariation ? 0.5 + Math.random() * 1.5 : 1,
      sway: wind ? 5 + Math.random() * 10 : 0,
      opacity: 0.3 + Math.random() * 0.7,
      type: Math.floor(Math.random() * 5),
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 3,
      useImage,
      imageIndex,
      accumulated: false
    };
  };

  const handleAnimationEnd = (id) => {
    if (!accumulation || Math.random() > accumulationRate) {
      // Replace melted snowflake with a new one
      setFlakes(prev => {
        const index = prev.findIndex(f => f.id === id);
        if (index === -1) return prev;
        
        const newFlakes = [...prev];
        newFlakes[index] = createFlake(nextId.current++);
        return newFlakes;
      });
      return;
    }

    // Handle accumulation
    setFlakes(prev => {
      const flake = prev.find(f => f.id === id);
      if (!flake || flake.accumulated) return prev;
      
      const index = prev.findIndex(f => f.id === id);
      const newFlakes = [...prev];
      newFlakes[index] = createFlake(nextId.current++);
      
      // Add to accumulated snow
      setAccumulatedSnow(prevAcc => {
        const newAcc = [
          ...prevAcc,
          {
            ...flake,
            id: `acc-${Date.now()}-${Math.random()}`,
            accumulated: true,
            bottom: 0,
            accumulatedHeight: Math.random() * flake.size * 5
          }
        ];
        
        // Limit accumulation
        if (newAcc.length > maxAccumulation) {
          return newAcc.slice(newAcc.length - maxAccumulation);
        }
        return newAcc;
      });
      
      return newFlakes;
    });
  };

  // Snowflake characters and styles
  const snowflakeTypes = ['❄', '❅', '•', '❆', '✦'];
  const snowflakeColors = darkMode 
    ? ['rgba(200, 230, 255, 0.7)', 'rgba(180, 220, 255, 0.8)', 'rgba(160, 210, 255, 0.9)'] 
    : ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.7)'];

  const getWindEffect = (flake) => {
    if (!interactive || !mousePosition.current) return 0;
    
    const dx = mousePosition.current.x - (flake.left / 100 * window.innerWidth);
    const dy = mousePosition.current.y - (flake.top / 100 * window.innerHeight);
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 150) {
      return (dx / distance) * (150 - distance) * 0.1;
    }
    return 0;
  };

  return (
    <div 
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex }}
    >
      {flakes.map(flake => (
        <div
          key={flake.id}
          className="snowflake absolute"
          onAnimationEnd={() => handleAnimationEnd(flake.id)}
          style={{
            '--sway': `${flake.sway}px`,
            '--wind-effect': `${getWindEffect(flake)}px`,
            left: `${flake.left}%`,
            top: `${flake.top}%`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
            fontSize: `${flake.size}rem`,
            opacity: flake.opacity,
            color: snowflakeColors[Math.floor(Math.random() * snowflakeColors.length)],
            textShadow: darkMode 
              ? '0 0 5px rgba(100, 180, 255, 0.5)' 
              : '0 0 3px rgba(255, 255, 255, 0.7)',
            filter: blur ? `blur(${Math.random() > 0.7 ? '1px' : '0px'})` : 'none',
            zIndex: Math.floor(flake.size * 10),
            transform: `rotate(${flake.rotation}deg)`,
            willChange: 'transform, top, left'
          }}
        >
          {flake.useImage && customImages[flake.imageIndex] ? (
            <img 
              src={customImages[flake.imageIndex]} 
              alt="snowflake" 
              className="h-full w-full object-contain"
              style={{ 
                width: `${flake.size * 1.5}rem`, 
                height: `${flake.size * 1.5}rem` 
              }}
            />
          ) : (
            snowflakeTypes[flake.type]
          )}
        </div>
      ))}

      {/* Accumulated snow */}
      {accumulation && accumulatedSnow.map(flake => (
        <div
          key={flake.id}
          className="snowflake-accumulated absolute"
          style={{
            left: `${flake.left}%`,
            bottom: `${flake.bottom}%`,
            fontSize: `${flake.size * 0.7}rem`,
            opacity: flake.opacity * 0.8,
            color: snowflakeColors[0],
            filter: 'blur(0.5px)',
            zIndex: Math.floor(flake.size * 10) + 1,
            transform: `translateY(-${flake.accumulatedHeight}px)`
          }}
        >
          {flake.useImage && customImages[flake.imageIndex] ? (
            <img 
              src={customImages[flake.imageIndex]} 
              alt="snowflake" 
              className="h-full w-full object-contain"
              style={{ 
                width: `${flake.size}rem`, 
                height: `${flake.size}rem` 
              }}
            />
          ) : (
            snowflakeTypes[flake.type]
          )}
        </div>
      ))}

      <style jsx global>{`
        .snowflake {
          animation: fall linear forwards;
          user-select: none;
          pointer-events: none;
          will-change: transform;
        }
        
        .snowflake-accumulated {
          user-select: none;
          pointer-events: none;
        }
        
        @keyframes fall {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translate(var(--sway), 0) translateX(var(--wind-effect)) rotate(180deg);
          }
          100% {
            transform: translate(0, 110vh) translateX(0) rotate(360deg);
            opacity: ${accumulation ? '0.7' : '0'};
          }
        }
      `}</style>
    </div>
  );
};

export default Snowfall;