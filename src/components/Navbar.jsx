// src/components/Navbar.jsx
import React, { useState } from "react";
import { FaUser, FaBell, FaWallet, FaBitcoin, FaEthereum } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("BTC");

  const coins = [
    { symbol: "BTC", icon: <FaBitcoin className="text-orange-400 mr-2" /> },
    { symbol: "ETH", icon: <FaEthereum className="text-purple-400 mr-2" /> },
  ];

  return (
    <div className="w-full flex justify-center bg-slate-900 py-3 fixed top-0 left-0 z-50">
      {/* Navbar container */}
      <nav className="bg-slate-800 px-4 py-2 rounded-md flex items-center gap-4 shadow-md">
        
        {/* Left: Logo */}
        <div className="text-white font-bold text-2xl italic">S</div>

        {/* Balance Box with Dropdown */}
        <div className="relative">
          <div
            className="flex items-center bg-slate-700 rounded px-3 py-1 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="text-white font-mono mr-2">0.00000000</span>
            {coins.find(c => c.symbol === selectedCoin)?.icon}
            <IoMdArrowDropdown className="text-white" />
          </div>

          {showDropdown && (
            <div className="absolute mt-1 w-full bg-slate-700 rounded shadow-lg z-10">
              {coins.map((coin) => (
                <div
                  key={coin.symbol}
                  className="flex items-center px-3 py-2 hover:bg-slate-600 cursor-pointer"
                  onClick={() => {
                    setSelectedCoin(coin.symbol);
                    setShowDropdown(false);
                  }}
                >
                  {coin.icon}
                  <span className="text-white">{coin.symbol}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Wallet Button */}
        <button className="p-2 bg-blue-500 rounded">
          <FaWallet className="text-white" />
        </button>

        {/* User Icon */}
        <FaUser className="text-white cursor-pointer" />

        {/* Bell Icon with Notification Dot */}
        <div className="relative cursor-pointer">
          <FaBell className="text-white" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
