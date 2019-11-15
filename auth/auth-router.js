const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    res.status(500).send('Failed to POST /api/auth/register: ' + err.message);
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `Welcome ${user.username}!`,
        token: token, 
      });
    } else {
      res.status(401).send('Invalid credentials.');
    }
  })
  .catch(err => {
    res.status(401).send('Failed to POST /api/auth/login: ' + err.message);
  });
});

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
  };

  const option = {
    expiresIn: '1d',
  }

  const result = jwt.sign(
    payload,
    process.env.SECRET,
    option,
  );
  
  return result;
}

module.exports = router;
