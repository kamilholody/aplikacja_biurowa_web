const express = require('express');
const router = express.Router();

const loginUserOne = "Recepcjonistka1";
const passwordUserOne = "1234";
const loginUserTwo = "Recepcjonistka2";
const passwordUserTwo = "1234";

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

router.post('/login', (req, res) => {
  const body = req.body;

  if (body.login === loginUserOne && body.password === passwordUserOne) {
    req.session.users = 1;

    res.redirect('/users');
  } else if (body.login === loginUserTwo && body.password === passwordUserTwo) {
    res.redirect('/users');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;