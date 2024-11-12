const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Updated CORS configuration
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

// RSVP endpoint
app.post('/api/rsvp', async (req, res) => {
    try {
        console.log('Received RSVP:', req.body);

        // Send confirmation email
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
});