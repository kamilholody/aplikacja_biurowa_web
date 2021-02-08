const express = require('express');
const router = express.Router();
const Guests = require('../models/guests');

/* GET home page. */
router.get('/', (req, res) => {
    const searchName = req.query.searchName;
    const searchSurname = req.query.searchSurname;
    const searchCompany = req.query.searchCompany;


    const findGuests = Guests.find({
        guestsName: new RegExp(searchName, 'i'),
        guestsSurname: new RegExp(searchSurname, 'i'),
        companyName: new RegExp(searchCompany, 'i'),

    });

    findGuests.exec((err, data) => {

        res.render('guests', {
            title: 'Lista gości',
            data,
            searchName,
            searchSurname,
            searchCompany,
        });
    });
});

module.exports = router;