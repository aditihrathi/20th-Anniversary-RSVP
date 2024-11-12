// Add this near the top of your server.js
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});

// Update your RSVP endpoint
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

        // Email configuration (make sure this is set up in your environment variables)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

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