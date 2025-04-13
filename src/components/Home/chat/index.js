'use client';
import { useState, useEffect, useRef } from 'react';
import './chat.css';

export default function ChatPage() {
  const [messages, setMessages] = useState([

  ]);
  const [message, setMessage] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const messageInputRef = useRef(null);
  const [displayText, setDisplayText] = useState('');
  const fullText = 'CARTEL UNDERGROUND NETWORK';
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); 

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);
  
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'user',
        time: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit', 
          hour12: true 
        }),
        content: message,
        reactions: {}
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  useEffect(() => {
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, []);
  
  return (
    <div className="chat-page-layout">
      <div className="active-nodes-panel">
        <div className="terminal-command">
          $ ./list_active_nodes.sh (1)
        </div>
        <div className="animation">
        </div>
        <div className="node-list">
          <div className="node-item">
            <div className="node-info">
              <div className="node-address">{'>'} Conversation </div>
            </div>
            <div className="node-actions">
              <span className="node-message-icon">✉</span>
            </div>
          </div>
        </div>
      </div>

      <div className="chat-content">
        <div className="protocol-steps">
          <div className="protocol-step">
            <div className="step-number"><span>01</span> BUY</div>
            <div className="step-command">$ ./purchase_tokens.sh</div>
            <div className="step-description">Get tokens via Dex</div>
          </div>
          
          <div className="protocol-step">
            <div className="step-number"><span>02</span> CONNECT</div>
            <div className="step-command">$ ./connect_wallet.sh</div>
            <div className="step-description">Establish secure connection<br />with Base_wallet</div>
          </div>
          
          <div className="protocol-step">
            <div className="step-number"><span>03</span> VERIFY</div>
            <div className="step-command">$ ./verify_holdings.sh</div>
            <div className="step-description">Validate token threshold<br />(1M+)</div>
          </div>
          
          <div className="protocol-step">
            <div className="step-number"><span>04</span> ACCESS</div>
            <div className="step-command">$ ./grant_access.sh</div>
            <div className="step-description">Enter secure AI chat channel</div>
          </div>
        </div>
        
        <div className="chat-container">
          <div className="chat-header">
            <div className="terminal-dots">
              <span className="terminal-dot dot-red"></span>
              <span className="terminal-dot dot-yellow"></span>
              <span className="terminal-dot dot-green"></span>
            </div>
            <div className="chat-title">secure_channel.sh</div>
          </div>
          
          <div className="chat-title-section">
          <div className="command-line">
        <h1 className="command-line" style={{ borderRight: 'none' }}>
          {displayText}<span style={{ opacity: showCursor ? 1 : 0 }}>_</span>
        </h1>
      </div>
            <div className="command-line">$ ./encrypted_comms.sh --e2e</div>
          </div>
          
          <div className="chat-messages">
            
            
            {messages.map((msg) => (
              <div key={msg.id} className="chat-message">
                <div className="message-avatar">
                  {msg.user === 'Tommy' ? (
                    <div className="avatar avatar-t">T</div>
                  ) : (
                    <div className="avatar avatar-img">
                      <img src="/avatar-placeholder.png" alt={msg.user} />
                    </div>
                  )}
                </div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-user">{`> ${msg.user}`}</span>
                    <span className="message-time">{msg.time}</span>
                  </div>
                  <p className="message-text">{msg.content}</p>
                  <div className="message-actions">
                    <button className="reply-button">Reply</button>
                    <div className="reaction-buttons">
                      {Object.entries(msg.reactions).map(([emoji, count]) => (
                        <button key={emoji} className="reaction-button">
                          <span className="emoji">{emoji}</span>
                          <span className="count">{count}</span>
                        </button>
                      ))}
                    </div>
                    <button className="add-reaction-button">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="chat-input">
            <span className="input-prompt">$</span>
            <input
              ref={messageInputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="echo &quot;message&quot; > channel"
              className="message-input"
            />
            <button 
              className="send-button"
              onClick={handleSendMessage}
            >
              <svg viewBox="0 0 24 24" className="send-icon">
                <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 