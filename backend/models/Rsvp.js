const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    attendance: {
        type: String,
        enum: ['yes', 'no', 'maybe'],
        required: true
    },
    guests: {
        type: Number,
        required: true,
        min: 1,
        max: 8
    },
    message: String,
    dietary: [String],
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Rsvp', rsvpSchema);