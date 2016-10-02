const https = require('https');
const fs    = require('fs');
const path  = require('path');
require('dotenv').config();

var app = module.exports = (() => { // application

  const express        = require('express');
  const bodyParser     = require('body-parser');
  const cookieParser   = require('cookie-parser');
  const methodOverride = require('method-override');
  // const session        = require('express-session');
  const compression    = require('compression');
  // const MongoStore     = require('connect-mongo')(session);

  // let options = {
  //   secret: process.env.COOKIE_SECRET || process.env.COOKIE_SECRET,
  //   saveUninitialized: true,
  //   resave: false,
  //   // cookie: maxAge: 2 * 60 * 60 * 1000
  //   store: new MongoStore({
  //     url: process.env.MONGOLAB_URI || process.env.MONGODB_URI,
  //     collection: 'sessions',
  //     clear_interval: 7 * 24 * 60 * 60, // 7days
  //     auto_reconnect: true
  //   })
  // };

  let cacheOptions = {
    dotfiles: 'ignore',
    etag: true,
    extensions: [
      'css',
      'js',
      'jpg',
      'png',
      'gif'
    ],
    index: false,
    maxAge: 86400000 * 30, // 30日
    redirect: false,
    setHeaders(res, path, stat) {
      res.set({'x-timestamp': Date.now()});
    }
  };

  app = express();
  app.disable('x-powered-by');
  app.set('port', process.env.PORT  || 3000);
  app.set('views', path.join(__dirname, 'public', 'views'));
  app.set('view engine', 'html');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(cookieParser());
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
  app.use(methodOverride());
  // app.use(session(options));
  app.use(compression({level: 9}));
  app.use(express.static(path.join(__dirname, 'public')));

  let env = process.env.NODE_ENV || 'development';

  // development only
  if (env === 'development') {
    // console.log(process.env);
    // app.use(express.static(path.join(__dirname, 'public')));
    app.locals.pretty = true;
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      return res.render("error", {
        message: err.message,
        error: err
      });
    });
  }

  // production only
  if (env === 'production') {
    console.log(process.env);
    // app.use(express.static(path.join(__dirname, 'public'), cacheOptions));
  }

  return app;
})();



(() => { // routes, session
  (require('./server/routes/api'))(app);
  (require('./server/routes/routes'))(app);
})();


(() => { //server
  app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
  });

  //
  const MomentAggregator = require(path.join(__dirname, 'server', 'lib', 'MomentAggregator'));
  new MomentAggregator().openStream();
})();
