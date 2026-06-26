import { parseCommand } from "./parser.js";
import { gameState } from "./state.js";
import { print } from "./printer.js";
import { commands } from "../data/commands.js";

export function handleCommand(command) {
  const parsed = parseCommand(command);
  console.log(parsed);
  
  const cleanCommand = parsed.verb;

  if (cleanCommand === "") return;

  print(`> ${cleanCommand}`);
  gameState.commandCount++;

  if (commands[cleanCommand]) {
    commands[cleanCommand](parsed);
  } else {
    gameState.unknownWords.push(cleanCommand);
    gameState.fear += 1;

    print(createDynamicResponse(parsed));
    print("하지만 시스템은 그 단어를 기억했습니다.");
  }
}