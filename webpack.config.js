const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ["file-loader?name=media/[name].[ext]"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]",
            outputPath: "fonts/",
          },
        },
      },
      {
        test: /\.(mp3)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[name].[ext]",
              outputPath: "assets/",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      favicon: "./public/favicon.ico",
      manifest: "./public/manifest.json",
    }),
    new Dotenv(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./public/manifest.json",
          to: path.resolve(__dirname, "build"),
        },
        {
          from: "./public/svgs",
          to: path.resolve(__dirname, "build/svgs"),
        },
        {
          from: "./public/avatar",
          to: path.resolve(__dirname, "build/avatar"),
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "build"),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  devtool: false,
};
