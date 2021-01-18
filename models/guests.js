const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guestsSchema = new Schema({
    guestsName: {
        type: String,
        required: true
    },
    guestsSurname: {
        type: String,
        required: true
    },
    companyName: String,
    hourOfComing: {
        type: String,
        required: true
    },
    hourOfDeparture: {
        type: String,
        required: true
    },
    dateOfComing: {
        type: Date,
        required: true
    },
    purpose: String,
    created: {
        type: Date,
        default: Date.now,
        required: true
    },
});

module.exports = mongoose.model('Guests', guestsSchema);