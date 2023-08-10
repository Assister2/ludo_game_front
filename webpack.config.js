const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/bundle.[contenthash].js",
    chunkFilename: "js/[name].[contenthash].js", // Optional: For code splitting
    publicPath: "/",
  },
  mode: "production", // Set mode to "production" for optimized build
  optimization: {
    minimize: true,
    moduleIds: "deterministic", // Assign deterministic module IDs
    splitChunks: {
      chunks: "all", // For code splitting
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "media/[name].[contenthash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, // Enable caching for faster builds
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Use MiniCssExtractPlugin to extract CSS
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[contenthash].[ext]",
          },
        },
      },
      {
        test: /\.(mp3)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[name].[contenthash].[ext]",
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
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[id].[contenthash].css",
    }),
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
    port: 3004,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  devtool: "source-map", // Enable source maps for better debugging
};
