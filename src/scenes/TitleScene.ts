import Phaser from 'phaser';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#20334f');

    this.add.text(400, 170, 'Weapon Factory', {
      fontSize: '48px',
      color: '#f6f8ff'
    }).setOrigin(0.5);

    this.add.text(400, 235, 'かわいい冒険者で森を探索しよう！', {
      fontSize: '24px',
      color: '#ffd6e0'
    }).setOrigin(0.5);

    this.add.text(400, 280, '素材を集めて木の剣をクラフト', {
      fontSize: '22px',
      color: '#dce7ff'
    }).setOrigin(0.5);

    this.add.text(400, 350, 'Enter / クリックで開始', {
      fontSize: '24px',
      color: '#ffe3a5'
    }).setOrigin(0.5);

    this.input.keyboard?.once('keydown-ENTER', () => this.scene.start('FieldScene'));
    this.input.once('pointerdown', () => this.scene.start('FieldScene'));
  }
}
