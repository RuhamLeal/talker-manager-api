const crypto = require('crypto');

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePassword(password) {
  const re = password.length >= 6;
  return re;
}

const loginValidations = (req, res, _next) => {
  const ramdomToken = crypto.randomBytes(8).toString('hex');
  const requiredProperties = ['email', 'password'];
  const loginData = req.body;
  for (let i = 0; i < requiredProperties.length; i += 1) {
    if (requiredProperties[i] in loginData === false) {
      return res.status(400).json({
        message: `O campo "${requiredProperties[i]}" é obrigatório`,
      });
    }
  } 
  if (!validateEmail(loginData.email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } if (!validatePassword(loginData.password)) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } return res.status(200).json({ token: ramdomToken });
};

module.exports = loginValidations;
