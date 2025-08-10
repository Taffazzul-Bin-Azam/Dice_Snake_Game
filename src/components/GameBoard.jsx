export default function GameBoard({ tiles, playerPos, dice, landedTile, popup }) {
  
    return (
    <div className="flex justify-center pt-15 relative">
      <div className="bg-slate-900 p-3 rounded-lg flex flex-col items-center">
        {/* Top row */}
        <div className="flex gap-5">
          {tiles.slice(0, 4).map((text, idx) => (
            <Box key={idx} text={text} active={playerPos === idx} />
          ))}
        </div>

        {/* Middle section */}
        <div className="flex mt-3">
          {/* Left column */}
          <div className="flex flex-col gap-3">
            <Box text={tiles[4]} active={playerPos === 4} />
            <Box text={tiles[5]} active={playerPos === 5} />
          </div>

          {/* Center area */}
          <div className="flex flex-col items-center mx-6 bg-slate-500 rounded-2xl p-1">
            {/* Dice */}
            <div className="flex gap-4 mt-2">
              <DiceFace value={dice[0]} />
              <DiceFace value={dice[1]} />
            </div>
            {/* Multiplier display */}
            <div className="mt-4 relative ">
              <CenterMultiplier text={landedTile} />
              {popup !== null && (
                <div
                  className={`absolute top-[-40px] px-3 py-1 rounded-lg text-white font-bold shadow-lg ${
                    popup >= 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {popup >= 0 ? `+${popup.toFixed(2)}` : popup.toFixed(2)}
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-3">
            <Box text={tiles[6]} active={playerPos === 6} />
            <Box text={tiles[7]} active={playerPos === 7} />
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex gap-5 mt-3">
          {tiles.slice(8).map((text, idx) => (
            <Box key={idx + 8} text={text} active={playerPos === idx + 8} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Box({ text, active }) {
  return (
    <div
      className={`rounded-lg flex justify-center items-center h-16 w-16 text-white font-bold ${
        active ? "bg-yellow-500" : "bg-slate-700"
      }`}
    >
      {text}
    </div>
  );
}

function DiceFace({ value }) {
  const diceSymbols = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  return (
    <div className="bg-gray-200 rounded-lg h-15 w-15 flex justify-center items-center text-black font-bold text-5xl">
      {value ? diceSymbols[value - 1] : ""}
    </div>
  );
}

function CenterMultiplier({ text }) {
  return (
    <div className="bg-slate-900 rounded-lg flex justify-center items-center h-12 w-30 text-white font-bold ">
      {text}
    </div>
  );
}
