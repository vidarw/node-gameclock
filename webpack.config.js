const path = require('path');

module.exports = {
  entry: './client.js',
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: 'bundle.js'
  }
};
