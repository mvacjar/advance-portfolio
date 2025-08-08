const express = require('express');
const UserController = require('../controllers/user');
const md_auth = require('../middleware/authenticated');
const md_upload = require('../middleware/bucketS3');

const api = express.Router();
api.get('/user/me', [md_auth.assureAuth], UserController.getMe);
api.get('/users', [md_auth.assureAuth], UserController.getUsers);
api.post(
  '/user',
  [md_auth.assureAuth, md_upload.single('avatar')],
  UserController.createUser
);
api.patch(
  '/user/:id',
  [md_auth.assureAuth, md_upload.single('avatar')],
  UserController.updateUser
);
api.delete('/user/:id', [md_auth.assureAuth], UserController.deleteUser);

module.exports = api;
