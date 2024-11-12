const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const Rsvp = require('./models/Rsvp');
const app = express();

// Middleware
app.use(cors({
    origin: ['https://lovebirdspost.netlify.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => console.error('MongoDB Connection Error:', err));

// RSVP endpoint with detailed error logging
app.post('/api/rsvp', async (req, res) => {
    try {
        console.log('Received RSVP request:', req.body);

        // Validate required fields
        if (!req.body.name || !req.body.email || !req.body.attendance) {
            console.error('Missing required fields');
            return res.status(400).json({
                success: false,
                error: 'Missing required fields',
                received: req.body
            });
        }

        // Create new RSVP document
        const newRsvp = new Rsvp({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            attendance: req.body.attendance,
            guests: req.body.guests,
            message: req.body.message,
            dietary: req.body.dietary || []
        });

        console.log('Created RSVP document:', newRsvp);

        // Save to database
        const savedRsvp = await newRsvp.save();
        console.log('Saved RSVP to database:', savedRsvp);

        // Configure email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // Send confirmation email
        console.log('Attempting to send email to:', req.body.email);
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: "Thank you for your RSVP - Anniversary Celebration",
            html: `
                <h2>Thank you for your RSVP!</h2>
                <p>We have received your response for Hema & Hemendra's 20th Anniversary Celebration.</p>
                <p><strong>Your Response:</strong> ${req.body.attendance}</p>
                <p><strong>Number of Guests:</strong> ${req.body.guests}</p>
            `
        });
        console.log('Email sent successfully');

        res.json({ 
            success: true, 
            message: 'RSVP received successfully',
            rsvp: savedRsvp
        });
    } catch (error) {
        console.error('Detailed server error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to process RSVP',
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Backend is running!',
        status: 'OK',
        mongoConnection: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});