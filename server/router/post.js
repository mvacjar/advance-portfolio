const express = require('express');
const multiparty = require('connect-multiparty');
const PostController = require('../controllers/post');
const md_auth = require('../middleware/authenticated');

const md_upload = multiparty({ uploadDir: 'uploads/blog' });

const api = express.Router();

api.post('/post', [md_auth.asureAuth, md_upload], PostController.createPost);
api.get('/posts', [md_auth.asureAuth, md_upload], PostController.getPosts);
api.get('/post/:path', [md_auth.asureAuth, md_upload], PostController.getOnePost);
api.patch('/post/:id', [md_auth.asureAuth, md_upload], PostController.updatePost);
api.delete('/post/:id', [md_auth.asureAuth, md_upload], PostController.deletePost);

module.exports = api;
