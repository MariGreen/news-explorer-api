const user = require('express').Router();

const { getUserByToken } = require('../controllers/users');

user.get('/users/me', getUserByToken);

module.exports = user;
