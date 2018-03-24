const path = require('path');
const webpack = require('webpack');
const paths = {
    entry: path.resolve('frontend', 'index.js'),
    build: path.resolve('public'),
    output: 'bundle.js',
};

module.exports = {
	stats: {
		warnings: false
	},
	devtool: 'eval-source-map', // Faster rebuild, dev env only
  entry: [
	  paths.entry
  ],
  output: {
    path: paths.build,
    filename: paths.output,
  },
  resolve: {
    alias: {
        AliasName: 'alias-value'
    },
    extensions: ['.js', '.jsx']
  },
  module: {
		rules: [
      {
	      test: /\.jsx?$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel-loader'
      },
	    {
	    	test: /\.json?$/,
		    loader: 'json-loader'
	    },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
	    {
	    	test: /\.css$/,
		    loaders: ['style-loader', 'css-loader']
	    }
    ]
  },
	// Have webpack load React when needed without having to explicitly require it in your code
	// plugins: [
	// 	new webpack.ProvidePlugin({
	// 		"React": "react",
	// 	}),
	// ],
};


