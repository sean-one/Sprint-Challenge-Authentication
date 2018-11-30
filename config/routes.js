const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const db = require('../database/dbConfig');

const { authenticate } = require('./middlewares');
const jwtKey = require('../_secrets/keys').jwtKey;

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function createToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const secret = jwtKey;
  const options = {
    expiresIn: '20m'
  }

  return jwt.sign(payload, secret, options)
}


function register(req, res) {
  // implement user registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash
  db('users')
    .insert(user)
    .then(id => {
      res.status(200).json(id)
    })
    .catch(err => {
      res.status(500).json({ message: 'we made mistakes' })
    })
  
}

function login(req, res) {
  // implement user login
  const creds = req.body;
  const user = db('users').where({ username: creds.username }).first();
  if (!user || !bcrypt.compareSync(creds.password, user.password)) {
    res.status(401).json({ message: 'didnt work' })
  } else {
    const token = createToken(user);
    res.status(200).json({ message: 'worked' })
  }

}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
