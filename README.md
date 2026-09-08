# Telodos.com

ユリーカ・ティロドス公式サイト [telodos.com](https://telodos.com) のソースコードです。

Astroで静的HTMLを生成しています。掲載内容と画面の部品を分けているため、ニュースやプロフィールを変更するときにページ全体を編集する必要はありません。

## よく更新する場所

| 更新内容 | ファイル |
| --- | --- |
| ニュース | microCMS の `etdnews` → `news` |
| 初めての方へ・紹介動画 | `src/data/videos.ts` |
| プロフィール・SNS・公式リンク | `src/data/site.ts` |
| ガイドライン | `src/data/guidelines.ts` |
| デザイン資料 | `src/data/design.ts` |
| 色・余白・共通デザイン | `src/styles/global.css` |
| 画像 | `public/images/` |

ChatGPTへ依頼するときは、「ニュースにこの内容を追加して」「プロフィールの身長を変更して」のように伝えれば、対応するデータだけを変更できます。

## ニュースと動画の更新

- Cloudflareのビルド環境に `MICROCMS_API_KEY` を設定します。ブラウザ用の公開変数にはしません。
- ビルド時に公開記事を全件取得し、トップに最新3件、`/news/` に全件を新しい順で表示します。100件を超えた場合も続きが取得されます。
- CMSで公開中の記事が0件なら空の一覧になります。キー設定済みで取得に失敗した場合はビルドを停止し、古いローカル記事で本番を上書きしません。
- CMS変更の反映には再ビルドが必要です。Webhookの設定はCloudflareとmicroCMSの管理画面で行います。
- `src/data/videos.ts` の `featuredVideos` に、動画の `title`・`description`・公開済みYouTube動画の `youtubeId`（11文字）を追加すると「初めての方へ」とVIDEOSナビが表示されます。空の間は見出し・余白・ナビごと出力しません。追加後に再ビルドが必要です。
- 紹介動画は16:9です。縦型ツール紹介のレイアウトは別途相談してから追加します。
- 配置確認用の動画枠は `WORKERS_CI_BRANCH=feat/news-timeline-contact` のビルドのみ表示されます。mainでは表示されません。動画の実データはまだ未登録です。
- APIキーがないプレビューでは接続設定待ちを表示し、古いローカル記事に戻しません。CloudflareのmainビルドではAPIキー未設定もエラーにします。キーはWorkersの実行時設定とは別に、Build variables and secretsへ設定してください。
- 問い合わせ先は `src/data/site.ts` の `contact`。XプロフィールからDMを送る案内です。受信できるDMの設定はX側で確認してください。
- Xタイムラインは公式ウィジェットです。スマホは折りたたみ、PCは展開状態。外部スクリプトを読み込めない場合にもXへのリンクは残ります。

## 開発

Node.js 24以上を使用します。

```bash
npm ci
npm run dev
```

ローカル表示は通常 `http://localhost:4321` です。

## 確認

```bash
npm run validate
```

型・Astro構文を確認したあと、本番用の静的ファイルを `dist/` に生成します。Pull Requestでも同じ確認が自動実行されます。

## 公開設定

Cloudflare Workers Buildsでは、次の設定にします。

- Root directory: `/`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Version command: `npx wrangler versions upload`
- Node.js version: `24`

静的ファイルの出力先は `dist/` です。`wrangler.jsonc` も同じ出力先を参照します。

現在の本番サイトを守るため、変更は作業ブランチからPull Requestを作り、プレビュー確認後に `main` へマージします。
