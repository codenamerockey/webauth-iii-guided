const secrets = require('../config/secret');
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
      if (err) {
        //foul play
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        req.username = decodeToken.username;
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'no token provided' });
  }
};
