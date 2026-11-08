# 体験農業の案内サイト

ぽんたファームの参加者が、スマホで集合・準備・当日の過ごし方を確認するための静的サイトです。

開催日時、集合場所、当日の流れ、天候判断、FAQ、LINEでの連絡を掲載しています。季節別の服装・持ち物と周辺店舗は後続PRで追加します。この段階だけで案内全体の完成とは扱いません。

公開予定先: <https://ponta-farm.github.io/experience-guide/>

## ローカル開発

Node.jsは `.nvmrc` の24.22.2（LTS）、npmは11.19.1を使用します。既存のシステムNodeを置き換えず、バージョン管理ツールなどでこのプロジェクトに適用してください。nvmを利用する場合は次の順で実行します。

```sh
nvm install
nvm use
npm ci
npm run dev
```

開発サーバーが表示するURLの `/experience-guide/` を開きます。静的ビルドの確認は `npm run build` → `npm run preview` の順で行います。

## 検証

```sh
npm run check
npm test
npm run build
```

`check` はAstroとTypeScriptの診断、`test` はNode標準テストランナー、`build` は `dist/` への静的出力です。現在のユニットは `tests/event.test.ts` の2件で、日時設定の変更と乗換URL・保存キーの対応、車経路に出発地を含めないことを確認します。季節・保存の2群は後続PRで追加します。NodeのTypeScript実行ではimportに `.ts` 拡張子を付け、型だけのimportには `import type` を使います。

画面は390px幅を中心に300〜400px幅で目視し、主要リンクとJavaScript無効時の本文も確認します。画面画像は `docs/previews/p2-mobile.png` に保存します。ブラウザの単純な画面撮影を用い、E2E環境やジョブは追加しません。

通常CIもlockfileから依存を導入し、同じ3コマンドを実行します。

## 更新箇所

| 対象 | 更新箇所 |
| --- | --- |
| 開催日・時間・作業・貸出期限・集合先・連絡先 | `src/data/event.ts` |
| 日付表示・雨天判断日・終了判定・経路URL・保存キー | `src/lib/event.ts` |
| 開催案内・当日の流れ・天気・FAQ | `src/pages/index.astro` |
| 電車・車の集合案内 | `src/components/Access.astro` |
| 基本スタイル | `src/styles/global.css` |
| 公開先・base path | `astro.config.mjs` |
| Node・依存バージョン | `.nvmrc`、`package.json`、`package-lock.json` |
| 検証・公開処理 | `.github/workflows/` |

### 開催情報の更新

1. `src/data/event.ts` の `date`（YYYY-MM-DD）、`startTime`・`endTime`・`stationArrivalTime`（HH:mm）、`activities` を変更します。日時は日本時間で、終了時刻は開催日当日の時刻です。
2. `bootRentalDeadline.date` と `period` を次の開催に合わせて確認します。貸出期限は開催日から自動で決めません。集合先・LINE・雨天の判断条件も同じ設定で管理します。
3. 曜日、開催2日前の判断日、乗換の到着日時、`experience-guide:開催日:checklist:v1` の保存キーは設定から生成されます。本文へ別の日付を書き足さないでください。初期設定を変える場合、テストの初期値に対応する期待値も更新します。
4. 上の3コマンドを実行し、画面の日付・曜日・貸出期限、電車と車のリンクを確認します。Yahoo!路線情報で到着駅・日付・11:15など設定した到着時刻が維持され、出発駅を自分で選べることを確認してください。Google マップも店舗名・住所を確認し、出発地はサービス側で選びます。

終了表示は閲覧時の端末時計で判定し、終了時刻を過ぎたら終了済みの案内を出して日時付きの乗換ボタンを隠します。開いたままのページや画面復帰時にも更新します。次の開催日時は推定しません。JavaScriptが無効でも本文・FAQ・LINE・地図・天気リンクは読めます。この場合、過去日時へ誘導しないよう、乗換は日付未指定のトップへのリンクを表示します。

