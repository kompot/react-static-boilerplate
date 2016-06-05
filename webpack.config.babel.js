// all paths in `app/routes/index` go here
const pathsToCrawl = [
  '/',
  '/signin',
];

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

import { paths, globals, aliases, env } from './config';

import { postcss } from './app/postcss';

const production = env === 'production';

const hashScheme = '[sha512:hash:base64:5]';
export const cssIdentName = production ?
  hashScheme :
  `[name]__[local]___${hashScheme}`;

const config = module.exports = {

  entry: {
    main: [
      './app/main.js',
    ],
  },

  output: {
    path: path.resolve('dist'),
    filename: production
      ? '[name]-[chunkhash].js'
      : '[name]-[hash].js',
    publicPath: production
      ? ''
      : 'http://localhost:3000/',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['', '.js'],
    alias: aliases,
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel',
          'baggage?[file].pcss=styles',
        ],
      },
      {
        test: /\.pcss$/,
        loader: production
          ? ExtractTextPlugin.extract('style', `css-loader?modules&importLoaders=2&sourceMap&localIdentName=${cssIdentName}!postcss-loader`)
          : `style!css-loader?modules&importLoaders=2&sourceMap&localIdentName=${cssIdentName}!postcss-loader`
      },
      {
        test: /\.svg$/,
        loaders: [
          'babel-loader',
          'svg-react-loader',
          'svgo-loader?' + JSON.stringify({
            plugins: [
              {removeTitle: true},
              {removeViewBox: false},
              {convertColors: {shorthex: false}},
              {convertPathData: false},
            ],
          }),
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        exclude: /node_modules/,
        loader: `file?name=assets/${production ? hashScheme : `[name].${hashScheme}`}.[ext]`,
      },

      {
        test: /\.json$/,
        // exclude: /node_modules/,
        loader: 'json',
      },
    ]
  },

  postcss,

  plugins: [
    new webpack.DefinePlugin({
      ...globals,
    }),
    new webpack.NoErrorsPlugin(),
  ]

};



if (!production) {
  config.devtool = 'eval-sourcemap';
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: 'app/dev.html',
      inject: 'body',
    })
  );
} else {
  config.devtool = 'sourcemap';
  config.output.devtoolModuleFilenameTemplate = 'file://[resource-path]';
  config.output.devtoolFallbackModuleFilenameTemplate = 'file://[resource-path]?[hash]';

  config.plugins.push(
    new CleanWebpackPlugin(['dist'], paths.base()),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        screw_ie8: true,
      },
    }),
    new ExtractTextPlugin('[name]-[contenthash].css', {
      allChunks: true,
    }),
    new StaticSiteGeneratorPlugin('main', pathsToCrawl)
  );
  config.recordsPath = path.resolve('webpack-records.json');
}
