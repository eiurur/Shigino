const path                 = require('path');
const moment               = require('moment');
const ModelProviderFactory = require(path.resolve('server', 'model', 'ModelProviderFactory'));

module.exports = (app) => {
  app.get('/api/moment/:moment_id', function(req, res) {
    const MomentProvider = ModelProviderFactory.create('Moment');
    const opts = { moment_id: req.params.moment_id };
    MomentProvider.findById(opts)
    .then(moment => {
      res.send(moment);
    })
    .catch( err => res.status(400).send(err));
  });

  app.get('/api/moments/@:username', function(req, res) {
    console.log(req.params.username);
    const CreatorProvider = ModelProviderFactory.create('Creator');
    CreatorProvider.findByUsername({username: req.params.username})
    .then(creator => {

      console.log(creator);

      const opts = {
        createdBy: creator._id,
        limit: req.query.limit - 0,
        skip: req.query.skip - 0,
        sort: {count: -1},
      };

      const MomentProvider = ModelProviderFactory.create('Moment');
      return MomentProvider.findByCreator(opts)
    })
    .then(moments => {
      res.send(moments);
    })
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

    // if(req.query.username) opts.query.username = req.query.username;

    const MomentProvider = ModelProviderFactory.create('Moment');
    MomentProvider.find(opts)
    .then(moments => {
      res.send(moments);
    })
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

    const MomentProvider = ModelProviderFactory.create('Moment');
    MomentProvider.findByTerm(opts)
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

    // if(req.query.username) opts.query.username = req.query.username;

    const MomentProvider = ModelProviderFactory.create('Moment');
    MomentProvider.find(opts)
    .then(moments => {
      res.send(moments);
    })
    .catch( err => res.status(400).send(err));
  });
};
