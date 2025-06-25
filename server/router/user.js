const express = require('express');
const multiparty = require('connect-multiparty');
const UserController = require('../controllers/user');
const md_auth = require('../middleware/authenticated');

const md_multiparty = multiparty({ uploadDir: './uploads/avatar' });

const api = express.Router();
api.get('/user/me', [md_auth.asureAuth], UserController.getMe);
api.get('/users', [md_auth.asureAuth], UserController.getUsers);
api.post('/user', [md_auth.asureAuth, md_multiparty], UserController.createUser);
api.patch('/user/:id', [md_auth.asureAuth, md_multiparty], UserController.updateUser);
api.delete('/user/:id', [md_auth.asureAuth], UserController.deleteUser);

module.exports = api;
