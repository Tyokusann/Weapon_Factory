import { WOOD_SWORD_RECIPE } from '../data/gameData';
import { InventorySystem } from './InventorySystem';

export class CraftSystem {
  constructor(private inventory: InventorySystem) {}

  canCraftWoodSword(): boolean {
    return Object.entries(WOOD_SWORD_RECIPE).every(([id, count]) => {
      return this.inventory.getMaterialCount(id as keyof typeof WOOD_SWORD_RECIPE) >= count;
    });
  }

  craftWoodSword(): { ok: boolean; reason?: string } {
    if (this.inventory.hasWeapon('woodSword')) {
      return { ok: false, reason: '木の剣はすでに所持しています。' };
    }

    if (!this.canCraftWoodSword()) {
      return { ok: false, reason: '素材が足りません。' };
    }

    this.inventory.consumeMaterial('wood', WOOD_SWORD_RECIPE.wood);
    this.inventory.consumeMaterial('slimeJelly', WOOD_SWORD_RECIPE.slimeJelly);
    this.inventory.addWeapon('woodSword');

    return { ok: true };
  }
}
