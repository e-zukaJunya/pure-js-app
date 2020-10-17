# Fundamental Webpack Env

めちゃくちゃしょぼい Web アプリを Pure JS で作成するときに使う開発環境テンプレート。

ちょっとした検証なんかにも。

状態管理や画面遷移が増えたら潔くフレームワークを使うこと。

## Features

- ES6 以降の文法書き放題！SCSS もかけちゃう！IE とかでも動くようにバベります。
- build 生成物は'dist'以下に出力。css と js は別になる。
- async/await 使いたかったら下記の import 書いてね。

```js
import "core-js/stable";
import "regenerator-runtime/runtime";
```

- CSS フレームワークは、loaders.css と ress のみ入れてる。

## Requirement

- Node.js >= 10.x
- npm >= 6.x

## Usage

```bash
#ライブラリのインストール
yarn install

# ローカル実行
yarn start

# 開発用ビルド
yarn run build:d

# 製品用（圧縮）ビルド
yarn run build:p

```

## TODO

fibers

## Author

Junya Iizuka

## License

特になし
