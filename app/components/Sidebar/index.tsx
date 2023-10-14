"use client"
import React, { useState, useEffect } from 'react';
import { FaHome, FaUsers, FaSignOutAlt, FaFilter } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const SideBar = () => {
  const [activeItem, setActiveItem] = useState<string | null>('dashboard');
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === '/') {
      setActiveItem('dashboard');
    } else if (pathname === '/customers') {
      setActiveItem('customers');
    } else if (pathname === '/meter') {
      setActiveItem('meter');
    } else if (pathname === '/logout') {
      setActiveItem('logout');
    }
  }, []);
  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const handleLogout = () => {
    setShowPopup(true);
  };
  const handleCancel = () => {
    setShowPopup(false);
  };
  const handleContinue = () => {
  };

  return (
    <div className="h-screen flex-col lg:flex-row bg-white">
      <div className="w-64 h-full bg-blue-700 text-white p-8 transform lg:transform-none lg:translate-x-0 transition-transform duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-10">

          < Image
          src="/logo.png"
          alt="Logo"
          width={500}
          height={400}
          style={{ marginTop: '10px',marginBottom:'20px' }}
        />
        </div>
        <hr className="my-10" />
        <div className="space-y-10">
          <div
            className={`menu-item flex items-center space-x-6 p-2 rounded-lg cursor-pointer ${
              activeItem === 'dashboard' ? 'bg-blue-600 text-blue-100' : ''
            }`}
            onClick={() => handleItemClick('dashboard')}
          >
            <div
              className={`w-8 h-6 text-blue mt-1 flex items-center justify-center ${
                activeItem === 'dashboard' ? 'bg-blue-600 rounded-md' : ''
              }`}
            >
              <FaHome
                className={`w-6 h-6 ${activeItem === 'dashboard' ? 'text-blue' : 'text-blue'}`}
              />
            </div>
            <Link href="/Overview">
              <span className="font-bold text-lg">Dashboard</span>
            </Link>
          </div>
          <div
            className={`menu-item flex items-center space-x-6 p-2 rounded-lg cursor-pointer ${
              activeItem === 'customers' ? 'bg-blue-600 text-white' : ''
            }`}
            onClick={() => handleItemClick}
          >
            <div
              className={`w-8 h-8 text-blue mt-1 flex items-center justify-center ${
                activeItem === 'customers' ? 'bg-blue-600 rounded-md' : 'rounded-md'
              }`}
            >
              <FaUsers
                className={`w-6 h-6 ${activeItem === 'customers' ? 'text-white' : 'text-blue'}`}
              />
            </div>
            <Link href="/customers">
              <span className="font-bold text-lg">Customers</span>
            </Link>
          </div>
          <div
           
          >
            <div
           
            >
              
            </div>
          
          </div>
        </div>
        <div className="mb-60"></div>
        <div className="flex flex-col justify-end flex-grow mt-4 mb-4">
          <hr className="my-10" />
          <div className="mb-4"></div>
          <div
            className={`menu-item flex items-center space-x-6 p-2 rounded-lg cursor-pointer ${
              activeItem === 'logout' ? 'bg-blue-600 text-white' : ''
            }`}
           
            onClick={() => handleLogout()}
>
            <div
              className={`w-8 h-5 text-blue mt-1 flex items-center justify-center ${
                activeItem === 'logout' ? 'bg-blue-600 rounded-md' : 'rounded-md'
              }`}>
              <FaSignOutAlt
                className={`w-8 h-5 ${activeItem === 'logout' ? 'text-white' : 'text-blue'}`}
              />
            </div>
            <span className="font-bold text-lg">Logout</span>
          </div>
          {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-blue-700 p-6 rounded-md">
            <h2 className="text-lg font-medium mt-5 pb-5">Are you sure you want to log out of your account?</h2>
            <div className="flex mt-1 pb-6">
              <button className="px-16 py-3 ml-3 font-bold rounded-md   hover:border-opacity-75" onClick={handleCancel}>Cancel</button>
             <Link href="/login">
              <button className="px-16 py-3 ml-3 font-bold rounded-md bg-mainblue border-2 border-mainblue  text-blue hover:bg-opacity-75" onClick={handleContinue}>Continue</button></Link>
            </div>
          </div>
        </div>
      )}
          <div className="mb-4"></div>
          <div className="mt-2 text-lg opacity-70">@2023, Nexus All rights reserved</div>
        </div>
      </div>
      <div className="flex-grow bg-white">
        <div></div>
      </div>
    </div>
  );
};
export default SideBar;










function setShowPopup(arg0: boolean) {
  throw new Error('Function not implemented.');
}

