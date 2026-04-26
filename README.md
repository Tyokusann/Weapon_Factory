# 2DクラフトアクションRPG（Weapon Factory）

READMEと `docs/basic-spec.md` の仕様に沿って、MVPを実装しています。

## コンセプト

探索で素材を集め、武器をクラフトし、敵を倒して次に進む2DクラフトアクションRPGです。

## 技術構成

- TypeScript
- Phaser 3
- Vite
- Cloudflare Wrangler（静的アセット配信）

## MVP実装範囲（仕様準拠）

- タイトル画面（Enter / クリックで開始）
- 森フィールド1マップ
- プレイヤー移動（WASD / 矢印）
- 攻撃（Space）
- 採取（E）
- 敵1種類（スライム）
- HP管理（プレイヤー / 敵）
- インベントリ表示（I）
- クラフト画面（C、戻るは Esc/C）
- 木の剣クラフト（木材x3 + スライムゼリーx1）

## 操作方法

- 移動: `WASD` または `矢印キー`
- 攻撃: `Space`
- 採取: `E`
- インベントリ表示切替: `I`
- クラフト画面: `C`
- クラフト決定: `Enter`
- クラフト画面から戻る: `Esc` または `C`

## データ構成（仕様書 9章 対応）

- `src/data/materials.json`
- `src/data/weapons.json`
- `src/data/recipes.json`
- `src/data/enemies.json`

## 開発コマンド

```bash
npm install
npm run dev
npm run build
```

## Cloudflare デプロイ

`wrangler.toml` で静的アセット配信を設定しています。

```toml
[assets]
directory = "./dist"
```

```bash
npm run build
npx wrangler versions upload
```
