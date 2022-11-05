const bodyParser = require('body-parser');
const talkerRoutes = require('./talkerRoutes');
const loginRoutes = require('./loginRoutes');

const routes = (app) => {
  app.route('/').get((_req, res) => {
    res.status(200).send('Node Online');
  });
  app.use(
    bodyParser.json(),
    talkerRoutes,
    loginRoutes,
  );
};

module.exports = routes;
