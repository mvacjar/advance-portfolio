const { response } = require('express');
const User = require('../models/user');

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
    responde = await User.find({ active });
  }
  console.log(response);
  res.status(200).send({ msg: 'ok' });
}

module.exports = {
  getMe,
  getUsers,
};
