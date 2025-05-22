const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
    datetime: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        required: true,
        maxlength: 500
    },
    reminder_method: {
        type: String,
        enum: ['email', 'sms'],
        required: true
    }
});

module.exports = mongoose.model('Reminder', ReminderSchema);
