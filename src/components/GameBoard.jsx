export default function GameBoard({ tiles, playerPos, dice, landedTile, popup }) {
  return (
    // Added items-center and h-screen to center the entire board on the page
    <div className="flex justify-center items-center">
      <div className="bg-slate-900 rounded-lg flex flex-col items-center p-6">
        {/* Top row - Increased gap */}
        <div className="flex gap-6">
          {tiles.slice(0, 4).map((text, idx) => (
            <Box key={idx} text={text} active={playerPos === idx} />
          ))}
        </div>

        {/* Middle section - Increased margin-top */}
        <div className="flex mt-6">
          {/* Left column - Increased gap */}
          <div className="flex flex-col gap-6">
            <Box text={tiles[4]} active={playerPos === 4} />
            <Box text={tiles[5]} active={playerPos === 5} />
          </div>

          {/* Center area - Increased horizontal margin */}
          <div className="flex flex-col items-center mx-8 bg-slate-500 rounded-2xl p-4">
            {/* Dice - Increased gap and margin-top */}
            <div className="flex gap-4 mt-2">
              <DiceFace value={dice[0]} />
              <DiceFace value={dice[1]} />
            </div>
            {/* Multiplier display - Increased margin-top */}
            <div className="mt-6 relative">
              <CenterMultiplier text={landedTile} />
              {popup !== null && (
                <div
                  className={`absolute top-[-50px] px-4 py-2 rounded-lg text-white font-bold shadow-lg ${
                    popup >= 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {popup >= 0 ? `+${popup.toFixed(2)}` : popup.toFixed(2)}
                </div>
              )}
            </div>
          </div>

          {/* Right column - Increased gap */}
          <div className="flex flex-col gap-6">
            <Box text={tiles[6]} active={playerPos === 6} />
            <Box text={tiles[7]} active={playerPos === 7} />
          </div>
        </div>

        {/* Bottom row - Increased gap and margin-top */}
        <div className="flex gap-6 mt-6">
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
    // Increased height, width, and font size
    <div
      className={`rounded-lg flex justify-center items-center h-24 w-24 text-white font-bold text-2xl ${
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
    // Increased height, width, and font size
    <div className="bg-gray-200 rounded-lg h-20 w-20 flex justify-center items-center text-black font-bold text-7xl">
      {value ? diceSymbols[value - 1] : ""}
    </div>
  );
}

function CenterMultiplier({ text }) {
  return (
    // Increased height, width, and font size
    <div className="bg-slate-900 rounded-lg flex justify-center items-center h-16 w-40 text-white font-bold text-xl">
      {text}
    </div>
  );
}