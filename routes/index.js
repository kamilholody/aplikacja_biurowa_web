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
const auth = require('../models/users');
const alert = require('alert');


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
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})


router.post('/login', [check('email', 'Podaj pełny adres e-mail').isEmail(),
  check('password', 'Hasło jest wymagane ').exists()
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
      res.status(400).redirect('/login');
      alert('Podałeś błędny adres e-mail!');
    }


    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      req.session.users = user;
      res.redirect('/users')
    } else if (!isMatch) {
      res.status(400).redirect('/login')
      alert('Podałeś błędne hasło!');
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
    res.status(500).redirect('/login');
    alert('Podane dane logowania są nie poprawne!');
  }
});
router.delete('/logout', (req, res) => {
  res.clearCookie('session');
  req.logout()
  res.redirect('/login')
});

module.exports = router;