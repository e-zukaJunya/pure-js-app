# Fundamental Webpack Env

めちゃくちゃしょぼいWebアプリをPure JSで作成するときに使う開発環境テンプレート。

状態管理や画面遷移が増えたら潔くフレームワークを使うこと。


# Features

* ES6以降の文法書き放題！SCSSもかけちゃう！IEとかでも動くようにバベります。

* build生成物は'dist'以下に出力。cssとjsは別になる。

* async/await使いたかったら下記のimport書いてね。

```js
import "core-js/stable";
import "regenerator-runtime/runtime";
```


# Requirement

* Node.js 9.0以上
* npm 9.0以上


# Usage

```bash
#ライブラリのインストール
npm install

# ローカル実行
npm start

# 開発用ビルド
npm run build:d

# 製品用（圧縮）ビルド
npm run build:p

```


# Author
Junya Iizuka


# License
特になし
