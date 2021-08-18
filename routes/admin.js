const express = require('express');
const Users = require('../models/users');
const {
    NotExtended
} = require('http-errors');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const {
    check,
    validationResult
} = require('express-validator');
const User = require('../models/users');


router.all('*', (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('login');

        return;
    }

    next();
});

router.get('/', (req, res) => {
    Users.find({}, (err, data) => {
        res.render('admin/admin-form', {
            title: `Witaj w panelu administratora!`,
            data
        });
    });
});

router.get('/add', (req, res) => {

    res.render('admin/user-form', {
        title: `Formularz rejestracji użytkownika`,
        errors: {},
        body: {}
    });
});

router.post('/add', [check('userName', 'Name is required').not().isEmpty(), check('email', 'Podaj prawidłowy adres').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {
        userName,
        email,
        password
    } = req.body;

    try {
        let user = await User.findOne({
            email
        });

        if (user) {
            res.status(400).json({
                errors: [{
                    msg: 'User already exist'
                }]
            });
        }

        user = new User({
            userName,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

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
        res.redirect('/admin')
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

router.get('/delete/:id', (req, res) => {
    Users.findByIdAndDelete(req.params.id, (err) => {
        res.redirect('/admin')
    })
});

module.exports = router;