const express = require('express');
const router = express.Router();
const User = require('../models/users');
const {
  check,
  validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const passport = require('passport');
const methodOverride = require('method-override');

const loginAdmin = "Admin";
const passwordAdmin = "123456"

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Recepcja'
  });
});

router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Logowanie'
  });
});

// Logowanie admina
router.post('/login', (req, res, next) => {
  const body = req.body;


  if (body.email === loginAdmin && body.password === passwordAdmin) {
    req.session.admin = 2;

    res.redirect('/admin');

    return;
  }
  next();
});

// Logowanie pozostałych użytkowników
router.post('/login', [check('email', 'Plaese include a valid email').isEmail(),
  check('password', 'Password is required ').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  const {
    email,
    password
  } = req.body;

  try {
    let user = await User.findOne({
      email
    });

    if (!user) {
      res.status(400).json({
        errors: [{
          msg: 'Podałeś błędne dane!'
        }]
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    req.session.users = 1;
    res.redirect('/users')

    if (!isMatch) {
      res.status(400).json({
        errors: [{
          msg: 'Podałeś błędne dane!'
        }]
      });
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          token
        })
      });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
});
router.delete('/logout', (req, res) => {
  res.clearCookie('session');
  req.logout()
  res.redirect('/login')
});

module.exports = router;