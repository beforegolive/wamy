var glob = require('glob');
var path = require('path');
var webpack = require('webpack');

var npmPath = path.resolve(__dirname + '/_dist/npm/*.js')
var files = glob.sync(npmPath);
var entry = {};
for (var i in files) {
  var obj = path.parse(files[i]);
  entry[obj.name] = files[i];
}

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, '_dist/npm/'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
	plugins: [
    new webpack.optimize.UglifyJsPlugin({
      comments: false, //去除注释
      compress: {
        warnings: false //忽略警告
      }
    })
  ]
}
