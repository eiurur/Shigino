const path          = require('path');
const TweetProvider = require(path.resolve('server', 'model', 'TweetProvider'));

module.exports = class DatabaseProviderFactory {
  static create(name) {
    switch (name) {
      case 'Tweet': return new TweetProvider();
      default: return null;
    }
  }
};