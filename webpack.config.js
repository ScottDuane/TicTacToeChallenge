module.exports = {
  context: __dirname,
  entry: './entry.js',
  output: {
    filename: './bundle.js',
    publicPath: '/TicTacToeChallenge/'
  },
  resolve: {
    extensions: ['.js', '*']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-maps'
};
