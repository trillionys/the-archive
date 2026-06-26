import { drawTarotCard } from "./tarotEngine.js";
import { startGameScene } from "../game/gameScene.js";

export function initTarotScene(elements) {
  const {
    tarotScreen,
    gameScreen,
    drawBtn,
    selectedCard,
    title,
    text,
    log,
  } = elements;

  drawBtn.addEventListener("click", () => {
    drawBtn.disabled = true;

    const result = drawTarotCard();

    selectedCard.querySelector("h2").textContent =
      result.card.name.toUpperCase();

    selectedCard.querySelector(".card-front p:last-child").textContent =
      result.data.orientationText;

    selectedCard.classList.remove("hidden");

    setTimeout(() => {
      selectedCard.classList.add("revealed");
    }, 700);

    setTimeout(() => {
      startGameScene(result, {
        tarotScreen,
        gameScreen,
        title,
        text,
        log,
      });
    }, 2200);
  });
}