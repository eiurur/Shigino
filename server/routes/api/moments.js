const path                 = require('path');
const moment               = require('moment');
const ModelProviderFactory = require(path.resolve('server', 'model', 'ModelProviderFactory'));

module.exports = (app) => {
  app.get('/api/moment/:moment_id', function(req, res) {
    const opts = { moment_id: req.params.moment_id };
    ModelProviderFactory.create('Moment').findById(opts)
    .then(moment => {
      res.send(moment);
    })
    .catch( err => res.status(400).send(err));
  });

  app.get('/api/moments/@:username', function(req, res) {
    const creatorOpts = {username: req.params.username};
    ModelProviderFactory.create('Creator').findByUsername(creatorOpts)
    .then(creator => {
      const opts = {
        createdBy: creator._id,
        limit: req.query.limit - 0,
        skip: req.query.skip - 0,
        sort: {count: -1},
      };

      return ModelProviderFactory.create('Moment').findByCreator(opts);
    })
    .then( moments => res.send(moments) )
    .catch( err => res.status(400).send(err));
  });

  app.get('/api/moments/latest', function(req, res) {
    const opts = {
      query: {},
      word: req.query.word || '',
      limit: req.query.limit - 0,
      skip: req.query.skip - 0,
      sort: {tweeted_at: -1},
    };

    ModelProviderFactory.create('Moment').find(opts)
    .then( moments => res.send(moments) )
    .catch( err => res.status(400).send(err));
  });

  app.get('/api/moments/ranking/:term', function(req, res) {
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

    ModelProviderFactory.create('Moment').findByTerm(opts)
    .then(moments => {
      res.send(moments);
    })
    .catch( err => res.status(400).send(err));
  });


  app.get('/api/moments', function(req, res) {
    const opts = {
      query: {},
      word: req.query.word || '',
      limit: req.query.limit - 0,
      skip: req.query.skip - 0,
      sort: {count: -1},
    };

    ModelProviderFactory.create('Moment').find(opts)
    .then( moments =>res.send(moments) )
    .catch( err => res.status(400).send(err));
  });
};
