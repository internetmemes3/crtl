'use client';

import { useEffect, useRef, useState } from 'react';

const PowderText = ({ text = "Cartel Over Cabal" }) => {
  const canvasRef = useRef(null);
  const [needsReset, setNeedsReset] = useState(false);
  const particlesRef = useRef([]);
  const initFuncRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Calculate responsive dimensions based on window size
  const calculateDimensions = () => {
    if (typeof window === 'undefined') return { width: 0, height: 0 };
    
    const width = window.innerWidth;
    // Scale height based on screen width
    const height = Math.min(Math.max(width * 0.2, 150), 350);
    
    return { width, height };
  };
  
  // Calculate responsive font size based on screen width
  const calculateFontSize = () => {
    if (typeof window === 'undefined') return 200;
    
    const width = window.innerWidth;
    // Base font size on screen width
    if (width < 480) return 60; // Mobile
    if (width < 768) return 100; // Small tablets
    if (width < 1024) return 150; // Tablets
    return 200; // Desktops
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set initial dimensions
    const newDimensions = calculateDimensions();
    setDimensions(newDimensions);
    
    canvas.width = newDimensions.width;
    canvas.height = newDimensions.height;
    
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.size = 2;
        this.density = (Math.random() * 4) + 1;
        this.isActivated = false;
      }
      
      draw() {
        if (!this.isActivated) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(this.x, this.y, this.size, this.size);
          return;
        }
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }
      
      update(mouse) {
        if (!mouse.pressed) return;

        const moveX = mouse.x - mouse.prevX;
        const moveY = mouse.y - mouse.prevY;
        const moveLength = Math.sqrt(moveX * moveX + moveY * moveY);
        
        if (moveLength < 0.1) return;

        const lineLength = 100; // Length of the interaction line
        const dirX = moveY / moveLength;
        const dirY = moveX / moveLength;
  
        const startX = mouse.x - dirX * lineLength;
        const startY = mouse.y - dirY * lineLength;
        const endX = mouse.x + dirX * lineLength;
        const endY = mouse.y + dirY * lineLength;
        
        const t = ((this.x - startX) * (endX - startX) + (this.y - startY) * (endY - startY)) / 
                 ((endX - startX) * (endX - startX) + (endY - startY) * (endY - startY));
        
        const clampedT = Math.max(0, Math.min(1, t));
        
        const closestX = startX + clampedT * (endX - startX);
        const closestY = startY + clampedT * (endY - startY);
        
        const dx = this.x - closestX;
        const dy = this.y - closestY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 10) { // Line thickness
          this.isActivated = true;
          setNeedsReset(true); // Set the reset state when particles are disturbed
          this.x += moveX * this.density * 0.5;
          this.y += moveY * this.density * 0.5;
        }
      }

      // Add a method to reset the particle to its original position
      reset() {
        this.x = this.originX;
        this.y = this.originY;
        this.isActivated = false;
      }
    }

    let particles = [];
    function init() {
      particles = [];
      
      ctx.fillStyle = 'white';
      const fontSize = calculateFontSize();
      ctx.font = `400 ${fontSize}px pf-fuel-decay, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text.toUpperCase(), canvas.width/2, canvas.height/2);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const samplingRate = 2; // Adjust this value (e.g., 2, 3, 4)
      const particleSize = 3; // Adjust if needed based on samplingRate

      for (let y = 0; y < canvas.height; y += samplingRate) {
        for (let x = 0; x < canvas.width; x += samplingRate) {
          const index = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
          if (data[index + 3] > 128) { // Check alpha channel
            particles.push(new Particle(x, y /*, potential size argument */));
          }
        }
      }
      
      // Store particles in the ref for later reset access
      particlesRef.current = particles;
    }

    // Store init function in ref for reset button
    initFuncRef.current = init;

    const mouse = {
      x: undefined,
      y: undefined,
      prevX: undefined,
      prevY: undefined,
      pressed: false
    };

    canvas.addEventListener('mousemove', (event) => {
      if (mouse.pressed) {
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
        mouse.x = event.offsetX;
        mouse.y = event.offsetY;
      }
    });

    canvas.addEventListener('mousedown', (event) => {
      mouse.pressed = true;
      mouse.x = event.offsetX;
      mouse.y = event.offsetY;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
    });

    canvas.addEventListener('mouseup', () => {
      mouse.pressed = false;
    });

    canvas.addEventListener('mouseleave', () => {
      mouse.pressed = false;
    });

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update(mouse);
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    }

    init();
    animate();

    // Properly handle window resize
    const handleResize = () => {
      const newDimensions = calculateDimensions();
      setDimensions(newDimensions);
      
      canvas.width = newDimensions.width;
      canvas.height = newDimensions.height;
      
      init();
      setNeedsReset(false);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', () => {});
      canvas.removeEventListener('mousedown', () => {});
      canvas.removeEventListener('mouseup', () => {});
      canvas.removeEventListener('mouseleave', () => {});
    };
  }, [text]);

  // Function to handle the reset button click
  const handleReset = () => {
    // Reset all particles to their original positions
    particlesRef.current.forEach(particle => particle.reset());
    setNeedsReset(false);
  };

  return (
    <>
      
      <canvas 
        ref={canvasRef}
        className="bg-black cursor-pointer font-fuel-decay"
      />
        <div className="flex  text-center">
          <p className="text-gray-400 text-s font-light">Click and Slide to interact</p>
        </div>
      {needsReset && (
        <div className="mt-2 text-center">
          <button 
            onClick={handleReset}
            className="bg-gray-800 text-white px-4 py-1 rounded-full text-xs hover:bg-gray-700 transition-colors"
          >
            Reset The Text
          </button>
        </div>
      )}
    </>
  );
};

export default PowderText;