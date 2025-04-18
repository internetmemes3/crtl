'use client'
import Image from "next/image";
// Removed unused imports useEffect, useRef

const Arcade = () => {

  const socials = ['Twitter', 'Farcaster', 'Telegram', 'Instagram'];
  const info = ['Coinmarketcap', 'Coingecko', 'Dexscreener', 'Uniswap', 'OKX Wallet', 'Flooz'];
  const links = ['Terminal', 'Based Cartel'];

  const Section = ({ title, items }) => (
    <div>
      <h3 className="bg-black text-white py-1 px-3 inline-block mb-4 font-mono text-lg font-semibold">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="font-mono text-black text-md">{item}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div id="arcade" className="bg-white py-16 px-4 md:px-8 font-mono">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-20">
          <Section title="SOCIALS" items={socials} />
          <Section title="INFO" items={info} />
          <Section title="LINKS" items={links} />
        </div>

        <div className="text-center overflow-hidden">

           <h1 
             className="font-fuel-decay font-normal text-black tracking-tighter uppercase" 
             style={{ fontSize: '17vw', lineHeight: '0.8' }}
           >
             $CRTL
           </h1>
        </div>
      </div>
    </div>
  );
}

export default Arcade;