// src/App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import GameControls from "./components/GameControls";
import GameBoard from "./components/GameBoard";
import { boardTiles, rollDice, movePlayer, calculateWinnings } from "./gameLogic";

export default function App() {
  // Global states
  const [walletBalance, setWalletBalance] = useState(1.0); // default 1 BTC for demo
  const [betAmount, setBetAmount] = useState(0.01);
  const [profit, setProfit] = useState(0);
  const [playerPos, setPlayerPos] = useState(0);
  const [dice, setDice] = useState([null, null]);
  const [landedTile, setLandedTile] = useState("▶");
  const [popup, setPopup] = useState(null);

  // Roll dice and move player
  const handleRollDice = () => {
    const { die1, die2, total } = rollDice();
    setDice([die1, die2]);

    const newPos = movePlayer(playerPos, total);
    setPlayerPos(newPos);

    const tile = boardTiles[newPos];
    setLandedTile(tile);

    // Calculate winnings
    const winnings = calculateWinnings(tile, betAmount);
    setProfit((prev) => prev + winnings);
    setWalletBalance((prev) => prev + winnings);

    // Show popup
    setPopup(winnings);
    setTimeout(() => setPopup(null), 2000);
  };

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col">
      {/* Navbar */}
      <Navbar walletBalance={walletBalance} />

      {/* Main content (GameControls left, GameBoard right) */}
      <div className="flex flex-1 pt-20 px-6 gap-6">
        {/* Left - Controls */}
        <div className="w-1/3">
          <GameControls
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            profit={profit}
            onRollDice={handleRollDice}
          />
        </div>

        {/* Right - Game board */}
        <div className="flex-1 flex justify-center items-center">
          <GameBoard
            tiles={boardTiles}
            playerPos={playerPos}
            dice={dice}
            landedTile={landedTile}
            popup={popup}
          />
        </div>
      </div>
    </div>
  );
}
