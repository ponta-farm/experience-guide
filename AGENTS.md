# このプロジェクトの開発

## 構成と更新箇所

- Astro + TypeScriptによる静的サイト。UIフレームワーク、APIサーバー、ログイン、DBは追加しない。
- 公開先は `https://ponta-farm.github.io/experience-guide/`。`astro.config.mjs` の `site` と `base` を維持する。内部リンクや公開資産の参照は `import.meta.env.BASE_URL` またはAstroのimportを使う。
- 開催案内は `src/pages/index.astro`、アクセスは `src/components/Access.astro`、服装・持ち物は `src/components/Packing.astro`、共通スタイルは `src/styles/global.css`。周辺店舗は `src/components/Nearby.astro` と `PlaceCard.astro`、店舗データは `src/data/places.ts`。
- 服装の注釈とチェック項目は `src/data/packing.ts` の同じデータを使う。保存済みチェックを維持するため項目IDを不用意に変更しない。季節・保存の処理は `src/lib/packing.ts` に置く。
- 開催情報は `src/data/event.ts` に一元化し、日付・経路の生成は `src/lib/event.ts` に置く。新しい更新箇所と手順は実装と同時にREADMEへ追記する。
- サイト側では位置情報の取得や出発地入力を実装しない。公開する連絡先は承認されたLINEのみ。

## 検証範囲

- `.nvmrc` のNodeとlockfileを使い、`npm ci` → `npm run check` → `npm test` → `npm run build` を実施する。型確認はAstro、ユニットはNode標準テストランナーを使う。
- テストは `tests/**/*.test.ts` に置き、`node:test` と `node:assert/strict` を使う。importには `.ts` 拡張子を付け、Nodeの型除去で実行できる構文を使う。
- ユニットは次の3群に限定する。(1) 開催日時から乗換URL・保存キーの生成と出発地・座標の非付与、(2) 日本時間の6月・10月・年越しの季節境界、(3) 保存復元・破損・保存拒否。
- 基盤段階にはテスト対象がないため0件と記録する。ダミーテストは追加しない。後続で対象を実装したら、その群のテストを追加する。
- E2Eと自動ブラウザ試験の環境・ジョブは追加しない。画面変更はスマホ幅の目視、主要リンク確認、画面撮影で補う。
- CIはcheck/test/buildを行う。Pages workflowのbuild/deployは `main` へのpushまたは `main` の手動実行に限る。

- 周辺店舗の更新では `docs/nearby-sources.md` の掲載・除外全22候補を再確認する。道路距離・車時間の未取得はnullを維持し、経路リンクへ出発地を付けない。
