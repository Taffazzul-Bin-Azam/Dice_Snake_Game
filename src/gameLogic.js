// src/gameLogic.js

// Board in spiral order starting from top-left ▶️ going right, down, left, up
export const boardTiles = [
  "▶", "4.00x", "2.50x", "1.40x",
  "4.00x", "2.50x", "1.11x", "🐍",
  "1.40x", "1.11x", "🐍", "🐍"
];

// Simulate dice roll (two dice)
export function rollDice() {
  const die1 = Math.floor(Math.random() * 6);
  const die2 = Math.floor(Math.random() * 6);
  return { die1, die2, total: die1 + die2 };
}

// Get new position after moving
export function movePlayer(currentPos, moves) {
  return (currentPos + moves) % boardTiles.length;
}

// Calculate winnings
export function calculateWinnings(tile, betAmount) {
  if (tile === "🐍") return -betAmount; // loss
  const multiplier = parseFloat(tile.replace("x", "")) || 0;
  return betAmount * multiplier - betAmount; // profit (excluding original bet)
}
