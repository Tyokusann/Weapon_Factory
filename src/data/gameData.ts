export type MaterialId = 'wood' | 'slimeJelly';
export type WeaponId = 'stick' | 'woodSword';

export const MATERIAL_NAMES: Record<MaterialId, string> = {
  wood: '木材',
  slimeJelly: 'スライムゼリー'
};

export const WEAPONS: Record<WeaponId, { name: string; attack: number }> = {
  stick: { name: '枝', attack: 1 },
  woodSword: { name: '木の剣', attack: 3 }
};

export const WOOD_SWORD_RECIPE = {
  wood: 3,
  slimeJelly: 1
} satisfies Record<MaterialId, number>;
