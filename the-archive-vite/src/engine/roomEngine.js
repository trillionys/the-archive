import { gameState } from "./state.js";
import { hasItem } from "./itemEngine.js";

export function loadRooms(rooms) {
  gameState.rooms = rooms;
}

export function getCurrentRoom() {
  return gameState.rooms[gameState.currentRoomId];
}

export function moveTo(direction) {
  const currentRoom = getCurrentRoom();
  const nextRoomId = currentRoom.exits[direction];

  if (!nextRoomId) {
    return {
      success: false,
      message: "그 방향으로는 이동할 수 없다.",
    };
  }

  const nextRoom = gameState.rooms[nextRoomId];

  if (nextRoom.locked && !hasItem(nextRoom.requiredItem)) {
    return {
      success: false,
      message: "문이 잠겨 있다. 원형 문양의 열쇠가 필요하다.",
    };
  }

  gameState.currentRoomId = nextRoomId;

  return {
    success: true,
    room: getCurrentRoom(),
  };
}

export function inspectObject(objectName) {
  const room = getCurrentRoom();
  const lines = room.interactions?.[objectName];

  if (!lines) {
    return {
      success: false,
      message: `${objectName}을(를) 자세히 살펴봤지만 특별한 것은 없다.`,
    };
  }

  return {
    success: true,
    lines,
  };
}