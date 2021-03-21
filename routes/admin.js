const express = require('express');
const {
    NotExtended
} = require('http-errors');
const router = express.Router();
const bcrypt = require('bcryptjs');
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
    res.render('admin/admin-form', {
        title: `Witaj w panelu administratora!`,
    });
});

router.post('/', [check('userName', 'Name is required').not().isEmpty(), check('email', 'Plaese include a valid email').isEmail(),
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

        res.redirect('/admin')
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

module.exports = router;