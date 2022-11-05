const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    if (token.length === 16 && typeof token === 'string') {
      return next();
    } return res.status(401).json({
      message: 'Token inválido',
    });
  } return res.status(401).json({
    message: 'Token não encontrado',
  });
};

module.exports = tokenValidation;
