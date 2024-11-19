import { HeaderGeneralUser } from "../components/index";
import React, { useState, useEffect } from 'react'
import { Button, Navbar } from 'flowbite-react'
import { FaCar } from "react-icons/fa";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen !bg-gradient-to-b from-[#63E72E] to-[#1F261C]">
      <HeaderGeneralUser />
      <main className="container mx-auto px-4 py-8 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="ml-32 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 text-white">
              RTMS ‘s
            </h1>
            <p className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Go anywhere,
            </p>
            <p className="text-4xl md:text-5xl font-bold mb-4 text-white">
              see anytime! <FaCar className="inline-block text-black" />
            </p>
            <Button className="bg-[#256DC0] text-white" size="xl">Download</Button>
          </div>
          <div className="relative">
            <img className="absolute bottom-0" src="/public/hexagon.svg" />
          </div>
          <div className="flex justify-center mr-32 md:justify-end space-x-4">
            <img
              src="/public/appMobile.svg"
              alt="Phone 1"
              width={200}
              height={400}
              className="w-1/2 max-w-[200px] object-contain"
            />
            <img
              src="/public/appMobile2.svg"
              alt="Phone 2"
              width={200}
              height={400}
              className="w-1/2 max-w-[200px] object-contain mt-8 md:mt-16"
            />
          </div>
        </div>
      </main>
    </div>
  );
}