後続の服装・持ち物は当日の流れの後、周辺店舗は天気案内の後に追加する位置をコメントで示しています。

### 外部リンクと埋め込みの確認

- LINEは承認された短縮URLへ統一し、公式配信の友だち追加画像を使います。ロゴを描き直さず縦横比を保ち、画像が取得できなくても下のテキストリンクから連絡できる構成です。
- 車の地図はGoogle マップの検索リンクと車経路リンクを常設します。公式の「共有 → 地図を埋め込む」で発行したHTMLをこの工程で取得・確認できていないため、推測したiframeは追加していません。埋め込む場合は、指定店舗の共有画面で公式HTMLを取得してから表示を確認してください。
- WeatherWidget.ioは公式ジェネレーターの地点検索・URL生成にreCAPTCHAを使い、土浦・日本語のコードと描画を確認できなかったため、合意済みのNHKリンクへ代替しています。予報の数値を静的に書き写しません。
- 2026-11-08の確認時点で、指定のNHK旧URLは新しい天気トップへ転送されました。リンクを維持し、「茨城県・土浦市」を選ぶ案内を添えています。開催情報を更新するときに転送先と地域選択を再確認してください。

公式の参照先: [Google Maps URLs](https://developers.google.com/maps/documentation/urls/get-started)、[LINEの友だち追加ボタン](https://developers.line.biz/ja/docs/line-social-plugins/install-guide/using-add-friend-buttons/)、[WeatherWidget.io](https://weatherwidget.io/)。

依存更新時はNodeの公式LTS対応と各パッケージの互換性を確認し、版を固定してlockfileも更新します。Actionsは公式安定リリースのコミットSHAに固定しています。更新時はリリースのタグとSHAを照合してください。

## PRと公開の順番

| 順番 | 内容 | ブランチ | 作成時のbase |
| --- | --- | --- | --- |
| 1 | 公開基盤・CIと準備中ページ | `chore/pages-foundation` | `main` |
| 2 | 開催案内・アクセス | `feature/event-guide` | `chore/pages-foundation` |
| 3 | 季節別服装・チェックリスト | `feature/seasonal-checklist` | `feature/event-guide` |
| 4 | 周辺店舗案内 | `feature/nearby-guide` | `feature/seasonal-checklist` |

各PRはDraftで提出し、所有者が検証結果を確認して1→2→3→4の順でマージします。前のPRをマージしたら次のPRのbaseを `main` に変更し、差分がそのPRの目的だけであることとCIを確認してください。squash mergeで祖先コミットが変わった場合は、次のPRで前の変更が重複しないようrebase等で調整し、ローカル検証と必要なレビューをやり直してからマージします。

所有者は初回マージ前にリポジトリの **Settings → Pages → Build and deployment → Source** が **GitHub Actions** になっていることを確認してください。`github-pages` 環境の公開対象は `main` とします。初期のREADMEだけのmainには公開workflowがなく、最初のPRのマージ後に準備中ページが公開される構成です。すべての案内は後続PRのマージ後に揃います。

Pagesのbuild/deployは `main` へのpush、または `main` を指定した `workflow_dispatch` で動きます。手動実行でも他のブランチではbuild/deployを行いません。公開用の書込権限はdeployジョブだけに付け、検証成功後の `dist/` を公開します。

マージと公開後の画面・主要リンク確認は所有者が行います。Draft PRの作成やローカルビルドだけで公開完了とは扱いません。

## 参照

- [課題と受入条件](https://github.com/ponta-farm/experience-guide/issues/1)
- [Astroの導入条件](https://docs.astro.build/en/install-and-setup/)
- [AstroのGitHub Pages設定](https://docs.astro.build/en/guides/deploy/github/)
- [Node.jsのTypeScript実行](https://nodejs.org/docs/latest-v24.x/api/typescript.html)
