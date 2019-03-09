//In this setup how does webpack know to look to the /src folder for the index.js and react components?
//I have been using this setup previouly where i explicitly state ./client/index.js

// module.exports = {
//   entry: ['babel-polyfill', './client/index.js'],
//   output: {
//     path: __dirname,
//     filename: './public/bundle.js',
//   },
//   context: __dirname,
//   devtool: 'source-maps',
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /(node_modules|bower_components)/,
//         loader: 'babel-loader',
//       },
//     ],
//   },
// };

module.exports = {
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
