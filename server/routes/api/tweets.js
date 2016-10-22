const path                 = require('path');
const moment               = require('moment');
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

  app.get('/api/tweets/moments/latest', function(req, res) {
    const opts = {
      query: {},
      word: req.query.word || '',
      limit: req.query.limit - 0,
      skip: req.query.skip - 0,
      sort: {tweeted_at: -1},
    };

    if(req.query.username) opts.query.username = req.query.username;

    const TweetProvider = ModelProviderFactory.create('Tweet');
    TweetProvider.find(opts)
    .then(moments => {
      res.send(moments);
    })
    .catch( err => res.status(400).send(err));
  });

  app.get('/api/tweets/moments/ranking/:term', function(req, res) {

    if(!['day', 'week', 'month', 'year'].includes(req.params.term)) {
      res.status(400).send('期間はday, week, month, yearのみ指定できます');
      return;
    }

    const opts = {
      query: {},
      date: moment().format('YYYY-MM-DD'),
      term: req.params.term || 'day',
      limit: req.query.limit - 0,
      skip: req.query.skip - 0,
      sort: {count: -1},
    };

    const TweetProvider = ModelProviderFactory.create('Tweet');
    TweetProvider.findByTerm(opts)
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
