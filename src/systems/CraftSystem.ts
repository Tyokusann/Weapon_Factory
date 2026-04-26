import { WOOD_SWORD_RECIPE } from '../data/gameData';
import { InventorySystem } from './InventorySystem';

export class CraftSystem {
  constructor(private inventory: InventorySystem) {}

  canCraftWoodSword(): boolean {
    return WOOD_SWORD_RECIPE.materials.every((material) => {
      return this.inventory.getMaterialCount(material.materialId) >= material.count;
    });
  }

  craftWoodSword(): { ok: boolean; reason?: string } {
    if (this.inventory.hasWeapon('woodSword')) {
      return { ok: false, reason: '木の剣はすでに所持しています。' };
    }

    if (!this.canCraftWoodSword()) {
      return { ok: false, reason: '素材が足りません。' };
    }

    WOOD_SWORD_RECIPE.materials.forEach((material) => {
      this.inventory.consumeMaterial(material.materialId, material.count);
    });

    this.inventory.addWeapon('woodSword');
    return { ok: true };
  }
}
