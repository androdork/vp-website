require("dotenv").config();
const path = require("path");
const webpack = require("webpack");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const env = process.env.NODE_ENV || "development";

const pages = [
  {
    name: "index",
    path: "./src/views",
    filename: "../index.html",
    title: "Welcome",
  },
  {
    name: "about",
    path: "./src/views",
    filename: "../about/index.html",
    title: "About",
  },
  {
    name: "getting-started",
    path: "./src/views",
    filename: "../getting-started/index.html",
    title: "Getting Started",
  },
  {
    name: "faqs",
    path: "./src/views",
    filename: "../faqs/index.html",
    title: "FAQs",
  },
  {
    name: "privacy-policy",
    path: "./src/views",
    filename: "../privacy-policy/index.html",
    title: "Privacy Policy",
  }
];

const htmlPlugins = pages.map(page => {
  return new HTMLWebpackPlugin({
    template: `${page.path}/${page.name}.html`,
    filename: page.filename,
    templateParameters: {
      title: page.title,
      baseUrl: process.env.BASE_URL || "http://localhost:8080",
    }
  });
});

module.exports = {
  entry: {
    "main": "./src/app/index.js",
    "lib/bs-theme": "./src/app/lib/bs-theme.js",
  },
  target: "web",
  mode: env,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
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
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]'
        }
      },
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build/js"),
    publicPath: "/js/"
  },
  devtool: "eval-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({
        BASE_URL: process.env.BASE_URL || "http://localhost:8080",
        VP_API_URL: process.env.VP_API_URL || "http://127.0.0.1:8000",
        VP_CLIENT_ID: process.env.VP_CLIENT_ID || "vp-client-id",
        VP_CLIENT_SECRET: process.env.VP_CLIENT_SECRET || "vp-client-secret",
      }),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/assets", to: "assets" },
      ],
    }),
    ...htmlPlugins
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "./build"),
    },
    compress: true,
    port: 8080,
    hot: true,
  },
};