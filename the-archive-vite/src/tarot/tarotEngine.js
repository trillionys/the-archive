import { deck } from "./deck.js";

export function drawTarotCard() {
  const card = deck[0];

  return {
    card,
    orientation: "upright",
    data: card.upright,
  };
}