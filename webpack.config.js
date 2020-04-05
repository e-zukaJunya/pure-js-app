const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Fiber = require("fibers");
const Sass = require("sass");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")
const webpack = require("webpack")

console.log(process.env.NODE_ENV);
module.exports = {
  // エントリーポイント
  entry: "./src/root.js",
  // ビルド後、'./dist/my-bundle.js'というbundleファイルを生成する
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-bundle.js"
  },
  // import のルートディレクトリの指定
  resolve: { modules: [path.resolve(__dirname, "node_modules"), path.resolve(__dirname, "src")] },
  watchOptions: {
    ignored: /node_modules/
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
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: true,
              sourceMap: process.env.NODE_ENV.trim() === "dev"
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|bmp|gif|tiff|svg)$/,
        loaders: "file-loader?name=assets/[name].[ext]"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: process.env.NODE_ENV.trim() === "dev"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: process.env.NODE_ENV.trim() === "dev",
              plugins: [
                // Autoprefixerを有効化
                require("autoprefixer")({
                  grid: true
                })
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              implementation: Sass,
              sourceMap: process.env.NODE_ENV.trim() === "dev",
              sassOptions: {
                fiber: Fiber
              }
            }
          }
        ]
      }
    ]
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
    new FaviconsWebpackPlugin('src/assets/js-icon.png'),
    // 環境変数受け渡し
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ],
  // webpack-dev-serverの設定
  devServer: {
    contentBase: path.join(__dirname, "src"),
    watchContentBase: true,
    openPage: "index.html"
  }
};
