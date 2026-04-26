import Phaser from 'phaser';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#20334f');

    this.add.text(400, 190, 'Weapon Factory', {
      fontSize: '48px',
      color: '#f6f8ff'
    }).setOrigin(0.5);

    this.add.text(400, 260, '森で素材を集めて木の剣を作ろう', {
      fontSize: '22px',
      color: '#dce7ff'
    }).setOrigin(0.5);

    this.add.text(400, 340, 'Enter / クリックで開始', {
      fontSize: '24px',
      color: '#ffe3a5'
    }).setOrigin(0.5);

    this.input.keyboard?.once('keydown-ENTER', () => this.scene.start('FieldScene'));
    this.input.once('pointerdown', () => this.scene.start('FieldScene'));
  }
}
