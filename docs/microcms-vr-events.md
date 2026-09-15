# VR EVENTS：microCMSへの切り替え手順

この変更はドラフトです。対象はVR EVENTSのみで、ニュースの既存接続は変更しません。
Astroのビルド時に公開イベントを取得して静的HTMLへ出力します。ブラウザへAPIキーは渡しません。

## 1. microCMSで確認すること

サービスドメインは既存ニュースと同じ `etdnews` を既定値としています。別サービスなら後述の変数で指定します。
**新APIのエンドポイント名は未確認**です。APIプレビューにある
`https://サービス名.microcms.io/api/v1/エンドポイント名`
の末尾を確認してください。APIの表示名とは別です。

リスト形式のAPIで次のフィールドIDを使用します。

| フィールドID | 種類 | 内容 |
| --- | --- | --- |
| event-banner | 画像・必須 | バナー。元の縦横比で表示 |
| event-name | テキスト・必須 | 左上のイベント名 |
| event-info | テキスト・任意 | 右下の短い説明。空なら表示なし |
| event-link | テキストエリア・必須 | http/httpsのURLを1つだけ入力 |

event-linkは現在のテキストエリアのままで利用できます。前後の改行は除去します。
既存のOlder Maide / BunnyBAR Velourを登録し、画像・名前・説明・リンクを入れて公開してください。
バナーは2:1推奨。Older Maideの透明部分はサイト側の黒背景で表示します。
表示順は作成日時の古い順（createdAt昇順）。管理画面の並べ替えは反映しません。
公開0件のときは「現在、掲載中のイベントはありません。」と表示します。

利用するAPIキーに、この新APIのGET権限を付与してください。
既存ニュースのキーを再利用する場合はニュースのGET権限も残します。
別サービスや専用キーの場合は MICROCMS_EVENTS_API_KEY を設定します。

## 2. Cloudflare：ビルド用の環境変数

Workers & Pages → telodos-website → Settings → Builds → Build variables and secrets を開きます。
通常の実行時用 Variables and Secrets だけに入れても、静的ビルドでは取得できません。
[Cloudflare公式：Build設定](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)

| 変数 | 値 | 必須条件 |
| --- | --- | --- |
| MICROCMS_EVENTS_ENDPOINT | 確認したエンドポイント名のみ | CMS切り替え時に必須 |
| MICROCMS_EVENTS_SERVICE_DOMAIN | etdnews または新APIのサービス名（URL全体ではない） | 別サービスの場合のみ |
| MICROCMS_EVENTS_API_KEY | イベントをGETできるキー（Secret） | 専用キーを使う場合 |
| MICROCMS_API_KEY | 既存ニュース用キー（Secret） | 既存値を維持。イベント専用キー省略時はこちらを利用 |

本番mainとドラフトブランチのビルドで利用できる範囲を確認します。
変数名に PUBLIC_ は付けません。キーをGitHub・本文・画像に貼らないでください。
ビルド/デプロイコマンドは現在動いている設定を維持します。

エンドポイント未設定なら既存のローカル2件を維持します。
設定後はCMSのみ使用し、キー不足・権限エラー・通信エラー・不正データではビルドを停止します。
公開中のサイトは直前に成功したデプロイのままです。

## 3. Cloudflare：Deploy Hook

1. Workers & Pages → telodos-website → Settings → Builds → Deploy Hooks。
2. 名前を例として `microcms-vr-events` にし、対象ブランチを選択。
3. 本番用は `main`。ドラフト検証用なら `feat/microcms-vr-events` 用の別Hookを作る。
4. Createで発行されたURLをコピーする。

Hookは指定ブランチへのPOSTでビルドを開始します。URL自体が認証情報なので公開しません。
既存ニュース用Hookはそのまま残します。
[Cloudflare公式：Workers Deploy Hooks](https://developers.cloudflare.com/workers/ci-cd/builds/deploy-hooks/)

## 4. microCMS：Webhook

1. 作成したイベントAPI → API設定 → Webhook → 追加 → **カスタム通知**。
2. POST先URLにCloudflareで作ったDeploy Hook URLを入力。
3. 通知対象は「コンテンツの公開時・更新時」「公開終了時」「公開中コンテンツの削除時」を有効化。
4. 下書き保存は本番反映不要なので無効。保存してWebhookを有効にする。

microCMSのカスタム通知は指定URLにPOSTします。Cloudflare Pages専用の項目ではなく、
今回はWorkersのHookへカスタム通知を使います。
[公式：microCMS Webhook設定](https://document.microcms.io/manual/webhook-setting)

## 5. 切り替え順と確認

- [ ] エンドポイント名とサービス名を確認
- [ ] 既存2件をCMSに登録・公開
- [ ] 新APIのGET権限とビルド変数を設定
- [ ] ドラフトブランチでCMS接続ビルドが成功することを確認
- [ ] 設定完了後にドラフトPRをmainへマージ（今回は未実施）
- [ ] main向けHookをmicroCMSに登録
- [ ] イベントを1件更新し、microCMS通知履歴とCloudflare Buildsで成功を確認
- [ ] 公開終了・説明なし・URL更新も意図どおり反映されることを確認

Webhook成功はビルド受付の確認です。サイト更新完了はCloudflareビルド成功で確認します。
Webhookが失敗した場合は自動再送を前提にせず、履歴を確認して再度公開更新または再ビルドします。
ドラフトのままmain向けHookを呼んでも、本番コードはまだCMSイベントを読みません。

## 開発・検証

`npm run validate`：既存のAstro構文/型チェックとビルド。
`node --experimental-strip-types --test tests/vr-events.test.mjs`：外部通信なしで取得・ページング・エラー処理を検証。
実API接続はエンドポイント名・キー・権限設定後に別途確認が必要です。
今回レビュー閲覧とブラウザ表示確認は行いません。
