'use client';

import { useEffect, useRef } from 'react';

const PowderText = ({ text = "Cartel Over Cabal" }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = 300;
    
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
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
        
        // Store the line coordinates in the mouse object for drawing later
        mouse.interactionLine = {
          startX,
          startY,
          endX,
          endY
        };
        
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
          this.x += moveX * this.density * 0.5;
          this.y += moveY * this.density * 0.5;
        }
      }
    }

    let particles = [];
    function init() {
      particles = [];
      
      ctx.fillStyle = 'white';
      ctx.font = '400 200px pf-fuel-decay, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text.toUpperCase(), canvas.width/2, canvas.height/2);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let y = 0; y < canvas.height; y += 1) {
        for (let x = 0; x < canvas.width; x += 1) {
          const index = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
          if (data[index + 3] > 128) {
            particles.push(new Particle(x, y));
          }
        }
      }
    }

    const mouse = {
      x: undefined,
      y: undefined,
      prevX: undefined,
      prevY: undefined,
      pressed: false,
      interactionLine: null
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
      mouse.interactionLine = null; // Clear interaction line when mouse is released
    });

    canvas.addEventListener('mouseleave', () => {
      mouse.pressed = false;
      mouse.interactionLine = null; // Clear interaction line when mouse leaves canvas
    });

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update(mouse);
        particle.draw();
      });
      
      // Draw the interaction line if it exists
      if (mouse.pressed && mouse.interactionLine) {
        const { startX, startY, endX, endY } = mouse.interactionLine;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'; // Semi-transparent white line
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw glowing effect
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'; // More transparent for the glow
        ctx.lineWidth = 8;
        ctx.stroke();
      }
      
      requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = 300;
      init();
    });

    return () => {
      window.removeEventListener('resize', () => {});
      canvas.removeEventListener('mousemove', () => {});
      canvas.removeEventListener('mousedown', () => {});
      canvas.removeEventListener('mouseup', () => {});
      canvas.removeEventListener('mouseleave', () => {});
    };
  }, [text]);

  return (
    <canvas 
      ref={canvasRef}
      className="bg-black cursor-pointer font-fuel-decay"
    />
  );
};

export default PowderText;