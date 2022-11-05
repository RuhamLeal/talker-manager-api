const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/index');

const app = express();

app.use(bodyParser.json());
routes(app);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server online in port ${PORT}`);
});

module.exports = app;
