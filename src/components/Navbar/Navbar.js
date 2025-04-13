"use client";

import React, { useState } from 'react';
import { Link } from 'react-scroll';
import Image from 'next/image'

const Navbar = () => {
  const [showIframe, setShowIframe] = useState(false);

  const navItems = [
    { name: 'About', to: 'about-section' },
    { name: 'FAQ', to: 'faq-section' },
    { name: 'Terminal', to: 'terminal-section' },
    { name: 'NFTs', to: 'nfts-section' },
  ];

  return (
    <>
      <div className="w-full flex justify-center mt-2 font-mono">
        <nav className="flex items-center bg-[#1C1C1C] text-white p-2 px-4 rounded-full shadow-lg space-x-6">
          <div className="flex-shrink-0">
            <Image 
              src="/logo.png"
              alt="logo"
              width={36}
              height={36}
              className="rounded-full"
            />
          </div>

          <ul className="flex items-center space-x-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.to} 
                  spy={true} 
                  smooth={true} 
                  offset={-70}
                  duration={500} 
                  className="cursor-pointer hover:text-gray-400 uppercase text-sm tracking-wider"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <button 
            onClick={() => setShowIframe(true)}
            className="bg-gray-600 hover:bg-gray-500 text-white px-5 py-2 rounded-full uppercase text-sm tracking-wider"
          >
            Buy Now
          </button>
        </nav>
      </div>

      {showIframe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="relative bg-white p-4 rounded-lg">
            <button 
              onClick={() => setShowIframe(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <iframe
              width="400"
              height="720"
              style={{ border: 0 }}
              allow="clipboard-read *; clipboard-write *; web-share *; accelerometer *; autoplay *; camera *; gyroscope *; payment *; geolocation *"
              src="https://flooz.xyz/embed/trade?swapDisabled=true&swapNetwork=eth&swapLockToToken=false&onRampDisabled=false&onRampNetwork=base&onRampAsDefault=false&onRampTokenAddress=0xe9f67c8fcc54b307a95bf881736916f70180ee77&onRampLockToken=true&network=eth&lightMode=true&backgroundColor=transparent&miniappIntent=swap"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
