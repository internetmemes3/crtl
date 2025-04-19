'use client'

import Image from 'next/image'
import Verify from "../verify";

const Cocainenomics = () => {
    return (
        <div id="cocainenomics" className="bg-black h-full w-full">
            
           
            
            <div className="relative w-full">
                <Image
                    src="/divider/powerwhitedividerbottom.png"
                    alt="Divider"
                    width={0} 
                    height={0} 
                    sizes="100vw" 
                    className="w-full h-auto object-top"
                    quality={100}
                />
                 <Verify />
            </div>

           

            <div className="flex items-center justify-center mt-20">
                <Image
                    src="/cartel/basedcartellogo.png"
                    alt="logo"
                    width={800} 
                    height={800} 
                    quality={100}
                />
            </div>

            <div className="flex items-center justify-center p-10">
                <div>
                    <Image
                        src="/cartel/NFTs.png"
                        alt="NFTs"
                        width={900} 
                        height={800}
                        unoptimized 
                    />
                </div>
            </div>

            <div className="flex items-center justify-center px-4">
                <p className="text-white text-center text-1xl font-bold">
                    Join the unstoppable movement of the cartel, where the best onchain innovators <br/> 
                    collaborate to bring you the dankest killomemes across base.
                    <br/>
                    A union for the people, a bet on the base takeover.<br/><br/>
                    Now available on secondary markets.
                </p>
            </div>
            
            <div className="flex justify-center space-x-4 sm:space-x-6 items-center py-10">
                <a href="https://magiceden.us/collections/base/0x8059ed675c394c7cb0a8302b8572e2792bacb73e" title="Visit Magic Eden" target="_blank" className="transform hover:scale-110 transition duration-300">
                    <Image
                        src="/logo/magicedenlogo.png"
                        alt="Magic Eden"
                        width={100}
                        height={100}
                    />
                </a>
                <a href="" title="Visit " target="_blank" className="transform hover:scale-110 transition duration-300">
                    <Image
                        src="/logo/opensealogo.png"
                        alt="X"
                        width={100}
                        height={100}
                    />
                </a>
            </div>
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

export default Cocainenomics;