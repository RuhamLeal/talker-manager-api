const { readFile } = require('fs/promises');
const path = require('path');

const talkersPath = path.resolve(__dirname, '..', 'talker.json');
console.log(talkersPath);

const findAllTalkers = async () => {
  const talkers = await readFile(talkersPath, 'utf-8');
  return JSON.parse(talkers);
};

findAllTalkers();

module.exports = {
  findAllTalkers,
};
