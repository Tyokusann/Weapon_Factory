import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create(): void {
    const playerGfx = this.add.graphics();
    playerGfx.fillStyle(0xffd7c2, 1);
    playerGfx.fillRoundedRect(2, 4, 20, 18, 6);
    playerGfx.fillStyle(0x6ac7ff, 1);
    playerGfx.fillRoundedRect(2, 14, 20, 10, 4);
    playerGfx.fillStyle(0x2b2d42, 1);
    playerGfx.fillCircle(8, 11, 2);
    playerGfx.fillCircle(16, 11, 2);
    playerGfx.fillStyle(0xff8da1, 1);
    playerGfx.fillCircle(6, 14, 1.5);
    playerGfx.fillCircle(18, 14, 1.5);
    playerGfx.generateTexture('player', 24, 24);
    playerGfx.destroy();

    const slimeGfx = this.add.graphics();
    slimeGfx.fillStyle(0x97f08a, 1);
    slimeGfx.fillCircle(14, 15, 13);
    slimeGfx.fillStyle(0xffffff, 1);
    slimeGfx.fillCircle(10, 12, 2.5);
    slimeGfx.fillCircle(18, 12, 2.5);
    slimeGfx.fillStyle(0x293241, 1);
    slimeGfx.fillCircle(10, 12, 1.2);
    slimeGfx.fillCircle(18, 12, 1.2);
    slimeGfx.fillStyle(0xff8fab, 1);
    slimeGfx.fillEllipse(14, 18, 5, 2);
    slimeGfx.generateTexture('slime', 28, 28);
    slimeGfx.destroy();

    const nodeGfx = this.add.graphics();
    nodeGfx.fillStyle(0x81512f, 1);
    nodeGfx.fillCircle(10, 12, 9);
    nodeGfx.fillStyle(0x9c6b3d, 1);
    nodeGfx.fillCircle(10, 12, 6.5);
    nodeGfx.fillStyle(0x5f3a20, 1);
    nodeGfx.fillCircle(10, 12, 2.5);
    nodeGfx.fillStyle(0x4cbf6b, 1);
    nodeGfx.fillCircle(6, 5, 2.5);
    nodeGfx.fillCircle(13, 4, 2.5);
    nodeGfx.generateTexture('woodNode', 20, 22);
    nodeGfx.destroy();

    this.scene.start('TitleScene');
  }
}
