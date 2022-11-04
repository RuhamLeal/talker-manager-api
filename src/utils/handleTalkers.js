const { readFile } = require('fs/promises');
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
  if (foundTalker === undefined) throw new Error('Pessoa nao encontrada');
  return foundTalker;
};

findTalkerById(1);

module.exports = {
  findAllTalkers,
  findTalkerById,
};
