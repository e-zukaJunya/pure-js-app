const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Fiber = require("fibers");
const Sass = require("sass");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const Webpack = require("webpack");

const IS_DEVELOP = process.env.NODE_ENV === "dev";
console.log(IS_DEVELOP);

module.exports = {
  // エントリーポイント
  entry: "./src/root.js",
  output: {
    // ビルド生成物の出力先
    path: path.resolve(__dirname, "dist"),
    // サーバーにおけるルートディレクトリの指定
    publicPath: "/",
    // 出力されるjsファイル名
    filename: "[name].js",
  },
  // import のルートディレクトリの指定
  resolve: { modules: [path.resolve(__dirname, "node_modules"), path.resolve(__dirname, "src")] },
  // 差分ビルド
  cache: true,
  // node_modulesをwatch対象から除外
  watchOptions: {
    ignored: /node_modules/,
  },
  // バンドルサイズの許容量に関するWARNINGをオフに
  performance: {
    hints: false,
  },
  // 共通モジュールを別ファイルに
  optimization: {
    splitChunks: {
      // cacheGroups内にバンドルの設定を複数記述できる
      cacheGroups: {
        // 今回はvendorだが、任意の名前で問題ない
        vendor: {
          // node_modules配下のモジュールをバンドル対象とする
          test: /[\\/]node_modules[\\/]/,
          // 出力ファイル名
          name: "vendor",
          chunks: "initial",
          enforce: true,
        },
      },
    },
  },
  // 利用モジュール
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // ES5にバベる
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // CSSは別出し
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: true,
              sourceMap: IS_DEVELOP,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: IS_DEVELOP,
              postcssOptions: {
                plugins: [
                  // Autoprefixerを有効化
                  // grid: trueはIE11対応用
                  ["autoprefixer", { grid: true }],
                ],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              // node-sassではなくdart-sass
              implementation: Sass,
              sourceMap: IS_DEVELOP,
              sassOptions: {
                // fiberは入れとくとコンパイル速度が速くなるとか
                fiber: Fiber,
              },
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|bmp|gif|tiff|svg)$/,
        use: [
          {
            loader: "file-loader",
            // 出力先とファイル名
            // 指定しないとファイル名がハッシュ値になりdistの最上階層に出る
            options: {
              name: "assets/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  // jsファイルのソースマップ指定
  // "eval-cheap-module-source-map"だとリビルドがそれなりに早くてJSソースマップが効くがCSSが効かない
  devtool: IS_DEVELOP ? "source-map" : false,
  plugins: [
    // distディレクトリを空にする
    new CleanWebpackPlugin(),
    // 生成されるHTMLをsrcのものベースにする
    // todo 今はまだWARNING出る
    new HtmlWebpackPlugin({ template: "src/index.html" }),
    // CSS別出し指定
    new MiniCssExtractPlugin(),
    // ファビコン生成
    // todo FaviconsWebpackPluginのwebpack5対応待ち
    // https://github.com/jantimon/favicons-webpack-plugin/issues/222
    // new FaviconsWebpackPlugin("/src/assets/js-icon.png"),
    // 環境変数受け渡し
    new Webpack.EnvironmentPlugin(["NODE_ENV"]),
  ],
  // webpack-dev-serverの設定
  devServer: {
    contentBase: path.join(__dirname, "src"),
    openPage: "index.html",
    open: true,
  },
};
