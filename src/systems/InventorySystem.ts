import type { MaterialId, WeaponId } from '../data/gameData';

export class InventorySystem {
  private materials = new Map<MaterialId, number>();
  private weapons = new Set<WeaponId>(['stick']);
  private equippedWeapon: WeaponId = 'stick';

  constructor() {
    this.materials.set('wood', 0);
    this.materials.set('slimeJelly', 0);
  }

  addMaterial(id: MaterialId, amount = 1): void {
    this.materials.set(id, this.getMaterialCount(id) + amount);
  }

  consumeMaterial(id: MaterialId, amount: number): boolean {
    const current = this.getMaterialCount(id);
    if (current < amount) return false;
    this.materials.set(id, current - amount);
    return true;
  }

  getMaterialCount(id: MaterialId): number {
    return this.materials.get(id) ?? 0;
  }

  hasWeapon(id: WeaponId): boolean {
    return this.weapons.has(id);
  }

  addWeapon(id: WeaponId): void {
    this.weapons.add(id);
    this.equippedWeapon = id;
  }

  getEquippedWeapon(): WeaponId {
    return this.equippedWeapon;
  }

  setEquippedWeapon(id: WeaponId): void {
    if (this.hasWeapon(id)) this.equippedWeapon = id;
  }
}
