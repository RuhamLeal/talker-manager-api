const crypto = require('crypto');

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePassword(password) {
  const re = password.length >= 6;
  return re;
}

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

const ageValidation = (age) => {
  if (!age || typeof age !== 'number') return 'O campo "age" é obrigatório';
  if (age < 18) return 'A pessoa palestrante deve ser maior de idade';
};

const nameValidation = (name) => {
  if (!name || typeof name !== 'string') return 'O campo "name" é obrigatório';
  if (name.length < 3) return 'O "name" deve ter pelo menos 3 caracteres';
};

const watchedAtValidation = (watchedAt) => {
  if (!watchedAt || typeof watchedAt !== 'string') return 'O campo "watchedAt" é obrigatório';
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(watchedAt)) {
    return 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  }
};

const rateValidation = (rate) => {
  if (typeof rate !== 'number') return 'O campo "rate" é obrigatório';
  if (rate < 1 || rate > 5 || parseInt(rate, 10) !== rate) {
    return 'O campo "rate" deve ser um inteiro de 1 à 5';
  }
};

const talkValidation = (talk) => {
  if (!talk) return 'O campo "talk" é obrigatório';

  const validations = [watchedAtValidation(talk.watchedAt), rateValidation(talk.rate)];

  for (let idx = 0; idx < validations.length; idx += 1) {
    if (validations[idx]) return validations[idx];
  }
};

module.exports = {
  validateEmail,
  validatePassword,
  generateToken,
  ageValidation,
  nameValidation,
  talkValidation,
};
