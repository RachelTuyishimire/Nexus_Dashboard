import React from "react";
import Link from "next/link";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="bg-gray-200 h-screen relative overflow-hidden">
      <div className="bg-blue-700 h-[20%] w-full absolute top-0 rounded-bl-[1000px]"></div>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative">
       
          <Image
          src="/nexus.png"
          alt="Logo"
          width={500}
          height={400}
          style={{ marginTop: '10px',marginBottom:'20px', marginLeft: '32px' }}
        />
        </div>
        <p className="text-xl mb-[3%] ml-[2px]">Welcome to Nexus Customer Interface Unit</p>
        <button className="w-1/6 bg-blue-800 flex ml-[42%] mb-10 justify-center text-white p-3 rounded-full hover:bg-blue-700 text-xl font-bold mx-auto">
          <Link href='/login'>Get Started</Link>
        </button>
      </div>
      <div className="bg-blue-700 h-40 w-full rounded-tr-full">
        <div className="absolute bottom-0 left-0 h-60 w-60 bg-blue-700 rounded-tr-full"></div>
      </div>
    </div>
  );
}

export default HomePage;
