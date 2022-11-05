const { readFile, writeFile } = require('fs/promises');
const path = require('path');

const talkersPath = path.resolve(__dirname, '..', 'talker.json');
console.log(talkersPath);

const findAllTalkers = async () => {
  const allTalkers = await readFile(talkersPath, 'utf-8');
  return JSON.parse(allTalkers);
};

const findTalkerById = async (id) => {
  const allTalkers = await readFile(talkersPath, 'utf-8');
  const foundTalker = JSON.parse(allTalkers).find((talker) => talker.id === id);
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
  createTalker,
  updateTalker,
  deleteTalker,
};
