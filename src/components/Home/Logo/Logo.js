import Image from "next/image";

const Logo = () => {
    return (
        <div className="bg-white">
           <div className="flex justify-center items-center space-x-10 py-2">
    <a href="https://coinmarketcap.com/currencies/peplo-escobar/" title="Visit Coinmarketcap" target="_blank" className="transform hover:scale-110 transition duration-300">
    <Image
      src="/logo/coinmarketcap-logo.png"
      alt="coinmarketcap"
      width={300} 
      height={200} 
      className="object-contain" 
    />
    </a>

    <a href="https://dexscreener.com/base/0x5e5344baF5fBCac1269C7f860500198052B4E4D0" title="Visit Dexscreener" target="_blank" className="transform hover:scale-110 transition duration-300">
    <Image
      src="/logo/dexscreener.png"
      alt="dexscreener"
      width={250} 
      height={150} 
      className="object-contain"
    />
    </a>
      <a href="https://www.dextools.io/app/en/base/pair-explorer/0x5e5344baf5fbcac1269c7f860500198052b4e4d0?t=1731545032991" title="Visit Dextools" target="_blank" className="transform hover:scale-110 transition duration-300">
      <Image
        src="/logo/dextools.png"
        alt="dextools"
        width={200} 
        height={100}   
        className="object-contain" 
      />
    </a>

<a href="https://app.uniswap.org/explore/tokens/base/0xe9f67c8fcc54b307a95bf881736916f70180ee77" title="Visit Uniswap" target="_blank" className="transform hover:scale-110 transition duration-300">
<Image
        src="/logo/Uniswap-Logo-PNG.png"
        alt="Uniswap"
        width={200} 
        height={100}   
        className="object-contain" 
      />
      </a>
      <a href="https://flooz.xyz/basedpeplo" title="Visit Flooz" target="_blank" className="transform hover:scale-110 transition duration-300">
      <Image
        src="/logo/flooz-full-black.png"
        alt="flooz"
        width={200} 
        height={100}   
        className="object-contain" 
      />
      </a>
      <a href="https://www.okx.com/ul/okPNL7e" title="Visit OKX" target="_blank" className="transform hover:scale-110 transition duration-300">
      <Image
        src="/logo/OKX.png"
        alt="OKX"
        width={100} 
        height={50}   
        className="object-contain" 
      />
      </a>
      </div>
        </div>
    );
}

export default Logo;