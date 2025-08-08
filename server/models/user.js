const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  role: String,
  active: Boolean,
  avatar: String,
});

module.exports = mongoose.model('User', UserSchema);
