import { gameState } from "../engine/state.js";
import { print } from "../engine/printer.js";

export const commands = {
  take() {
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