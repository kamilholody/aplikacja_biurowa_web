const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Pole Imie jest wymagane!', ]
    },
    email: {
        type: String,
        required: [true, 'Pole Email jest wymagane!', ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Pole Hasło jest wymagane!', ],
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Admin ', userSchema);