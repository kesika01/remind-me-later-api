const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');

// POST /api/reminders
router.post('/', async (req, res) => {
    try {
        const { date, time, message, reminder_method } = req.body;

        // Basic presence check
        if (!date || !time || !message || !reminder_method) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Combine date and time and parse to JS Date object
        const datetimeString = `${date}T${time}`;
        const datetime = new Date(datetimeString);

        if (isNaN(datetime.getTime())) {
            return res.status(400).json({ error: 'Invalid date or time format.' });
        }

        // Validate reminder_method
        if (!['email', 'sms'].includes(reminder_method.toLowerCase())) {
            return res.status(400).json({ error: 'reminder_method must be either email or sms.' });
        }

        if (message.length > 500) {
            return res.status(400).json({ error: 'Message too long. Max 500 characters.' });
        }

        const newReminder = new Reminder({
            datetime,
            message,
            reminder_method: reminder_method.toLowerCase()
        });

        await newReminder.save();
        res.status(201).json({ message: 'Reminder saved successfully!' });
    } catch (err) {
        console.error('Error saving reminder:', err);
        res.status(500).json({ error: 'Server error. Try again later.' });
    }
});

module.exports = router;
