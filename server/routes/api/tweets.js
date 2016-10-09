const path                 = require('path');
const ModelProviderFactory = require(path.resolve('server', 'model', 'ModelProviderFactory'));

module.exports = (app) => {
  app.get('/api/tweets/moments/@:username', function(req, res) {
    const opts = {
      username: req.params.username,
      limit: req.query.limit - 0,
      skip: req.query.skip - 0,
      sort: {count: -1},
    };

    const TweetProvider = ModelProviderFactory.create('Tweet');
    TweetProvider.findByUsername(opts)
    .then(moments => {
      res.send(moments);
    })
    .catch( err => res.status(400).send(err));
  });

  app.get('/api/tweets/moments', function(req, res) {
    const opts = {
      query: {},
      word: req.query.word || '',
      limit: req.query.limit - 0,
      skip: req.query.skip - 0,
      sort: {count: -1},
    };

    if(req.query.username) opts.query.username = req.query.username;

    const TweetProvider = ModelProviderFactory.create('Tweet');
    TweetProvider.find(opts)
    .then(moments => {
      res.send(moments);
    })
    .catch( err => res.status(400).send(err));
  });

};
