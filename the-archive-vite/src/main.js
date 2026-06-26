import { initPrinter } from "./engine/printer.js";
import { handleCommand } from "./engine/commandEngine.js";
import "./style.css";
const commandArea = document.getElementById("commandArea");
const commandInput = document.getElementById("commandInput");
const commandBtn = document.getElementById("commandBtn");
const title = document.getElementById("title");
const text = document.getElementById("text");
const startBtn = document.getElementById("startBtn");
const log = document.getElementById("log");
initPrinter(log);

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
  "출구는 처음부터 없었다."
];

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function makeSeed() {
  return Math.floor(100000 + Math.random() * 900000);
}

startBtn.addEventListener("click", () => {
  const seed = makeSeed();

  const world = pick(worlds);
  const identity = pick(identities);
  const enemy = pick(enemies);
  const goal = pick(goals);
  const secret = pick(secrets);

  title.textContent = "ARCHIVE OPENED";
  text.textContent = `WORLD SEED: ${seed}`;
  startBtn.style.display = "none";

  log.classList.remove("hidden");

  log.innerHTML = `
    <p>> 위치: ${world}</p>
    <p>> 사용자 분류: ${identity}</p>
    <p>> 위협 요소: ${enemy}</p>
    <p>> 목표: ${goal}</p>
    <br />
    <p class="glitch">숨겨진 기록을 복원 중...</p>
  `;

  setTimeout(() => {
    log.innerHTML += `
      <br />
      <p>> 복원된 문장:</p>
      <p>"${secret}"</p>
      <br />
      <p>> 다음 명령을 기다리는 중...</p>
    `;
    commandArea.classList.remove("hidden");
  }, 2500)
  ;
});
const gameState = {
  reality: 100,
  fear: 0,
  knowledge: 1,
  commandCount: 0,
  unknownWords: []
};
const commands = {
  help() {
    print("사용 가능한 명령어: help, look, open, remember, status");
  },

  look() {
    print("주변을 살핀다. 벽에는 오래된 문장이 새겨져 있다.");
    print('"기록은 사라지지 않는다. 다만 주인을 바꿀 뿐."');
  },

  open() {
    print("문을 열었다.");
    print("하지만 열린 것은 문이 아니라, 또 다른 기록이었다.");
  },

  remember() {
    print("기억 복구 중...");
    print("실패. 원인: 사용자가 존재하지 않음.");
  },

  status() {
  print(`REALITY: ${gameState.reality}`);
  print(`FEAR: ${gameState.fear}`);
  print(`KNOWLEDGE: ${gameState.knowledge}`);
  print(`COMMANDS: ${gameState.commandCount}`);
  },
};

function print(message) {
  log.innerHTML += `<p>${message}</p>`;
  log.scrollTop = log.scrollHeight;
}

function handleCommand() {
  const command = commandInput.value.trim().toLowerCase();

  if (command === "") return;

  print(`> ${command}`);
  gameState.commandCount++;

  if (commands[command]) {
    commands[command]();
  } else {
  gameState.unknownWords.push(command);
  gameState.fear += 1;

  print("알 수 없는 명령어입니다.");
  print("하지만 시스템은 그 단어를 기억했습니다.");
  }

  commandInput.value = "";
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

commandInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleCommand();
  }
});

commandBtn.addEventListener("click", handleCommand);

commandInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleCommand();
  }
});
