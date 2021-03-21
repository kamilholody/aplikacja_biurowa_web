const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const guestsSchema = new Schema({
    guestsName: {
        type: String,
        required: [true, 'Pole Imie jest wymagane!', ]
    },
    guestsSurname: {
        type: String,
        required: [true, 'Pole Nazwisko jest wymagane!']
    },
    companyName: String,
    hourOfComing: {
        type: String,
        required: [true, 'Pole Godzina wejścia jest wymagane!']
    },
    hourOfDeparture: {
        type: String,
        required: [true, 'Pole Godzina wyjścia jest wymagane!']
    },
    dateOfComing: {
        type: Date,
        required: [true, 'Pole Data  jest wymagane!']
    },
    purpose: String,
    created: {
        type: Date,
        default: Date.now,
        required: true
    },
});

module.exports = mongoose.model('Guests', guestsSchema);