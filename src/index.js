const express = require('express');
const bodyParser = require('body-parser');
const { findAllTalkers, findTalkerById } = require('./utils/handleTalkers');
const loginValidations = require('./middlewares/loginValidations');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await findAllTalkers();
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const talker = await findTalkerById(Number(id));
    return res.status(200).json(talker);
  } catch (err) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

app.post('/login', loginValidations);

app.listen(PORT, () => {
  console.log('Online');
});

module.exports = app;
