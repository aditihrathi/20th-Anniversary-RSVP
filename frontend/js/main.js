// At the top of main.js
const BACKEND_URL = 'https://lovebirdspost-api.onrender.com';

async function handleSubmit(event) {
    event.preventDefault();
    
    const submitButton = document.querySelector('.submit-btn');
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        // Get selected dietary requirements
        const dietary = Array.from(document.querySelectorAll('input[name="dietary"]:checked'))
            .map(checkbox => checkbox.value);
        data.dietary = dietary;

        console.log('Sending data to:', `${BACKEND_URL}/api/rsvp`);
        console.log('RSVP data:', data);

        const response = await fetch(`${BACKEND_URL}/api/rsvp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        console.log('Response status:', response.status);
        const result = await response.json();
        console.log('Server response:', result);

        if (!response.ok) {
            throw new Error(result.error || 'Failed to submit RSVP');
        }

        // Show success message
// Updated message display based on attendance
const responseMessage = document.getElementById('responseMessage');
responseMessage.style.display = 'block';
responseMessage.style.backgroundColor = 'var(--off-white)';

let attendanceMessage = '';
if (data.attendance === 'yes') {
    attendanceMessage = `You have indicated that you will be attending with ${data.guests} guest${data.guests > 1 ? 's' : ''}.`;
} else if (data.attendance === 'no') {
    attendanceMessage = `You have indicated that you will not be attending.`;
} else if (data.attendance === 'maybe') {
    attendanceMessage = `You have indicated that you may attend with ${data.guests} guest${data.guests > 1 ? 's' : ''}.`;
}

responseMessage.innerHTML = `
    <h4 style="color: var(--black); margin-bottom: 10px; font-size: 1.2rem;">Thank you for your RSVP!</h4>
    <p style="color: var(--grey); margin-bottom: 8px;">A confirmation email will be sent to ${data.email}</p>
    <p style="color: var(--grey);">${attendanceMessage}</p>
`;


        // Reset form
        event.target.reset();
        document.querySelectorAll('.attendance-option').forEach(option => {
            option.classList.remove('selected');
        });
        updateGuestCount(0, true);

    } catch (error) {
        console.error('Submission error:', error);
        
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.style.display = 'block';
        responseMessage.style.backgroundColor = '#fff0f0';
        responseMessage.innerHTML = `
            <h4 style="color: #cc0000; margin-bottom: 10px;">Error Submitting RSVP</h4>
            <p>Please try again later or contact Aditi directly.</p>
            <p style="font-size: 0.8em; color: #666;">${error.message}</p>
        `;
    } finally {
        submitButton.textContent = 'Send RSVP';
        submitButton.disabled = false;
    }
}

// Add this test function
async function testBackendConnection() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/test`);
        const data = await response.json();
        console.log('Backend test response:', data);
        return data;
    } catch (error) {
        console.error('Backend test error:', error);
        return null;
    }
}

// Test connection when page loads
window.addEventListener('load', testBackendConnection);