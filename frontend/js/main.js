const FRONTEND_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://lovebirdspost.netlify.app';

async function handleSubmit(event) {
    event.preventDefault();
    
    const submitButton = document.querySelector('.submit-btn');
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        const dietary = Array.from(document.querySelectorAll('input[name="dietary"]:checked'))
            .map(checkbox => checkbox.value);
        data.dietary = dietary;

        const response = await fetch(`${API_URL}/rsvp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to submit RSVP');
        }

        const responseMessage = document.getElementById('responseMessage');
        responseMessage.style.display = 'block';
        responseMessage.style.backgroundColor = 'var(--off-white)';
        responseMessage.innerHTML = `
            <h4 style="color: var(--black); margin-bottom: 10px; font-size: 1.2rem;">Thank you for your RSVP!</h4>
            <p style="color: var(--grey); margin-bottom: 8px;">A confirmation email will be sent to ${data.email}</p>
            <p style="color: var(--grey);">You have indicated you will ${data.attendance} attend with ${data.guests} guest${data.guests > 1 ? 's' : ''}.</p>
        `;

        event.target.reset();
        document.querySelectorAll('.attendance-option').forEach(option => {
            option.classList.remove('selected');
        });
        updateGuestCount(0, true);

    } catch (error) {
        console.error('Error:', error);
        
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.style.display = 'block';
        responseMessage.style.backgroundColor = '#fff0f0';
        responseMessage.innerHTML = `
            <h4 style="color: #cc0000; margin-bottom: 10px;">Error Submitting RSVP</h4>
            <p>Please try again later or contact the organizers directly.</p>
            <p style="color: #666; font-size: 0.8em;">${error.message}</p>
        `;
    } finally {
        submitButton.textContent = 'Send RSVP';
        submitButton.disabled = false;
    }
}