var checkBody = require('middleware/checkBody');


module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index', { title: 'FE_Lab7_L18 Networking' });
  });

  app.get('/users', require('./users').get);
  app.post('/users',  checkBody, require('./users').post);

  app.get('/users/:id',require('./user').get);
  app.put('/users/:id', checkBody, require('./user').put);
  app.delete('/users/:id',require('./user').delete);

};
