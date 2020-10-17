const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
// const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const Fiber = require("fibers");
const Sass = require("sass");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const webpack = require("webpack");

const enableSourceMap = process.env.NODE_ENV === "dev";
console.log(enableSourceMap);

module.exports = {
  // エントリーポイント
  entry: "./src/root.js",
  // ビルド後、'./dist/my-bundle.js'というbundleファイルを生成する
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-bundle.js",
  },
  // import のルートディレクトリの指定
  resolve: { modules: [path.resolve(__dirname, "node_modules"), path.resolve(__dirname, "src")] },
  // 変更を監視してhot reloadやauto reloadする
  watch: true,
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
  // 利用モジュール
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: true,
              sourceMap: enableSourceMap,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: enableSourceMap,
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
              implementation: Sass,
              sourceMap: enableSourceMap,
              // sassOptions: {
              //   fiber: Fiber
              // }
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
  devtool: "inline-source-map",
  plugins: [
    // distディレクトリを空にする
    new CleanWebpackPlugin(),
    // 生成されるHTMLをsrcのものベースにする
    new HtmlPlugin({ template: "src/index.html" }),
    // CSS別出し指定
    new MiniCssExtractPlugin(),
    // ファビコン生成
    // todo FaviconsWebpackPluginのwebpack5対応待ち
    // https://github.com/jantimon/favicons-webpack-plugin/issues/222
    // new FaviconsWebpackPlugin("/src/assets/js-icon.png"),
    // 環境変数受け渡し
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    // HMR
    // new webpack.HotModuleReplacementPlugin(),
  ],
  // webpack-dev-serverの設定
  devServer: {
    contentBase: path.join(__dirname, "src"),
    openPage: "index.html",
    open: true,
    hot: true,
  },
};
