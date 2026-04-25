import { CraftSystem } from './CraftSystem';
import { InventorySystem } from './InventorySystem';

export const gameStore = {
  inventory: new InventorySystem()
};

export const craftSystem = new CraftSystem(gameStore.inventory);
