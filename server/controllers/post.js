const Post = require('../models/post');
const image = require('../utils/image');

async function createPost(req, res) {
  const post = new Post(req.body);
  post.create_at = new Date();

  const imagePath = image.getFilePath(req.files.miniature);
  post.miniature = imagePath;

  try {
    const postStored = await post.save();
    res.status(200).send({ msg: 'Post created', menu: postStored });
  } catch (error) {
    res.status(400).send({ msg: 'Post not created', error: error.message });
  }
}

async function getPosts(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  try {
    const posts = await Post.paginate({}, options);
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send({ msg: 'Posts not found' });
  }
}

async function getOnePost(req, res) {
  const { path } = req.params;

  try {
    const postStored = await Post.findOne({ path });
    if (!postStored) {
      return res.status(404).send({ msg: 'Post not found' });
    }
    res.status(200).send(postStored);
  } catch (error) {
    res.status(400).send({ msg: 'Post not found' });
  }
}

async function updatePost(req, res) {
  const { id } = req.params;
  const postData = req.body;

  try {
    if (req.files && req.files.miniature) {
      const imagePath = image.getFilePath(req.files.miniature);
      postData.miniature = imagePath;
    }

    const updatedPost = await Post.findByIdAndUpdate({ _id: id }, postData, { new: true });

    if (!updatedPost) {
      return res.status(404).send({ msg: 'Post not found' });
    }

    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(400).send({ msg: 'Post not updated' });
  }
}

async function deletePost(req, res) {
  const { id } = req.params;

  try {
    Post.findByIdAndDelete(id);
    res.status(200).send({ msg: 'Course deleted' });
  } catch (error) {
    res.status(400).send({ msg: 'Post not deleted' });
  }
}

module.exports = {
  createPost,
  getPosts,
  getOnePost,
  updatePost,
  deletePost,
};
