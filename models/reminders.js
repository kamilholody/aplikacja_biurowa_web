const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const remindersSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Pole przypomnienie jest wymagane', ]
    },
    created: {
        type: Date,
        default: Date.now,
        required: true
    },
});

module.exports = mongoose.model('Reminders ', remindersSchema);