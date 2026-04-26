import Phaser from 'phaser';
import { MATERIAL_NAME_BY_ID, SLIME_MASTER, WEAPON_BY_ID } from '../data/gameData';
import { gameStore } from '../systems/GameStore';

export class FieldScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private slime?: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: { [key: string]: Phaser.Input.Keyboard.Key };
  private hpText?: Phaser.GameObjects.Text;
  private infoText?: Phaser.GameObjects.Text;
  private inventoryText?: Phaser.GameObjects.Text;
  private playerHp = 10;
  private enemyHp = SLIME_MASTER.hp;
  private lastAttackAt = 0;
  private lastTakenDamageAt = 0;
  private inventoryVisible = false;

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
    ].forEach((pos) => woodNodes.create(pos.x, pos.y, 'woodNode'));

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.keys = this.input.keyboard!.addKeys('W,A,S,D,E,C,I,SPACE') as Record<string, Phaser.Input.Keyboard.Key>;

    this.hpText = this.add.text(16, 12, '', { fontSize: '20px', color: '#ffffff' });
    this.infoText = this.add.text(16, 38, '', { fontSize: '18px', color: '#ffe3a5' });
    this.inventoryText = this.add
      .text(16, 72, '', { fontSize: '17px', color: '#d8e4ff', backgroundColor: '#1b2436', padding: { x: 8, y: 6 } })
      .setVisible(false);
    this.updateUi();

    this.input.keyboard?.on('keydown-C', () => this.scene.start('CraftScene'));
    this.input.keyboard?.on('keydown-I', () => this.toggleInventory());

    this.input.keyboard?.on('keydown-E', () => {
      woodNodes.children.entries.forEach((entry) => {
        const node = entry as Phaser.Physics.Arcade.Sprite;
        if (!node.active) return;

        const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, node.x, node.y);
        if (distance <= 44) {
          gameStore.inventory.addMaterial('wood', 1);
          node.disableBody(true, true);
          this.updateUi(`${MATERIAL_NAME_BY_ID.wood}を1つ入手！`);
        }
      });
    });
  }

  update(time: number): void {
    this.handleMove();

    if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) {
      this.tryAttack(time);
    }

    if (!this.slime?.active) return;

    this.physics.moveToObject(this.slime, this.player, 55);
    const touching = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.slime.x, this.slime.y) < 24;

    if (touching && time - this.lastTakenDamageAt > 800) {
      this.lastTakenDamageAt = time;
      this.playerHp -= SLIME_MASTER.contactDamage;
      this.updateUi(`${SLIME_MASTER.name}に接触して${SLIME_MASTER.contactDamage}ダメージ`);

      if (this.playerHp <= 0) {
        this.playerHp = 10;
        gameStore.inventory.reset();
        this.scene.start('TitleScene');
      }
    }
  }

  private handleMove(): void {
    const speed = 140;
    let vx = 0;
    let vy = 0;

    if (this.cursors.left.isDown || this.keys.A.isDown) vx -= speed;
    if (this.cursors.right.isDown || this.keys.D.isDown) vx += speed;
    if (this.cursors.up.isDown || this.keys.W.isDown) vy -= speed;
    if (this.cursors.down.isDown || this.keys.S.isDown) vy += speed;

    this.player.setVelocity(vx, vy);
    if (vx !== 0 && vy !== 0) {
      this.player.setVelocity(vx * 0.707, vy * 0.707);
    }
  }

  private tryAttack(time: number): void {
    if (time - this.lastAttackAt < 320) return;
    this.lastAttackAt = time;

    if (!this.slime?.active) return;

    const weapon = WEAPON_BY_ID[gameStore.inventory.getEquippedWeapon()];
    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.slime.x, this.slime.y);

    if (distance <= weapon.range) {
      this.enemyHp -= weapon.attack;
      this.updateUi(`${weapon.name}で${weapon.attack}ダメージ！`);

      if (this.enemyHp <= 0) {
        this.slime.disableBody(true, true);
        const drop = SLIME_MASTER.dropTable[0];
        gameStore.inventory.addMaterial(drop.materialId, drop.count);
        this.updateUi(`${SLIME_MASTER.name}撃破！ ${MATERIAL_NAME_BY_ID[drop.materialId]}を${drop.count}個入手。`);
        this.time.delayedCall(3000, () => this.spawnSlime(530, 300));
      }
    }
  }

  private spawnSlime(x: number, y: number): void {
    this.slime = this.physics.add.sprite(x, y, 'slime');
    this.slime.setCollideWorldBounds(true);
    this.enemyHp = SLIME_MASTER.hp;
  }

  private toggleInventory(): void {
    this.inventoryVisible = !this.inventoryVisible;
    this.inventoryText?.setVisible(this.inventoryVisible);
    this.updateUi();
  }

  private updateUi(message?: string): void {
    const inv = gameStore.inventory;
    const weapon = WEAPON_BY_ID[inv.getEquippedWeapon()];

    this.hpText?.setText(`HP ${this.playerHp}/10  武器:${weapon.name}(ATK:${weapon.attack})`);
    this.infoText?.setText(
      `${message ? message + ' | ' : ''}木材:${inv.getMaterialCount('wood')} ゼリー:${inv.getMaterialCount('slimeJelly')}  E:採取 C:クラフト I:インベントリ`
    );

    const materials = inv.getMaterialsSnapshot();
    this.inventoryText?.setText(
      `インベントリ\n- 木材: ${materials.wood}\n- スライムゼリー: ${materials.slimeJelly}\n- 武器: ${weapon.name}`
    );
  }
}
