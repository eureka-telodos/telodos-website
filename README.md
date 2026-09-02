# Telodos.com

ユリーカ・ティロドス公式サイト [telodos.com](https://telodos.com) のソースコードです。

Astroで静的HTMLを生成しています。掲載内容と画面の部品を分けているため、ニュースやプロフィールを変更するときにページ全体を編集する必要はありません。

## よく更新する場所

| 更新内容 | ファイル |
| --- | --- |
| ニュース | `src/data/news.ts` |
| プロフィール・SNS・公式リンク | `src/data/site.ts` |
| ガイドライン | `src/data/guidelines.ts` |
| デザイン資料 | `src/data/design.ts` |
| 色・余白・共通デザイン | `src/styles/global.css` |
| 画像 | `public/images/` |

ChatGPTへ依頼するときは、「ニュースにこの内容を追加して」「プロフィールの身長を変更して」のように伝えれば、対応するデータだけを変更できます。

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

Cloudflare Pagesを使用する場合は、次の設定にします。

- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `24`

現在の本番サイトを守るため、変更は作業ブランチからPull Requestを作り、プレビュー確認後に `main` へマージします。
