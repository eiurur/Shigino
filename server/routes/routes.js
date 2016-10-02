const path = require('path');

module.exports = (app) => {

  // redirect all others to the index (HTML5 history)
  return app.get('*', function(req, res) {
    res.sendFile(path.resolve('public', 'index.html'));
  });
};