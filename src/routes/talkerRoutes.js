const express = require('express');
const tokenValidation = require('../middlewares/tokenValidation');
const talkerValidation = require('../middlewares/talkerValidation');
const { 
  findAllTalkers,
  findTalkerById,
  createTalker,
  updateTalker,
  deleteTalker,
  findTalkersByQuery,
} = require('../utils/handleTalkers');

const talkerRoutes = express.Router();

talkerRoutes.get('/talker', async (_req, res) => {
  const allTalkers = await findAllTalkers();
  return res.status(201).json(allTalkers);
});

talkerRoutes.get('/talker/search', tokenValidation, async (req, res) => {
  const { q } = req.query;
  try {
    const foundTalkersByQuery = await findTalkersByQuery(q);
    return res.status(201).json(foundTalkersByQuery);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

talkerRoutes.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const foundTalkerById = await findTalkerById(Number(id));
    return res.status(201).json(foundTalkerById);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

talkerRoutes.post('/talker', tokenValidation, talkerValidation, async (req, res) => {
  try {
    const createdTalker = await createTalker(req.body);
    return res.status(201).json(createdTalker);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

talkerRoutes.put('/talker/:id', tokenValidation, talkerValidation, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTalker = await updateTalker(req.body, Number(id));
    return res.status(201).json(updatedTalker);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

talkerRoutes.delete('/talker/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTalker(Number(id));
    return res.status(204).json({ message: `O talker com id: ${id} foi removido com sucesso` });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = talkerRoutes;
