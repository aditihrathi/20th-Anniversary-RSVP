// models/Rsvp.js
const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
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
    dietary: [{
        type: String,
        enum: ['vegetarian', 'vegan', 'gluten-free']
    }],
    message: {
        type: String,
        trim: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Rsvp', rsvpSchema);

// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;