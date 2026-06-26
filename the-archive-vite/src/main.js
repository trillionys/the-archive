import "./style.css";
import { drawTarotCard } from "./tarot/tarotEngine.js";
import { createSeedEngine } from "./engine/seedEngine.js";
import { initPrinter } from "./engine/printer.js";
import { handleCommand } from "./engine/commandEngine.js";

const tarotScreen = document.getElementById("tarotScreen");
const gameScreen = document.getElementById("gameScreen");
const drawBtn = document.getElementById("drawBtn");
const cardSpread = document.getElementById("cardSpread");
const drawResult = document.getElementById("drawResult");

const title = document.getElementById("title");
const text = document.getElementById("text");
const startBtn = document.getElementById("startBtn");
const log = document.getElementById("log");
const commandArea = document.getElementById("commandArea");
const commandInput = document.getElementById("commandInput");
const commandBtn = document.getElementById("commandBtn");
const selectedCard = document.getElementById("selectedCard");

initPrinter(log);
function createCardSpread() {
  cardSpread.innerHTML = "";

  for (let i = 0; i < 156; i++) {
    const card = document.createElement("button");
    card.className = "tarot-card";
    card.style.setProperty("--i", i);
    card.innerHTML = `<span></span>`;
    cardSpread.appendChild(card);
  }

  cardSpread.classList.remove("hidden");
}

const worlds = ["폐쇄된 연구소", "심해 기지", "버려진 학교", "우주선", "지하 도시", "AI 서버"];
const identities = ["실험체", "연구원", "침입자", "생존자", "기록 관리자", "이미 삭제된 사용자"];
const enemies = ["AI", "미래의 자신", "정체불명의 생명체", "기억", "정부 기관", "아무도 없음"];
const goals = ["탈출", "진실 찾기", "누군가 구하기", "기억 복구", "시스템 종료", "마지막 기록 발견"];
const secrets = [
  "이곳은 이미 17년 전에 폐쇄되었다.",
  "당신은 처음 온 것이 아니다.",
  "모든 기록은 조작되었다.",
  "구조 요청은 안쪽에서 온 것이 아니다.",
  "관리자는 인간이 아니다.",
  "출구는 처음부터 없었다.",
];

function makeSeed() {
  return Math.floor(100000 + Math.random() * 900000);
}

drawBtn.addEventListener("click", () => {
  console.log("DRAW clicked");

  drawBtn.disabled = true;
  selectedCard.classList.remove("hidden");

  setTimeout(() => {
    console.log("CARD reveal");
    selectedCard.classList.add("revealed");
  }, 700);

  setTimeout(() => {
    console.log("START world");
    const result = drawTarotCard();
    startWorldFromCard(result);
  }, 2200);
});

function startWorldFromCard(result) {
  const card = result.card;
  const data = result.data;

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


commandBtn.addEventListener("click", () => {
  handleCommand(commandInput.value);
  commandInput.value = "";
});

commandInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleCommand(commandInput.value);
    commandInput.value = "";
  }
});