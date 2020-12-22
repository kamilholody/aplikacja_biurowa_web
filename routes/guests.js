const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.render('guests', {
        title: 'Lista gości'
    });
});

module.exports = router;