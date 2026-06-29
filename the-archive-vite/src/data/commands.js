import { gameState } from "../engine/state.js";
import { print } from "../engine/printer.js";
import { getCurrentRoom, moveTo } from "../engine/roomEngine.js";
import {
  getItemsInCurrentRoom,
  takeItem,
  getInventoryItems,
} from "../engine/itemEngine.js";

function printRoom(room) {
  print(`[${room.name}]`);
  print(room.description);

  const items = getItemsInCurrentRoom();

  if (items.length > 0) {
    print("보이는 물건:");
    items.forEach((item) => {
      print(`- ${item.name}`);
    });
  }

  const exits = Object.keys(room.exits).join(", ");
  print(`이동 가능: ${exits}`);
}

function runRoomEvent(room, eventName) {
  const eventText = room.events?.[eventName];

  if (!eventText) return;

  const eventKey = `${room.id}:${eventName}`;

  if (gameState.seenEvents[eventKey]) return;

  print(eventText);
  gameState.seenEvents[eventKey] = true;
}

export const commands = {
  help() {
    print("사용 가능한 명령어:");
    print("help");
    print("look");
    print("go north / go south / go east / go west");
    print("take brass key");
    print("inventory");
    print("status");
    print("remember");
  },

  look() {
    const room = getCurrentRoom();

    printRoom(room);
    runRoomEvent(room, "firstLook");
  },

  go(parsed) {
    if (!parsed.object) {
      print("어느 방향으로 이동할까?");
      return;
    }

    const result = moveTo(parsed.object);

    if (!result.success) {
      print(result.message);
      return;
    }

    printRoom(result.room);
    runRoomEvent(result.room, "enter");
  },

  take(parsed) {
    if (!parsed.object) {
      print("무엇을 가져갈까?");
      return;
    }

    const result = takeItem(parsed.object);

    if (!result.success) {
      print(result.message);
      return;
    }

    print(`${result.item.name}을(를) 획득했다.`);
  },

  inventory() {
    const items = getInventoryItems();

    if (items.length === 0) {
      print("인벤토리가 비어 있다.");
      return;
    }

    print("=== INVENTORY ===");

    items.forEach((item) => {
      print(`- ${item.name}`);
    });
  },

  status() {
    print(`REALITY: ${gameState.reality}`);
    print(`FEAR: ${gameState.fear}`);
    print(`KNOWLEDGE: ${gameState.knowledge}`);
    print(`COMMANDS: ${gameState.commandCount}`);
  },

  remember() {
    print("기억 복구 중...");
    print("실패. 원인: 사용자가 존재하지 않음.");
  },

  open() {
    print("문을 열려면 방향으로 이동해 보라.");
    print("예: go east");
  },
};