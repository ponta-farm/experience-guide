# このプロジェクトの開発

## 構成と更新箇所

- Astro + TypeScriptによる静的サイト。UIフレームワーク、APIサーバー、ログイン、DBは追加しない。
- 公開先は `https://ponta-farm.github.io/experience-guide/`。`astro.config.mjs` の `site` と `base` を維持する。内部リンクや公開資産の参照は `import.meta.env.BASE_URL` またはAstroのimportを使う。
- 現時点は `src/pages/index.astro` の準備中ページと `src/styles/global.css` の基本スタイルだけ。開催案内・服装・周辺店舗は後続PRの担当範囲。
- 開催情報は後続PRで `src/data/event.ts` へ一元化する。新しい更新箇所と手順は実装と同時にREADMEへ追記する。
- サイト側では位置情報の取得や出発地入力を実装しない。公開する連絡先は承認されたLINEのみ。

## 検証範囲

- `.nvmrc` のNodeとlockfileを使い、`npm ci` → `npm run check` → `npm test` → `npm run build` を実施する。型確認はAstro、ユニットはNode標準テストランナーを使う。
- テストは `tests/**/*.test.ts` に置き、`node:test` と `node:assert/strict` を使う。importには `.ts` 拡張子を付け、Nodeの型除去で実行できる構文を使う。
- ユニットは次の3群に限定する。(1) 開催日時から乗換URL・保存キーの生成と出発地・座標の非付与、(2) 日本時間の6月・10月・年越しの季節境界、(3) 保存復元・破損・保存拒否。
- 基盤段階にはテスト対象がないため0件と記録する。ダミーテストは追加しない。後続で対象を実装したら、その群のテストを追加する。
- E2Eと自動ブラウザ試験の環境・ジョブは追加しない。画面変更はスマホ幅の目視、主要リンク確認、画面撮影で補う。
- CIはcheck/test/buildを行う。Pages workflowのbuild/deployは `main` へのpushまたは `main` の手動実行に限る。
