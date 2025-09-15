// src/components/GameControls.jsx
import React, { useState } from "react";

export default function GameControls({
  dice,
  setDice,
  playerPos,
  setPlayerPos,
  landedTile,
  setLandedTile,
  popup,
  setPopup,
  walletBalance,
  setWalletBalance,
}) {
  const [betAmount, setBetAmount] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [totalProfit, setTotalProfit] = useState(0);
  const [mode, setMode] = useState("manual");

  // Handlers (handleRoll, handleCashout, getTile) remain the same...
  const handleRoll = () => {
    if (!betAmount || betAmount <= 0) return;
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const total = die1 + die2;
    setDice([die1, die2]);
    const newPos = (playerPos + total) % 12;
    setPlayerPos(newPos);
    const tile = getTile(newPos);
    setLandedTile(tile);
    let profit = 0;
    if (tile === "🐍") {
      profit = -parseFloat(betAmount);
    } else {
      const multiplier = parseFloat(tile.replace("x", "")) || 0;
      profit = betAmount ? betAmount * multiplier - betAmount : 0;
    }
    setTotalProfit((prev) => prev + profit);
    setPopup(profit);
    setTimeout(() => setPopup(null), 2000);
  };

  const handleCashout = () => {
    if (totalProfit !== 0) {
      setWalletBalance((prev) => prev + totalProfit);
      setTotalProfit(0);
      setBetAmount("");
      setDice([null, null]);
      setPlayerPos(0);
      setLandedTile("▶");
    }
  };

  const getTile = (idx) => {
    const tiles = [
      "▶", "4.00x", "2.50x", "1.40x",
      "4.00x", "2.50x", "1.11x", "🐍",
      "1.40x", "1.11x", "🐍", "🐍"
    ];
    return tiles[idx];
  };

  return (
    // Set width, background, padding, and larger gap for the whole panel
    <div className="w-96 bg-slate-800 p-6 rounded-lg flex flex-col gap-6 text-white">
      {/* Toggle Manual / Auto - Increased padding and font size */}
      <div className="flex bg-slate-900 rounded-lg overflow-hidden">
        <button
          onClick={() => setMode("manual")}
          className={`flex-1 px-4 py-3 font-bold text-lg ${
            mode === "manual" ? "bg-slate-700 text-white" : "text-gray-400"
          }`}
        >
          Manual
        </button>
        <button
          onClick={() => setMode("auto")}
          className={`flex-1 px-4 py-3 font-bold text-lg ${
            mode === "auto" ? "bg-slate-700 text-white" : "text-gray-400"
          }`}
        >
          Auto
        </button>
      </div>

      {/* Bet Amount - Increased font size, padding, and icon size */}
      <div>
        <label className="text-base text-gray-300">Bet Amount</label>
        <div className="flex items-center bg-slate-700 rounded-lg p-3 mt-2">
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(parseFloat(e.target.value) || "")}
            className="bg-transparent flex-1 text-white outline-none text-lg"
            placeholder="0.00000000"
          />
          <span className="text-yellow-400 text-2xl">🪙</span>
        </div>
      </div>

      {/* Difficulty - Increased font size and padding */}
      <div>
        <label className="text-base text-gray-300">Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full bg-slate-700 text-white p-3 rounded-lg mt-2 text-lg"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      {/* Total Profit - Increased font size, padding, and icon size */}
      <div>
        <label className="text-base text-gray-300">Total Profit</label>
        <div className="flex items-center bg-slate-700 rounded-lg p-3 mt-2">
          <input
            type="text"
            value={totalProfit.toFixed(8)}
            className="bg-transparent flex-1 text-white outline-none text-lg"
            readOnly
          />
          <span className="text-yellow-400 text-2xl">🪙</span>
        </div>
      </div>

      {/* Roll Button - Increased padding and font size */}
      <button
        onClick={handleRoll}
        className="w-full bg-slate-600 hover:bg-slate-500 text-white py-3 rounded-lg mt-2 font-bold text-lg"
      >
        Roll
      </button>

      {/* Cashout Button - Increased padding and font size */}
      <button
        onClick={handleCashout}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold text-lg"
      >
        Cashout
      </button>
    </div>
  );
}