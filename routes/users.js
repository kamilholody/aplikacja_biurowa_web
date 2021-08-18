const express = require('express');
const Guests = require('../models/guests');
const {
  NotExtended
} = require('http-errors');
const router = express.Router();


router.all('*', (req, res, next) => {
  if ((!req.session.users) && (!req.session.admin)) {
    res.redirect('login');

    return;
  }

  next();
});

router.get('/', (req, res) => {

  Guests.find({}, (err, data) => {
    res.render('users/index', {
      title: `Witaj w panelu użytkownika!`,
      data
    });

  });
});

router.get('/guests/add', (req, res) => {

  res.render('users/guests-form', {
    title: `Formularz rejestracji gości`,
    errors: {},
    body: {}
  });
});

router.post('/guests/add', (req, res) => {
  const body = req.body;

  const guestsData = new Guests(body);

  const errors = guestsData.validateSync();


  guestsData.save((err) => {
    if (err) {
      res.render('users/guests-form', {
        title: `Formularz rejestracji gości`,
        errors,
        body
      });
      return;
    }

    res.redirect('/users')

  });
});


router.get('/guests/delete/:id', (req, res) => {
  Guests.findByIdAndDelete(req.params.id, (err) => {
    res.redirect('/users')
  })
});

module.exports = router;