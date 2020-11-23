const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/secret');

exports.CreateUser = function (req, res) {
  const { name, email, phone, password } = req.body

  condition = !name || !email || !password

  if (condition) {
    res.status(406).json({
      "error": "Invalid params!"
    })
  } else {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        return res.status(406).json({
          'response': null,
          'error': err
        });
      } else {
        let user = new User({
          name,
          email,
          phone,
          password: hash
        });
        user.save(function (err, userResponse) {
          if (err) {
            return res.status(406).json({
              'response': null,
              'error': err
            });
          } else {
            return res.status(201).json({
              'error': null,
              'response': {
                'message': 'Created!',
                'data': userResponse,
              }
            });
          }
        })
      }
    })
  }
}


exports.authenticate = function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(406).json({
      'response': null,
      'error': 'Invalid params'
    });
  } else {
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        res.status(500).json({ error: err })
      } else {
        if (!user) {
          res.status(404).json({ message: 'Usuário não encontrado' });
        } else {
          bcrypt.compare(password, user.password, function (err, authenticated) {
            if (!authenticated) {
              res.status(401).json({ 'message': 'Not authenticated' });
            } else {
              let token = jwt.sign(
                { name: user.name, email: user.email, id: user.id },
                secret.secret,
                { expiresIn: "2h" }
              )
              res.status(200).json({ message: "Authenticated", token, data: { user } })
            }
          });
        }
      }
    })
  }
}
