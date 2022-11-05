const {
  ageValidation,
  nameValidation,
  talkValidation,
} = require('../utils/fieldValidators');

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
