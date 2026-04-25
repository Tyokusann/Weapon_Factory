import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { CraftScene } from './scenes/CraftScene';
import { FieldScene } from './scenes/FieldScene';
import { TitleScene } from './scenes/TitleScene';

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'app',
  width: 800,
  height: 600,
  backgroundColor: '#172031',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [BootScene, TitleScene, FieldScene, CraftScene]
});
