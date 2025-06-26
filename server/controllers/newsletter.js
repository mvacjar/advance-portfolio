const Newsletter = require('../models/newsletter');

async function subscribeEmail(req, res) {
  const { email } = req.body;
  const newsletter = new Newsletter({
    email: email.toLowerCase(),
  });

  if (!email) res.status(404).send({ msg: 'Email is mandatory' });

  try {
    await newsletter.save();
    res.status(200).send({ msg: 'Email registered' });
  } catch (error) {
    res.status(400).send({ msg: 'Email not registered' });
  }
}

async function getEmails(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  };

  try {
    const newsletters = await Newsletter.paginate({}, options);
    res.status(200).send(newsletters);
  } catch (error) {
    res.status(400).send({ msg: 'Emails not found' });
  }
}

async function deleteEmail(req, res) {
  const { id } = req.params;

  try {
    await Newsletter.findByIdAndDelete(id);
    res.status(200).send({ msg: 'Email deleted' });
  } catch (error) {
    res.status(400).send({ msg: 'Email not deleted' });
  }
}

module.exports = {
  subscribeEmail,
  getEmails,
  deleteEmail,
};
