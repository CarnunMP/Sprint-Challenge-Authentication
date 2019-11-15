const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../api/models/users-model');

router.post('/register', (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  const userToPost = { ...user, password: hash };

  Users.add(userToPost)
  .then(saved => {
    res.status(201).json(saved);
  })
  .catch(err => {
    res.status(500).send('Failed to POST /auth/register: ' + err.message);
  });
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
