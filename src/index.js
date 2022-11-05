const express = require('express');
const bodyParser = require('body-parser');
const loginValidations = require('./middlewares/loginValidations');
const tokenValidation = require('./middlewares/tokenValidation');
const talkerValidation = require('./middlewares/talkerValidation');
const { 
  findAllTalkers,
  findTalkerById,
  createTalker,
  updateTalker,
  deleteTalker,
  findTalkersByQuery,
} = require('./utils/handleTalkers');

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

app.get('/talker/search', tokenValidation, async (req, res) => {
  const { q } = req.query;
  try {
    const foundTalkersByQuery = await findTalkersByQuery(q);
    return res.status(200).json(foundTalkersByQuery);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const talker = await findTalkerById(Number(id));
    return res.status(200).json(talker);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

app.post('/login', loginValidations);

app.post('/talker', tokenValidation, talkerValidation, async (req, res) => {
  try {
    const createdTalker = await createTalker(req.body);
    return res.status(201).json(createdTalker);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.put('/talker/:id', tokenValidation, talkerValidation, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTalker = await updateTalker(req.body, Number(id));
    return res.status(200).json(updatedTalker);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.delete('/talker/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTalker(Number(id));
    return res.status(204).json();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});

module.exports = app;
