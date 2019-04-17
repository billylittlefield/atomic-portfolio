const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  context: path.resolve(__dirname),
  output: {
    publicPath: '/',
    filename: 'main.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.(pdf|png|jp(e*)g|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }],
      },
      {
        test: /\.md$/,
        use: ['raw-loader']
      }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    })
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
  },
}
