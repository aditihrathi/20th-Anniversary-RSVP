const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const Rsvp = require('./models/Rsvp');
const app = express();

// Updated CORS configuration
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
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Anniversary RSVP API',
        status: 'running',
        endpoints: {
            test: '/api/test',
            rsvp: '/api/rsvp',
            adminRsvps: '/api/rsvps'
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

// Get all RSVPs endpoint (password protected)
app.get('/api/rsvps', async (req, res) => {
    try {
        console.log('Received admin request');
        // Simple password protection
        const providedPassword = req.headers.authorization;
        
        if (!providedPassword || providedPassword !== process.env.ADMIN_PASSWORD) {
            console.log('Unauthorized attempt');
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const rsvps = await Rsvp.find().sort({ submittedAt: -1 });
        console.log(`Found ${rsvps.length} RSVPs`);
        res.json(rsvps);
    } catch (error) {
        console.error('Error fetching RSVPs:', error);
        res.status(500).json({ error: 'Failed to fetch RSVPs' });
    }
});

// RSVP endpoint
app.post('/api/rsvp', async (req, res) => {
    try {
        console.log('Received RSVP:', req.body);
        
        // Create new RSVP in database
        const newRsvp = new Rsvp(req.body);
        await newRsvp.save();

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