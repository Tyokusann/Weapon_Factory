import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create(): void {
    const playerGfx = this.add.graphics();
    playerGfx.fillStyle(0x7bdff2, 1);
    playerGfx.fillRect(0, 0, 24, 24);
    playerGfx.generateTexture('player', 24, 24);
    playerGfx.destroy();

    const slimeGfx = this.add.graphics();
    slimeGfx.fillStyle(0x7ee081, 1);
    slimeGfx.fillCircle(14, 14, 14);
    slimeGfx.generateTexture('slime', 28, 28);
    slimeGfx.destroy();

    const nodeGfx = this.add.graphics();
    nodeGfx.fillStyle(0xa86f33, 1);
    nodeGfx.fillCircle(10, 10, 10);
    nodeGfx.generateTexture('woodNode', 20, 20);
    nodeGfx.destroy();

    this.scene.start('TitleScene');
  }
}
