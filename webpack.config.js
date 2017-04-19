const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "app.css",
  disable: process.env.NODE_ENV === "development"
});

const config = {
  entry: {
    app: "./src/index.js"
  },

  output: {
    filename: "app.js",
    path: path.resolve(__dirname) + "/public/assets"
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
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
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
    extensions: [".js"]
  }
};

module.exports = config;
