const express = require('express');
const Guests = require('../models/guests');
const {
  NotExtended
} = require('http-errors');
const router = express.Router();


router.all('*', (req, res, next) => {
  if (!req.session.users) {
    res.redirect('login');

    return;
  }

  next();
});

router.get('/', (req, res) => {

  res.render('users/index', {
    title: `Zostałeś zalogowany!`
  });
});

router.get('/guests/add', (req, res) => {
  res.render('users/guests-form', {
    title: `Formularz rejestracji gości`
  });
});

router.post('/guests/add', (req, res) => {
  const body = req.body;

  const guestsData = new Guests(body);

  const errors = guestsData.validateSync();

  guestsData.save((err) => {
    console.log(err);
  });


  res.render('users/guests-form', {
    title: `Formularz rejestracji gości`,
    errors
  });
});



module.exports = router;