import Phaser from 'phaser';
import { WEAPONS } from '../data/gameData';
import { gameStore } from '../systems/GameStore';

export class FieldScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private slime?: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: { [key: string]: Phaser.Input.Keyboard.Key };
  private hpText?: Phaser.GameObjects.Text;
  private infoText?: Phaser.GameObjects.Text;
  private playerHp = 10;
  private enemyHp = 6;
  private lastAttackAt = 0;
  private lastTakenDamageAt = 0;

  constructor() {
    super('FieldScene');
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#2f5d3a');

    this.player = this.physics.add.sprite(120, 280, 'player');
    this.player.setCollideWorldBounds(true);

    this.spawnSlime(520, 320);

    const woodNodes = this.physics.add.staticGroup();
    [
      { x: 240, y: 190 },
      { x: 170, y: 460 },
      { x: 640, y: 130 },
      { x: 620, y: 460 }
    ].forEach((pos) => woodNodes.create(pos.x, pos.y, 'woodNode').setData('collected', false));

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = this.input.keyboard!.addKeys('W,A,S,D,E,C,SPACE') as Record<string, Phaser.Input.Keyboard.Key>;

    this.hpText = this.add.text(16, 12, '', { fontSize: '20px', color: '#ffffff' });
    this.infoText = this.add.text(16, 38, '', { fontSize: '18px', color: '#ffe3a5' });
    this.updateUi();

    this.input.keyboard?.on('keydown-C', () => this.scene.start('CraftScene'));

    this.input.keyboard?.on('keydown-E', () => {
      woodNodes.children.entries.forEach((entry) => {
        const node = entry as Phaser.Physics.Arcade.Sprite;
        if (!node.active) return;
        const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, node.x, node.y);
        if (distance <= 44) {
          gameStore.inventory.addMaterial('wood', 1);
          node.disableBody(true, true);
          this.updateUi('木材を1つ入手！');
        }
      });
    });
  }

  update(time: number): void {
    this.handleMove();

    if (Phaser.Input.Keyboard.JustDown(this.wasd.SPACE)) {
      this.tryAttack(time);
    }

    if (this.slime?.active) {
      this.physics.moveToObject(this.slime, this.player, 55);
      const touching = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.slime.x, this.slime.y) < 24;
      if (touching && time - this.lastTakenDamageAt > 800) {
        this.lastTakenDamageAt = time;
        this.playerHp -= 1;
        this.updateUi('スライムにぶつかって1ダメージ');
        if (this.playerHp <= 0) {
          this.scene.restart();
        }
      }
    }
  }

  private handleMove(): void {
    const speed = 140;
    let vx = 0;
    let vy = 0;

    if (this.cursors.left.isDown || this.wasd.A.isDown) vx -= speed;
    if (this.cursors.right.isDown || this.wasd.D.isDown) vx += speed;
    if (this.cursors.up.isDown || this.wasd.W.isDown) vy -= speed;
    if (this.cursors.down.isDown || this.wasd.S.isDown) vy += speed;

    this.player.setVelocity(vx, vy);
    if (vx !== 0 && vy !== 0) {
      this.player.setVelocity(vx * 0.707, vy * 0.707);
    }
  }

  private tryAttack(time: number): void {
    if (time - this.lastAttackAt < 320) return;
    this.lastAttackAt = time;

    if (!this.slime?.active) return;

    const attack = WEAPONS[gameStore.inventory.getEquippedWeapon()].attack;
    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.slime.x, this.slime.y);

    if (distance <= 56) {
      this.enemyHp -= attack;
      this.updateUi(`${attack}ダメージ！`);

      if (this.enemyHp <= 0) {
        this.slime.disableBody(true, true);
        gameStore.inventory.addMaterial('slimeJelly', 1);
        this.updateUi('スライム撃破！スライムゼリーを入手。');
        this.time.delayedCall(3000, () => this.spawnSlime(530, 300));
      }
    }
  }

  private spawnSlime(x: number, y: number): void {
    this.slime = this.physics.add.sprite(x, y, 'slime');
    this.slime.setCollideWorldBounds(true);
    this.enemyHp = 6;
  }

  private updateUi(message?: string): void {
    const inv = gameStore.inventory;
    const weapon = WEAPONS[inv.getEquippedWeapon()];
    this.hpText?.setText(`HP ${this.playerHp}/10  武器:${weapon.name}(ATK:${weapon.attack})`);
    this.infoText?.setText(
      `${message ? message + ' | ' : ''}木材:${inv.getMaterialCount('wood')} ゼリー:${inv.getMaterialCount('slimeJelly')}  C:クラフト`
    );
  }
}
