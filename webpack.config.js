const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env, argv) => ({
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  devtool: argv.mode === 'development' ? 'source-map' : undefined,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  ...devServer(argv.mode),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Issues',
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
  ],
})

function devServer(mode) {
  if (mode === 'development') {
    return {
      devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        compress: true,
        hot: true,
        open: true,
        port: 5000
      }
    }
  }
}
