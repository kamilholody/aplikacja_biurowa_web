const express = require('express');
const router = express.Router();
const Reminders = require('../models/reminders')

/* GET home page. */

router.all('*', (req, res, next) => {
    if ((!req.session.users) && (!req.session.admin)) {
        res.redirect('login');

        return;
    }

    next();
});

router.get('/', (req, res) => {
    Reminders.find({}, (err, data) => {

        res.render('reminders', {
            title: 'Dodaj przypominenie',
            errors: {},
            body: {},
            data
        });
    });
});

router.post('/', (req, res) => {
    const body = req.body;

    const remindersData = new Reminders(body);

    const errors = remindersData.validateSync();

    remindersData.save((err) => {
        if (err) {
            res.render('reminders', {
                title: 'Dodaj przypominenie',
                errors,
                body
            });
            return;
        }

        res.redirect('/reminders')
    })
});

router.get('/delete/:id', (req, res) => {
    Reminders.findByIdAndDelete(req.params.id, (err) => {
        res.redirect('/reminders')
    })
});

module.exports = router;