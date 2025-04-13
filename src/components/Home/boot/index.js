'use client';
import { useState, useEffect, useRef } from 'react';
import './boot.css';
import { useRouter } from 'next/navigation';

export default function BootPage() {
  const router = useRouter();

  const bootLines = [
    "> ESTABLISHING ENCRYPTED CHANNEL",
    "> VERIFYING CRYPTOGRAPHIC SIGNATURES",
    "> AUTHENTICATING WALLET",
    "> WALLET VERIFIED: <ADDRESS>",
    "> SCANNING BLOCKCHAIN FOR TOKEN BALANCE",
    "> TOKEN VERIFICATION: SUCCESSFUL",
    "> ACCESS LEVEL: FULL",
    "> LOADING SECURE MESSAGING PROTOCOL",
    "> INITIALIZING END-TO-END ENCRYPTION",
    "> SYSTEM READY",
    "> WELCOME"
  ];

  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  const hasNavigated = useRef(false);

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentLine >= bootLines.length) {
      if (!hasNavigated.current) {
        hasNavigated.current = true;
        router.push('/chat');
        setTimeout(() => {
          router.push('/chat');
        }, 100);
      }
      return;
    }

    const currentLineText = bootLines[currentLine];
    
    if (currentChar < currentLineText.length) {
      const typingTimeout = setTimeout(() => {
        setCurrentChar(currentChar + 1);
      }, 30);
      return () => clearTimeout(typingTimeout);
    } else {
      const lineCompleteTimeout = setTimeout(() => {
        setDisplayedLines(prev => [...prev, currentLineText]);
        setCurrentLine(currentLine + 1);
        setCurrentChar(0);
      }, 150);
      return () => clearTimeout(lineCompleteTimeout);
    }
  }, [currentLine, currentChar, displayedLines, bootLines, router]);

  const handleSkip = () => {
    hasNavigated.current = true;
    router.push('/chat');
  };

  return (
    <div className="boot-container">
      <div className="terminal-window boot-terminal">
        <div className="terminal-header">
          <span className="terminal-dot dot-red"></span>
          <span className="terminal-dot dot-yellow"></span>
          <span className="terminal-dot dot-green"></span>
          <span className="terminal-name">system_boot.sh</span>
        </div>
        
        <div className="terminal-content boot-content">
          {displayedLines.map((line, index) => (
            <div key={index} className="boot-line">{line}</div>
          ))}
          
          {currentLine < bootLines.length && (
            <div className="boot-line">
              {bootLines[currentLine].substring(0, currentChar)}
              {currentChar === bootLines[currentLine].length && (
                <span style={{ opacity: showCursor ? 1 : 0 }}>_</span>
              )}
            </div>
          )}
          
          {currentLine >= bootLines.length && (
            <div className="boot-command-line">
              <span className="command-prompt">$ </span>
              <span style={{ opacity: showCursor ? 1 : 0 }}>_</span>
            </div>
          )}
        </div>
      </div>

      <div className="boot-status">
        <div className="status-item">STATUS: INITIALIZING</div>
        <div className="status-item security">SECURITY: MAXIMUM</div>
      </div>

      <div className="boot-skip">
        <button className="skip-button" onClick={handleSkip}>
          <span className="fast-forward">≫</span> $ ./skip_boot.sh
        </button>
      </div>
    </div>
  );
} 