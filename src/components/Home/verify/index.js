'use client';
import { useState, useEffect, useRef } from 'react';
import './verify.css';

export default function VerifyPage() {
  const [connecting, setConnecting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const canvasRef = useRef(null);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      window.location.href = '/boot';
    }, 1500);
  };

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const binary = '01';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF66';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = binary[Math.floor(Math.random() * binary.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const animate = () => {
        draw();
        animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="verify-container">
      <canvas ref={canvasRef} id="matrix-canvas"></canvas>

      <div className="terminal-window verify-terminal">
        <div className="terminal-header">
          <span className="terminal-dot dot-red"></span>
          <span className="terminal-dot dot-yellow"></span>
          <span className="terminal-dot dot-green"></span>
          <span className="terminal-name">connect_wallet.sh</span>
        </div>
        
        <div className="terminal-content">
          <div className="authentication-header">
            AUTHENTICATION REQUIRED
          </div>
          
          <div className="command-line">
            $ ./verify_identity.sh --wallet=base
          </div>
          
          <div className="instructions-box">
            <div className="instructions-command">
              $ cat instructions.txt
            </div>
            <div className="instructions-content">
              Connect your Base wallet to verify
              identity and token holdings.
              Secure authentication required for
              network access.
            </div>
            <div className="terminal-cursor">
            <span className="command-prompt">$ </span>
            <span style={{ opacity: showCursor ? 1 : 0 }}>_</span>
          </div>
          </div>
          
          <button 
            className="connect-button"
            onClick={handleConnect}
            disabled={connecting}
          >
            {connecting ? 'Connecting...' : '$ ./connect_base.sh'}
          </button>
          
          <div className="help-text">
            <p>
            If connection rejected, retry by executing the command above
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
