const express = require('express');
const loginValidation = require('../middlewares/loginValidation');

const loginRoutes = express.Router();

loginRoutes.post('/login', loginValidation);

module.exports = loginRoutes;
