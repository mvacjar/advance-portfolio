const express = require('express');
const md_upload = require('../middleware/bucketS3');
const PostController = require('../controllers/post');
const md_auth = require('../middleware/authenticated');

const api = express.Router();

api.post(
  '/post',
  [md_auth.assureAuth, md_upload.single('miniature')],
  PostController.createPost
);
api.get('/posts', [md_auth.assureAuth], PostController.getPosts);
api.get('/post/:path', [md_auth.assureAuth], PostController.getOnePost);
api.patch(
  '/post/:id',
  [md_auth.assureAuth, md_upload.single('miniature')],
  PostController.updatePost
);
api.delete(
  '/post/:id',
  [md_auth.assureAuth, md_upload.single('miniature')],
  PostController.deletePost
);

module.exports = api;
