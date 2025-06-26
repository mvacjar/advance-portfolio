const express = require('express');
const UserController = require('../controllers/user');
const md_auth = require('../middleware/authenticated');
const md_upload = require('../utils/bucketS3');

const api = express.Router();
api.get('/user/me', [md_auth.asureAuth], UserController.getMe);
api.get('/users', [md_auth.asureAuth], UserController.getUsers);
api.post('/user', [md_auth.asureAuth, md_upload.single('avatar')], UserController.createUser);
api.patch('/user/:id', [md_auth.asureAuth, md_upload.single('avatar')], UserController.updateUser);
api.delete('/user/:id', [md_auth.asureAuth], UserController.deleteUser);

module.exports = api;
