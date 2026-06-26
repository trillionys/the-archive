import { deck } from "./deck.js";

export function drawTarotCard() {
  const card = deck[Math.floor(Math.random() * deck.length)];
  const orientation = Math.random() < 0.5 ? "upright" : "reversed";

  return {
    card,
    orientation,
    data: card[orientation],
  };
}