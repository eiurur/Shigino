module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.[s]?css$/,
        loaders: ['style', 'css?modules&localIdentName=[path][name]---[local]---[hash:base64:5]', 'sass'],
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};