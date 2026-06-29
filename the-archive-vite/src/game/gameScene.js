import { theWorldCommands } from "../worlds/theWorld/commands.js";
import { gameState } from "../engine/state.js";
import { loadItems } from "../engine/itemEngine.js";
import { theWorldItems } from "../worlds/theWorld/items.js";
import { loadRooms } from "../engine/roomEngine.js";
import { theWorldRooms } from "../worlds/theWorld/rooms.js";
import { applyTheme } from "../ui/theme.js";

export function startGameScene(result, elements) {
  const { tarotScreen, gameScreen, title, text, log } = elements;
  const card = result.card;
  const data = result.data;

  applyTheme(card.theme);
  loadRooms(theWorldRooms);
  loadItems(theWorldItems);
  gameState.worldCommands = theWorldCommands;

  tarotScreen.style.display = "none";
  gameScreen.style.display = "block";
  gameScreen.classList.remove("hidden");

  title.textContent = data.title;
  text.textContent = `${card.name} — ${data.orientationText}`;

  log.innerHTML = `
    <p>> 위치: ${data.world.location}</p>
    <p>> 사용자 분류: ${data.world.identity}</p>
    <p>> 위협 요소: ${data.world.threat}</p>
    <p>> 목표: ${data.world.goal}</p>
    <br />
    ${data.opening.map((line) => `<p>${line}</p>`).join("")}
    <br />
    <p>> 다음 명령을 기다리는 중...</p>
  `;
}