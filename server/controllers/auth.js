const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

async function register(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;
    console.log('req.body:', req.body);

    if (!email) {
      res.status(400).send({ msg: 'Email is needed' });
      return;
    }
    if (!password) {
      res.status(400).send({ msg: 'Password is needed' });
      return;
    }

    const user = new User({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password,
      role: 'user',
      active: false,
    });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;

    const userStorage = await user.save();
    res.status(200).send(userStorage);
  } catch (error) {
    res.status(400).send({ msg: 'Error creating user' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).send({ msg: 'Email is mandatory' });
    } else if (!password) {
      res.status(400).send({ msg: 'Password is mandatory' });
    } else {
      const emailLowerCase = email.toLowerCase();
      const userStore = await User.findOne({ email: emailLowerCase });
      if (!userStore) {
        res.status(400).send({ msg: 'User not found' });
      } else {
        const check = await bcrypt.compare(password, userStore.password);
        if (!check) {
          res.status(400).send({ msg: 'Incorrect password' });
        } else if (!userStore.active) {
          res.status(401).send({ msg: 'User not authorized or not active' });
        } else {
          res.status(200).send({
            access: jwt.createAccessToken(userStore),
            refresh: jwt.createRefreshToken(userStore),
          });
        }
      }
    }
  } catch (error) {
    res.status(500).send({ msg: 'Server error' });
  }
}

async function refreshAccessToken(req, res) {
  try {
    const { token } = req.body;
    if (!token) {
      res.status(400).send({ msg: 'Token is required' });
    } else {
      const payload = jwt.decoded(token);
      if (!payload || !payload.user_id) {
        res.status(400).send({ msg: 'Invalid token' });
      } else {
        const userStorage = await User.findById(payload.user_id);
        if (!userStorage) {
          res.status(404).send({ msg: 'User not found' });
        } else {
          res.status(200).send({ accessToken: jwt.createAccessToken(userStorage) });
        }
      }
    }
  } catch (error) {
    res.status(500).send({ msg: 'Server error' });
  }
}

module.exports = { register, login, refreshAccessToken };
