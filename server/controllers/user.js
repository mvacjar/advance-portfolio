const bcrypt = require('bcryptjs');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const User = require('../models/user');

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function createUser(req, res) {
  const { password } = req.body;
  const user = new User({ ...req.body, active: false });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  if (req.file && req.file.location) {
    user.avatar = req.file.location;
  }

  try {
    const userStored = await user.save();
    res.status(201).send(userStored);
  } catch (error) {
    res.status(400).send({ msg: 'Error creating user' });
  }
}

async function getMe(req, res) {
  const { user_id } = req.user;

  const response = await User.findById(user_id);

  if (!response) {
    res.status(400).send({ msg: 'User not found' });
  } else {
    res.status(200).send(response);
  }
}

async function getUsers(req, res) {
  const { active } = req.query;

  let response = null;

  if (active === undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }

  res.status(200).send(response);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const userData = req.body;

  if (userData.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password, salt);
    userData.password = hashPassword;
  } else {
    delete userData.password;
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }

    if (req.file && req.file.location) {
      if (user.avatar) {
        try {
          const url = new URL(user.avatar);
          const key = decodeURIComponent(url.pathname.substring(1));
          const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
          };
          await s3.send(new DeleteObjectCommand(params));
        } catch (err) {
          console.error('Error deleting old image from S3:', err);
        }
      }
      userData.avatar = req.file.location;
    }

    await User.findByIdAndUpdate({ _id: id }, userData, { new: true });
    res.status(200).send({ msg: 'Updated' });
  } catch (error) {
    res.status(400).send({ msg: 'Error updating user' });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }

    if (user.avatar) {
      try {
        const url = new URL(user.avatar);
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

    await User.findByIdAndDelete(id);
    res.status(200).send({ msg: 'User deleted' });
  } catch (error) {
    res.status(400).send({ msg: 'Error deleting user' });
  }
}

module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
