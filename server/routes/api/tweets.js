const path                 = require('path');
const ModelProviderFactory = require(path.resolve('server', 'model', 'ModelProviderFactory'));

module.exports = (app) => {
  app.get('/api/tweets/moments', function(req, res) {
    const opts = {
      limit: req.query.limit - 0,
      sort: {count: -1},
    };

    const TweetProvider = ModelProviderFactory.create('Tweet');
    TweetProvider.find(opts)
    .then(moments => {
      res.send({moments: moments});
    })
    .catch( err => res.status(400).send(err));
  });
};
