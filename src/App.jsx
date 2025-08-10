// App.jsx
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import GameBoard from "./components/GameBoard";
import GameControls from "./components/GameControls";
import { boardTiles, rollDice, movePlayer, calculateWinnings } from "./gameLogic";

export default function App() {
  const [balance, setBalance] = useState(100);
  const [betAmount, setBetAmount] = useState(0);
  const [dice, setDice] = useState([1, 1]);
  const [playerPos, setPlayerPos] = useState(0);
  const [profit, setProfit] = useState(0);
  const [landedTile, setLandedTile] = useState("1.00x");
  const [popup, setPopup] = useState(null);

  const handleBet = (amount) => {
    setBetAmount(amount);
  };

  const handleRoll = () => {
    if (betAmount <= 0 || betAmount > balance) return;

    // Animate dice for 1 second
    let ticks = 0;
    const interval = setInterval(() => {
      setDice([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]);
      ticks++;
      if (ticks > 10) {
        clearInterval(interval);

        // Final roll
        const { die1, die2, total } = rollDice();
        setDice([die1, die2]);

        // Move and update
        const newPos = movePlayer(playerPos, total);
        setPlayerPos(newPos);

        const tile = boardTiles[newPos];
        setLandedTile(tile);

        const result = calculateWinnings(tile, betAmount);
        setProfit(result);
        setBalance((prev) => prev + result);

        // Show popup
        setPopup(result);
        setTimeout(() => setPopup(null), 2000);
      }
    }, 80);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center">
      <Navbar balance={balance} />
      <GameBoard
        tiles={boardTiles}
        playerPos={playerPos}
        dice={dice}
        landedTile={landedTile}
        popup={popup}
      />
      <GameControls
        betAmount={betAmount}
        onBet={handleBet}
        onRoll={handleRoll}
        profit={profit}
      />
    </div>
  );
}