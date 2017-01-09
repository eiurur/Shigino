const path          = require('path');
const TweetProvider = require(path.resolve('server', 'model', 'TweetProvider'));
const MomentProvider = require(path.resolve('server', 'model', 'MomentProvider'));
const CreatorProvider = require(path.resolve('server', 'model', 'CreatorProvider'));

module.exports = class DatabaseProviderFactory {
  static create(name) {
    switch (name) {
      case 'Tweet': return new TweetProvider();
      case 'Moment': return new MomentProvider();
      case 'Creator': return new CreatorProvider();
      default: return null;
    }
  }
};