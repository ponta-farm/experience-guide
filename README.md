# 体験農業の案内サイト

ぽんたファームの参加者が、スマホで集合・準備・当日の過ごし方を確認するための静的サイトです。

開催日時、集合場所、当日の流れ、季節別の服装・持ち物、天候判断、FAQ、LINEでの連絡を掲載しています。食事や買い足しに使える周辺店舗も掲載しています。

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

`check` はAstroとTypeScriptの診断、`test` はNode標準テストランナー、`build` は `dist/` への静的出力です。ユニットは日時・経路、季節境界、保存の3群です。`tests/event.test.ts` で日時設定と乗換URL・保存キー、車経路の出発地非付与を確認し、`tests/packing.test.ts` で日本時間の6月・10月・年越し境界と保存復元・未知ID・破損・保存拒否を確認します。NodeのTypeScript実行ではimportに `.ts` 拡張子を付け、型だけのimportには `import type` を使います。

画面は390px幅を中心に300〜400px幅で目視し、主要リンクとJavaScript無効時の本文も確認します。画面画像は `docs/previews/p2-mobile.png` に保存します。ブラウザの単純な画面撮影を用い、E2E環境やジョブは追加しません。

通常CIもlockfileから依存を導入し、同じ3コマンドを実行します。

## 更新箇所

| 対象 | 更新箇所 |
| --- | --- |
| 開催日・時間・作業・貸出期限・集合先・連絡先 | `src/data/event.ts` |
| 日付表示・雨天判断日・終了判定・経路URL・保存キー | `src/lib/event.ts` |
| 開催案内・当日の流れ・天気・FAQ | `src/pages/index.astro` |
| 電車・車の集合案内 | `src/components/Access.astro` |
| 服装の番号・注釈・持ち物・準備区分 | `src/data/packing.ts` |
| 季節判定・保存復元 | `src/lib/packing.ts` |
| 服装画像・チェックリストの表示と操作 | `src/components/Packing.astro` |
| 周辺店舗の内容・営業情報・距離・確認日 | `src/data/places.ts` |
| 周辺店舗の分類・表示件数と店舗カード | `src/components/Nearby.astro`、`PlaceCard.astro` |
| 店舗の確認根拠・除外理由 | `docs/nearby-sources.md` |
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

服装・持ち物は当日の流れの後に表示します。周辺店舗は天気案内の後に表示します。

### 服装・持ち物の更新

`src/data/packing.ts` の `clothing` が画像の番号付き注釈とチェック項目の共通データです。番号・表示名・季節別の説明・注釈位置をここで変更します。画像を差し替えた場合は引き出し線の指す位置と、300〜400px幅で顔・衣服と注釈が重ならないことを確認してください。画像の原本は `src/assets/clothing-summer-v2.png` と `clothing-winter-v2.png`、配信時はAstroでWebPへ圧縮します。

季節は閲覧時の日本時間で判定し、6〜9月は夏、10〜5月は冬です。切替は服装表示だけに作用し、開催日やチェックを変更しません。JavaScriptが無効な場合は夏冬の両方を表示します。

保存キーは `experience-guide:開催日:checklist:v1` です。チェックした項目の安定IDだけをlocalStorageへ保存し、同じ開催日の再訪で復元します。項目名を直してもIDを変更しなければチェックが残ります。未知IDは無視し、壊れた保存内容は空として説明を表示します。読み書きを拒否された場合も画面内のチェックは続けられます。リセットは現在の開催日だけに作用し、サーバー送信・端末間同期はありません。

`householdItems` は各家庭の持参品、`optionalItems` はあると便利な品です。主催者の用意する物はチェック欄に追加しません。子ども用軍手・長靴の持参と大人用長靴の貸出相談期限を、開催情報の更新時に確認してください。

### 周辺店舗の更新

`src/data/places.ts` の掲載19店と、`docs/nearby-sources.md` の除外3店を、開催日の更新時に全件再確認します。店名・住所・料理や取扱品・通常営業時間・開催日の休業告知を公式情報で確認し、`checkedAt` と出典文書を更新してください。子ども向け設備や商品の在庫は推測して追加しません。

`roadKm` と `carMinutes` は畑を起点にした道路経路で確認できた場合だけ入力し、取得できない場合は両方nullにします。`distanceSource` に確認状況と日付を残します。確認できた道路距離を近い順、未取得を末尾に並べ、同じ未取得同士はデータの順序を維持します。現在は全件未取得です。経路ボタンの出発地は設定しません。

分類ごとに最初の3店を表示し、残りは「もっと見る」で開きます。標準のdetails/summaryを使うためJavaScriptなしでも開けます。更新後はcheck/test/build、300〜400px幅の目視、公式・車経路リンクを確認し、`docs/previews/p4-mobile.png` を更新してください。店舗データをなぞるユニットやE2Eは追加しません。

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
