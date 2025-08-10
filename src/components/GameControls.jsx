import React, { useState } from "react";

export default function GameControls({ betAmount, onBet, onRoll, profit }) {
  const [input, setInput] = useState(betAmount);

  return (
    <div className="bg-slate-800 p-4 rounded-lg w-80">
      {/* Bet Amount */}
      <div className="flex justify-between items-center mb-3">
        <label className="text-white text-sm">Bet Amount</label>
        <span className="text-gray-300 text-sm">${betAmount}</span>
      </div>
      <div className="flex items-center bg-slate-700 rounded-lg p-2">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(parseFloat(e.target.value))}
          className="bg-transparent flex-1 text-white outline-none"
        />
        <span className="text-yellow-400 text-lg">🪙</span>
        <button onClick={() => setInput(input / 2)} className="ml-2 bg-slate-600 px-2 py-1 rounded text-white">½</button>
        <button onClick={() => setInput(input * 2)} className="ml-1 bg-slate-600 px-2 py-1 rounded text-white">2×</button>
      </div>

      {/* Cashout Button */}
      <button className="bg-green-500 w-full py-2 rounded-lg mt-4 font-bold cursor-pointer" onClick={() => onBet(input)}>
        Bet
      </button>

      {/* Roll Button */}
      <button className="bg-slate-600 w-full py-2 rounded-lg mt-2 font-bold text-white cursor-pointer" onClick={onRoll}>
        Roll
      </button>
      
{/* Total Profit */}
<div className="flex justify-between items-center mt-4 mb-2">
  <label className="text-white text-sm">Total Profit</label>
  <span className="text-gray-300 text-sm">${profit.toFixed(2)}</span>
</div>
<div className="flex items-center bg-slate-700 rounded-lg p-2">
  <input
    type="text"
    value={profit.toFixed(8)} 
    readOnly
    className="bg-transparent flex-1 text-white outline-none"
  />
  <span className="text-yellow-400 text-lg">🪙</span>
</div>

{/* Difficulty */}
<div className="mt-4">
  <label className="text-white text-sm">Difficulty</label>
  <div className="bg-slate-700 rounded-lg p-2 mt-1">
    <select className="bg-slate-700 w-full text-white outline-none cursor-pointer">
      <option>Medium</option>
      <option>Easy</option>
      <option>Hard</option>
    </select>
  </div>
</div>


    </div>
  );
}
