import { gameState } from "./state.js";
import { print } from "./printer.js";
import { commands } from "../data/commands.js";

export function handleCommand(command) {
  const cleanCommand = command.trim().toLowerCase();

  console.log("command keys:", Object.keys(commands));

  if (cleanCommand === "") return;

  print(`> ${cleanCommand}`);
  gameState.commandCount++;

  if (commands[cleanCommand]) {
    commands[cleanCommand]();
  } else {
    gameState.unknownWords.push(cleanCommand);
    gameState.fear += 1;

    print("알 수 없는 명령어입니다.");
    print("하지만 시스템은 그 단어를 기억했습니다.");
  }
}