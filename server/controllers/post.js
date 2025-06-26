const Post = require('../models/post');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function createPost(req, res) {
  const post = new Post(req.body);
  post.create_at = new Date();

  if (req.file && req.file.location) {
    post.miniature = req.file.location;
  }

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
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send({ msg: 'Post not found' });
    }

    if (req.file && req.file.location) {
      if (post.miniature) {
        try {
          const url = new URL(post.miniature);
          const key = decodeURIComponent(url.pathname.substring(1));
          const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
          };
          await s3.send(new DeleteObjectCommand(params));
        } catch (err) {
          console.error('Error deleting old miniature from S3:', err);
        }
      }
      postData.miniature = req.file.location;
    }

    const updatedPost = await Post.findByIdAndUpdate({ _id: id }, postData, { new: true });
    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(400).send({ msg: 'Post not updated' });
  }
}

async function deletePost(req, res) {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).send({ msg: 'Post not found' });
    }

    if (post.miniature) {
      try {
        const url = new URL(post.miniature);
        const key = decodeURIComponent(url.pathname.substring(1));
        const params = {
          Bucket: process.env.AWS_S3_BUCKET,
          Key: key,
        };
        await s3.send(new DeleteObjectCommand(params));
      } catch (err) {
        console.error('Error deleting image from S3:', err);
      }
    }
    await Post.findByIdAndDelete(id);
    res.status(200).send({ msg: 'Post deleted' });
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
