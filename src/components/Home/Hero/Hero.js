'use client'
import PowderText from '../Powder';
import Image from 'next/image';
const Hero = () => {
    

    return (
      
        <div className="flex flex-col items-center justify-center bg-black pt-40">
        <PowderText text="Cartel Over Cabal" />
        <div className="relative w-full ">
        <Image
          src="/divider/powerwhitedivider.png"
          alt="Divider"
          width={0} 
          height={0} 
          sizes="100vw" 
          className="w-full h-auto object-top"
          quality={100}
        />
      </div>
      </div>
      
    );
  }
  
  export default Hero;
