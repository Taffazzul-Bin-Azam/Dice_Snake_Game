// src/components/Navbar.jsx
import React, { useState } from "react";
import { FaUser, FaBell, FaWallet } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { SiBitcoinsv, SiEthereum, SiLitecoin } from "react-icons/si";

const Navbar = ({ walletBalance }) => {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [showDropdown, setShowDropdown] = useState(false);

  const cryptoIcons = {
    BTC: <SiBitcoinsv className="text-orange-400" />,
    ETH: <SiEthereum className="text-blue-400" />,
    LTC: <SiLitecoin className="text-gray-300" />,
  };

  return (
    <div className="w-full flex justify-center bg-slate-900 py-3 fixed top-0 left-0 z-50">
      {/* Navbar container */}
      <nav className="bg-slate-800 px-4 py-2 rounded-md flex items-center gap-4 shadow-md w-[90%] justify-between">
        
        {/* Left: Logo */}
        <div className="text-white font-bold text-2xl italic">Snake Dice</div>

        {/* Balance Box with Dropdown */}
        <div
          className="relative flex items-center bg-slate-700 rounded px-3 py-1 cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="text-white font-mono mr-2">
            {walletBalance.toFixed(8)}
          </span>
          {cryptoIcons[selectedCrypto]}
          <IoMdArrowDropdown className="text-white ml-1" />

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute top-full left-0 mt-2 bg-slate-800 rounded-lg shadow-lg text-white w-full">
              <div
                className="flex items-center gap-2 px-3 py-2 hover:bg-slate-700 cursor-pointer"
                onClick={() => {
                  setSelectedCrypto("BTC");
                  setShowDropdown(false);
                }}
              >
                <SiBitcoinsv className="text-orange-400" /> BTC
              </div>
              <div
                className="flex items-center gap-2 px-3 py-2 hover:bg-slate-700 cursor-pointer"
                onClick={() => {
                  setSelectedCrypto("ETH");
                  setShowDropdown(false);
                }}
              >
                <SiEthereum className="text-blue-400" /> ETH
              </div>
              <div
                className="flex items-center gap-2 px-3 py-2 hover:bg-slate-700 cursor-pointer"
                onClick={() => {
                  setSelectedCrypto("LTC");
                  setShowDropdown(false);
                }}
              >
                <SiLitecoin className="text-gray-300" /> LTC
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Wallet, User, Bell */}
        <div className="flex items-center gap-4">
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
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
