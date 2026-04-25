import Phaser from 'phaser';
import { WOOD_SWORD_RECIPE } from '../data/gameData';
import { craftSystem, gameStore } from '../systems/GameStore';

export class CraftScene extends Phaser.Scene {
  private statusText?: Phaser.GameObjects.Text;

  constructor() {
    super('CraftScene');
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#121821');

    const recipe = `必要素材: 木材 x${WOOD_SWORD_RECIPE.wood} / スライムゼリー x${WOOD_SWORD_RECIPE.slimeJelly}`;
    this.add.text(400, 120, 'クラフト工房', { fontSize: '40px', color: '#f6f8ff' }).setOrigin(0.5);
    this.add.text(400, 210, 'レシピ: 木の剣', { fontSize: '30px', color: '#ffe3a5' }).setOrigin(0.5);
    this.add.text(400, 260, recipe, { fontSize: '22px', color: '#d4e2ff' }).setOrigin(0.5);

    this.statusText = this.add.text(400, 330, '', { fontSize: '22px', color: '#9cf29f' }).setOrigin(0.5);
    this.updateStatus();

    this.add.text(400, 430, 'Enter: クラフト / ESC or C: 戻る', { fontSize: '20px', color: '#c8d6f3' }).setOrigin(0.5);

    this.input.keyboard?.on('keydown-ENTER', () => {
      const result = craftSystem.craftWoodSword();
      if (result.ok) {
        this.statusText?.setColor('#9cf29f').setText('木の剣を作成しました！(自動装備)');
      } else {
        this.statusText?.setColor('#ff9f9f').setText(result.reason ?? 'クラフト失敗');
      }
      this.updateStatus();
    });

    this.input.keyboard?.on('keydown-ESC', () => this.backToField());
    this.input.keyboard?.on('keydown-C', () => this.backToField());
  }

  private updateStatus(): void {
    const inv = gameStore.inventory;
    const baseText = `所持: 木材 ${inv.getMaterialCount('wood')} / ゼリー ${inv.getMaterialCount('slimeJelly')} / 装備: ${inv.getEquippedWeapon() === 'woodSword' ? '木の剣' : '枝'}`;
    this.statusText?.setText(baseText);
  }

  private backToField(): void {
    this.scene.start('FieldScene');
  }
}
