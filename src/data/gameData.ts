import enemies from './enemies.json';
import materials from './materials.json';
import recipes from './recipes.json';
import weapons from './weapons.json';

export type MaterialId = 'wood' | 'slimeJelly';
export type WeaponId = 'stick' | 'woodSword';

export type MaterialMaster = {
  id: MaterialId;
  name: string;
  description: string;
  stackable: boolean;
};

export type WeaponMaster = {
  id: WeaponId;
  name: string;
  attack: number;
  attackSpeed: number;
  range: number;
};

export type RecipeMaster = {
  id: string;
  resultItemId: WeaponId;
  resultCount: number;
  materials: Array<{ materialId: MaterialId; count: number }>;
};

export type EnemyMaster = {
  id: 'slime';
  name: string;
  hp: number;
  contactDamage: number;
  dropTable: Array<{ materialId: MaterialId; count: number; rate: number }>;
};

export const MATERIALS = materials as MaterialMaster[];
export const WEAPONS = weapons as WeaponMaster[];
export const RECIPES = recipes as RecipeMaster[];
export const ENEMIES = enemies as EnemyMaster[];

export const WEAPON_BY_ID: Record<WeaponId, WeaponMaster> = WEAPONS.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {} as Record<WeaponId, WeaponMaster>);

export const MATERIAL_NAME_BY_ID: Record<MaterialId, string> = MATERIALS.reduce((acc, item) => {
  acc[item.id] = item.name;
  return acc;
}, {} as Record<MaterialId, string>);

export const WOOD_SWORD_RECIPE = RECIPES[0];
export const SLIME_MASTER = ENEMIES[0];
