import { gameState } from "./state.js";

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

  gameState.currentRoomId = nextRoomId;
  const nextRoom = getCurrentRoom();

  return {
    success: true,
    room: nextRoom,
  };
}