module.exports = (app) => {
  (require('./api/tweets'))(app);
  (require('./api/moments'))(app);
};