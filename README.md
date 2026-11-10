# 体験農業の案内サイト

ぽんたファームの参加者が、スマホで集合・準備・当日の過ごし方を確認するための静的サイトです。

現在の実装は「案内を準備しています」と表示する初期ページです。開催案内、季節別の服装と持ち物、周辺店舗は後続のPRで追加します。この基盤だけをマージしても、参加者向けの案内は完成しません。

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

`check` はAstroとTypeScriptの診断、`test` はNode標準テストランナー、`build` は `dist/` への静的出力です。基盤段階のテストは0件で、機能の検証が完了したことを意味しません。後続PRではAGENTS.mdの3群を `tests/**/*.test.ts` に追加します。NodeのTypeScript実行ではimportに `.ts` 拡張子を付け、型だけのimportには `import type` を使います。

通常CIもlockfileから依存を導入し、同じ3コマンドを実行します。

## 更新箇所

| 対象 | 更新箇所 |
| --- | --- |
| 準備中ページ | `src/pages/index.astro` |
| 基本スタイル | `src/styles/global.css` |
| 公開先・base path | `astro.config.mjs` |
| Node・依存バージョン | `.nvmrc`、`package.json`、`package-lock.json` |
| 検証・公開処理 | `.github/workflows/` |

開催データは後続PRで `src/data/event.ts` に追加し、開催日・集合時刻・貸出期限などの更新手順をここへ追記します。服装・持ち物・周辺情報も、それぞれのPRで更新方法を説明します。

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
