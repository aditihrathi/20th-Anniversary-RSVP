// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const Rsvp = require('./models/Rsvp');
const connectDB = require('./config/database');

const app = express();

// Security Middleware
app.use(helmet());
app.use(xss());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5 // limit each IP to 5 requests per windowMs
});
app.use('/api/rsvp', limiter);

// Connect to Database
connectDB();

// Secure Email Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Input Validation
const validateRSVP = [
    body('name').trim().notEmpty().escape(),
    body('email').isEmail().normalizeEmail(),
    body('phone').trim().notEmpty(),
    body('attendance').isIn(['yes', 'no', 'maybe']),
    body('guests').isInt({ min: 1, max: 8 }),
    body('dietary.*').optional().isIn(['vegetarian', 'vegan', 'gluten-free']),
    body('message').optional().trim().escape()
];

// RSVP endpoint with validation
app.post('/api/rsvp', validateRSVP, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Save to database
        const rsvp = new Rsvp(req.body);
        await rsvp.save();

        // Send emails
        await sendConfirmationEmails(req.body);

        res.status(200).json({ 
            message: 'RSVP received successfully',
            rsvpId: rsvp._id 
        });
    } catch (error) {
        console.error('RSVP submission error:', error);
        res.status(500).json({ error: 'Failed to process RSVP' });
    }
});

// Separate email sending function
async function sendConfirmationEmails(rsvpData) {
    // Guest confirmation email
    await transporter.sendMail({
        from: `"Hema & Hemendra's Anniversary" <${process.env.EMAIL_USER}>`,
        to: rsvpData.email,
        subject: "Thank you for your RSVP - 20th Anniversary Celebration",
        html: generateGuestEmailTemplate(rsvpData)
    });

    // Organizer notification email
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ORGANIZER_EMAIL,
        subject: `New RSVP Response - ${rsvpData.name}`,
        html: generateOrganizerEmailTemplate(rsvpData)
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});