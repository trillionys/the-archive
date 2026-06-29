import { gameState } from "./state.js";

export function loadItems(items) {
  gameState.items = items;
}

export function getItemsInCurrentRoom() {
  return Object.values(gameState.items).filter(
    (item) => item.location === gameState.currentRoomId
  );
}

export function findItemByName(name) {
  return Object.values(gameState.items).find((item) =>
    item.aliases.includes(name)
  );
}

export function takeItem(name) {
  const item = findItemByName(name);

  if (!item || item.location !== gameState.currentRoomId) {
    return {
      success: false,
      message: `${name}은(는) 이곳에 없다.`,
    };
  }

  item.location = "inventory";
  gameState.inventory.push(item.id);

  return {
    success: true,
    item,
  };
}

export function hasItem(itemId) {
  return gameState.inventory.includes(itemId);
}

export function getInventoryItems() {
  return gameState.inventory.map((id) => gameState.items[id]);
}