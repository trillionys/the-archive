import { createSemanticResponse } from "./semanticResponse.js";
import { getCurrentRoom } from "./roomEngine.js";
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
    if (gameState.worldCommands[cleanCommand]) {
  const lines = gameState.worldCommands[cleanCommand](parsed);

  lines.forEach((line) => {
    print(line);
  });

  return;
  }
    commands[cleanCommand](parsed);
  } else {
    gameState.unknownWords.push(cleanCommand);
    gameState.fear += 1;

    const room = getCurrentRoom();
    print(createSemanticResponse(parsed, room));
  }
}