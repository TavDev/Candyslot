console.log("Welcome to CandySlot! 🍬🎰");

// Basic scaffold for a slot spin
type Symbol = "🍒" | "🍋" | "🍉" | "🍇" | "🍭" | "🍫";

function spinReels(reels: number = 3): Symbol[] {
  const symbols: Symbol[] = ["🍒", "🍋", "🍉", "🍇", "🍭", "🍫"];
  return Array.from({ length: reels }, () => symbols[Math.floor(Math.random() * symbols.length)]);
}

function evaluateSpin(result: Symbol[]): string {
  if (new Set(result).size === 1) {
    return "Jackpot! All symbols match!";
  }
  if (new Set(result).size === 2) {
    return "Nice! Two symbols match!";
  }
  return "Try again!";
}

const result = spinReels();
console.log("Spin result:", result.join(" | "));
console.log(evaluateSpin(result));