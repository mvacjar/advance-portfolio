const jwt = require('../utils/jwt');

function assureAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ msg: 'No bearer token' });
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  try {
    const payload = jwt.decoded(token);

    const { exp } = payload;
    const currentDate = new Date().getTime();

    if (exp <= currentDate) {
      return res.status(400).send({ msg: 'Expired token' });
    }

    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).send({ msg: 'Invalid token' });
  }
}

module.exports = {
  assureAuth,
};
