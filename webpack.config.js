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
	  publicPath: './public'
  },
  resolve: {
    alias: {
        AliasName: 'alias-value'
    },
    extensions: ['.js', '.jsx']
  },
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		dns: 'empty'
	},
  module: {
		rules: [
      {
	      test: /\.jsx?$/,
	      exclude: [/(node_modules)/, /(backend)/,
		      path.resolve(__dirname, 'node_modules'),
		      path.resolve(__dirname, 'backend')
	      ],
	      loader: 'babel-loader'
      },
	    {
	    	test: /\.json?$/,
		    exclude: [/(node_modules)/, /(backend)/,
			    path.resolve(__dirname, 'node_modules'),
			    path.resolve(__dirname, 'backend')
		    ],
		    loader: 'json-loader'
	    },
      {
        test: /\.scss$/,
	      exclude: [/(node_modules)/, /(backend)/,
		      path.resolve(__dirname, 'node_modules'),
		      path.resolve(__dirname, 'backend')
	      ],
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
	    {
	    	test: /\.css$/,
		    exclude: [/(node_modules)/, /(backend)/,
			    path.resolve(__dirname, 'node_modules'),
			    path.resolve(__dirname, 'backend')
		    ],
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


