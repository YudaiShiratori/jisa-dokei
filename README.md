# 時差時計 (Jisa Dokei)

世界各地の時刻と時差を確認できるクロスプラットフォームモバイルアプリケーション。

## 機能

- **世界時計**: 複数の都市の現在時刻をリアルタイム表示
- **時差計算**: 2つの都市間の時差を計算（翌日/前日表示対応）
- **463都市対応**: 全大陸の主要都市をカバー
- **設定カスタマイズ**: 24時間/12時間表示、秒表示の切り替え

## Tech Stack

- **[Expo](https://expo.dev)** - React Nativeアプリ開発プラットフォーム
- **[Expo Router](https://docs.expo.dev/router/introduction/)** - ファイルベースルーティング
- **[TypeScript](https://www.typescriptlang.org)** - 型安全なJavaScript
- **[NativeWind](https://www.nativewind.dev)** - Tailwind CSS for React Native
- **[Zustand](https://zustand-demo.pmnd.rs/)** - 軽量状態管理
- **[date-fns](https://date-fns.org/)** / **[@date-fns/tz](https://github.com/date-fns/tz)** - 日付/タイムゾーン処理
- **[Vitest](https://vitest.dev)** - ユニットテストフレームワーク
- **[Ultracite](https://github.com/haydenbleasel/ultracite)** - Biomeベースのリンター/フォーマッター

## ディレクトリ構造

```
jisa-dokei/
├── __tests__/            # ユニットテストファイル
├── app/                  # Expo Routerのページ
│   ├── (tabs)/           # タブナビゲーション
│   │   ├── index.tsx     # 世界時計タブ
│   │   ├── calculator.tsx # 時差計算タブ
│   │   └── settings.tsx  # 設定タブ
│   ├── _layout.tsx       # ルートレイアウト
│   └── add-city.tsx      # 都市追加画面
├── assets/               # 画像・フォント
├── components/           # 再利用可能なコンポーネント
│   └── ui/               # UIコンポーネント
├── constants/            # 定数定義
├── hooks/                # カスタムフック
├── lib/                  # ユーティリティ関数
├── store/                # Zustand ストア
├── types/                # TypeScript型定義
└── ...                   # 設定ファイル
```

## セットアップ

### 前提条件

```bash
# Bun（パッケージマネージャー）
curl -fsSL https://bun.sh/install | bash
```

### インストール

```bash
# 依存関係のインストール
bun install
```

### 開発サーバーの起動

```bash
# Expo開発サーバーを起動
bun run start

# プラットフォーム別起動
bun run ios      # iOSシミュレーター
bun run android  # Androidエミュレーター
bun run web      # Webブラウザ
```

## 開発コマンド

```bash
# コード品質チェック
bun run check         # Ultraciteによるチェック
bun run check:write   # 自動修正

# 型チェック
bun run typecheck

# テスト
bun run test          # ユニットテスト実行
bun run test:watch    # ウォッチモード
```

## 主要設定ファイル

| ファイル | 用途 |
|---------|------|
| `app.json` | Expo設定（アプリ名、アイコン、プラグイン） |
| `tsconfig.json` | TypeScript設定 |
| `biome.json` | Linter/Formatter設定 |
| `tailwind.config.js` | NativeWind/Tailwind設定 |
| `metro.config.js` | Metro Bundler設定 |
| `vitest.config.ts` | テスト設定 |

## Claude Code 開発環境

このプロジェクトは [Claude Code](https://claude.ai/code) での開発に対応しています。

### カスタムコマンド

| コマンド | 用途 |
|---------|------|
| `/commit` | コミット作成（日本語対応） |
| `/create-pr` | Pull Request作成 |
| `/pr-review` | PRレビュー |
| `/analyze` | コードベース分析 |

## ライセンス

Private
