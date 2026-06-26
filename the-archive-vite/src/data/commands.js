import { getCurrentRoom, moveTo } from "../engine/roomEngine.js";
import { gameState } from "../engine/state.js";
import { print } from "../engine/printer.js";

export const commands = {
  take(parsed) {
  if (parsed.object !== "flashlight") {
    print(`${parsed.object}은(는) 가져갈 수 없다.`);
    return;
  }

  gameState.inventory.push("flashlight");
  print("손전등을 획득했다.");
},

  help() {
  print("사용 가능한 명령어:");
  print("help");
  print("look");
  print("open");
  print("remember");
  print("status");
  print("take");
  },

  look() {
  const room = getCurrentRoom();

  print(`[${room.name}]`);
  print(room.description);

  const exits = Object.keys(room.exits).join(", ");
  print(`이동 가능: ${exits}`);
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

  go(parsed) {
  const direction = parsed.object;
  const result = moveTo(direction);

  if (!result.success) {
    print(result.message);
    return;
  }

  print(`[${result.room.name}]`);
  print(result.room.description);

  const exits = Object.keys(result.room.exits).join(", ");
  print(`이동 가능: ${exits}`);
  },
};