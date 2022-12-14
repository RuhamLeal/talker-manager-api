const { readFile, writeFile } = require('fs/promises');
const path = require('path');

const talkersPath = path.resolve(__dirname, '..', 'talker.json');

const findAllTalkers = async () => {
  const allTalkers = JSON.parse(await readFile(talkersPath, 'utf-8'));
  return allTalkers;
};

const findTalkersByQuery = async (query) => {
  const allTalkers = JSON.parse(await readFile(talkersPath, 'utf-8'));
  if (!query || query.length === 0) return allTalkers;
  const filteredTalkersByQuery = allTalkers.filter((talker) => talker.name.includes(query));
  return filteredTalkersByQuery;
};

const findTalkerById = async (id) => {
  const allTalkers = JSON.parse(await readFile(talkersPath, 'utf-8'));
  const foundTalker = allTalkers.find((talker) => talker.id === id);
  if (foundTalker === undefined) throw new Error('Pessoa palestrante não encontrada');
  return foundTalker;
};

const createTalker = async ({ name, age, talk }) => {
  const allTalkers = JSON.parse(await readFile(talkersPath, 'utf-8')); 
  const id = Number(allTalkers[allTalkers.length - 1].id) + 1;
  const createdTalker = {
    name,
    age,
    id,
    talk,
  };
  allTalkers.push(createdTalker);
  await writeFile(talkersPath, JSON.stringify(allTalkers, null, 2));
  return createdTalker;
};

const updateTalker = async ({ name, age, talk }, id) => {
  const allTalkers = JSON.parse(await readFile(talkersPath, 'utf-8'));
  const filteredTalkers = allTalkers.filter((talker) => talker.id !== id);
  const updatedTalker = {
    id,
    name,
    age,
    talk,
  };
  filteredTalkers.push(updatedTalker);
  await writeFile(talkersPath, JSON.stringify(filteredTalkers, null, 2));
  return updatedTalker;
};

const deleteTalker = async (id) => {
  const filteredTalkers = JSON.parse(await readFile(talkersPath, 'utf-8'))
    .filter((talker) => talker.id !== id);
  await writeFile(talkersPath, JSON.stringify(filteredTalkers, null, 2));
};

module.exports = {
  findAllTalkers,
  findTalkerById,
  findTalkersByQuery,
  createTalker,
  updateTalker,
  deleteTalker,
};
