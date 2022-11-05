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

const talkerValidation = (req, res, next) => {
  const { name, age, talk } = req.body;
  const validations = [ageValidation(age), nameValidation(name), talkValidation(talk)];

  for (let idx = 0; idx < validations.length; idx += 1) {
    if (validations[idx]) {
      return res.status(400).json({
        message: validations[idx],
      });
    }
  }
  return next();
};

module.exports = talkerValidation;
