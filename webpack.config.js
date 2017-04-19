const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin    = require('webpack-manifest-plugin');

const extractSass = new ExtractTextPlugin({
  filename: "styles/app.css",
  disable: process.env.NODE_ENV === "development"
});

const assetManifest = new ManifestPlugin({
  fileName: "asset-manifest.json"
});

const config = {
  devtool: "source-map",
  entry: {
    app: "./app/index"
  },
  output: {
    path: path.resolve(__dirname) + "/dist",
    filename: "scripts/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        use: {
          loader: "file-loader?name=images/[name].[ext]"
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: ["css-loader", "sass-loader"],
          fallback: "style-loader"
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015"]
          }
        }
      }
    ]
  },
  plugins: [
    extractSass
  ],
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    extensions: [".js", ".scss"]
  },
  target: "web"
};

module.exports = config;
