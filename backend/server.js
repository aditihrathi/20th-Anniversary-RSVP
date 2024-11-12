const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Create the Express app
const app = express();

// Middleware for logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});

// Middleware setup
app.use(cors({
    origin: ['https://lovebirdspost.netlify.app', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(bodyParser.json());

// Basic route for root URL
app.get('/', (req, res) => {
    res.json({
        message: 'Anniversary RSVP API',
        status: 'running',
        endpoints: {
            root: '/',
            test: '/api/test',
            rsvp: '/api/rsvp'
        }
    });
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Backend is running!',
        status: 'OK'
    });
});

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// RSVP endpoint
app.post('/api/rsvp', async (req, res) => {
    try {
        console.log('Received RSVP request:', req.body);
        
        // Validate required fields
        if (!req.body.email || !req.body.name || !req.body.attendance) {
            console.log('Missing required fields');
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        console.log('Sending confirmation email to:', req.body.email);

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
            message: 'RSVP received successfully' 
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Failed to process RSVP',
            details: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test endpoint: http://localhost:${PORT}/api/test`);
});