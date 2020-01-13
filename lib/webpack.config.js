const path = require('path');
const mode = process.env.NODE_ENV || 'development'
const dev = mode === 'development'

module.exports = {
  entry: './src/index.js',
  watch: dev,
  mode,
  output: {
    path: path.resolve(__dirname, 'cjs'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
};
