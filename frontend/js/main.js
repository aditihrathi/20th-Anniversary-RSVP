// Add this at the top of your main.js
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://lovebirdspost-api.onrender.com';

async function handleSubmit(event) {
    event.preventDefault();
    
    const submitButton = document.querySelector('.submit-btn');
    const responseMessage = document.getElementById('responseMessage');
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        // Get selected dietary requirements
        const dietary = Array.from(document.querySelectorAll('input[name="dietary"]:checked'))
            .map(checkbox => checkbox.value);
        data.dietary = dietary;

        console.log('Sending RSVP data:', data);  // Debug log

        const response = await fetch(`${API_URL}/api/rsvp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('Server response:', result);  // Debug log

        if (!response.ok) {
            throw new Error(result.error || 'Failed to submit RSVP');
        }

        // Success message
        responseMessage.style.display = 'block';
        responseMessage.style.backgroundColor = 'var(--off-white)';
        responseMessage.innerHTML = `
            <h4 style="color: var(--black); margin-bottom: 10px; font-size: 1.2rem;">Thank you for your RSVP!</h4>
            <p style="color: var(--grey); margin-bottom: 8px;">A confirmation email will be sent to ${data.email}</p>
            <p style="color: var(--grey);">You have indicated you will ${data.attendance} attend with ${data.guests} guest${data.guests > 1 ? 's' : ''}.</p>
        `;

        // Reset form
        event.target.reset();
        document.querySelectorAll('.attendance-option').forEach(option => {
            option.classList.remove('selected');
        });
        updateGuestCount(0, true);

    } catch (error) {
        console.error('Error:', error);
        
        // Error message
        responseMessage.style.display = 'block';
        responseMessage.style.backgroundColor = '#fff0f0';
        responseMessage.innerHTML = `
            <h4 style="color: #cc0000; margin-bottom: 10px;">Error Submitting RSVP</h4>
            <p>Please try again later or contact the organizers directly.</p>
            <p style="color: #666; font-size: 0.8em;">${error.message}</p>
        `;
    } finally {
        // Reset button state
        submitButton.textContent = 'Send RSVP';
        submitButton.disabled = false;
    }
}

// Add this to test the API connection when the page loads
window.addEventListener('load', async () => {
    try {
        const response = await fetch(`${API_URL}/api/test`);
        const data = await response.json();
        console.log('API Test Response:', data);
    } catch (error) {
        console.error('API Test Error:', error);
    }
});

// Make sure your existing functions are still here
function selectAttendance(element) {
    document.querySelectorAll('.attendance-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    element.classList.add('selected');
    document.getElementById('attendance').value = element.dataset.value;

    const isYesOrMaybe = ['yes', 'maybe'].includes(element.dataset.value);
    document.querySelectorAll('.guest-counter button').forEach(btn => {
        btn.disabled = !isYesOrMaybe;
    });
    if (!isYesOrMaybe) {
        updateGuestCount(0, true);
    }
}

function updateGuestCount(change, reset = false) {
    const countDisplay = document.getElementById('guestCount');
    const guestsInput = document.getElementById('guestsInput');
    const decreaseBtn = document.getElementById('decreaseBtn');
    let currentCount = parseInt(countDisplay.textContent);

    if (reset) {
        currentCount = 1;
    } else {
        currentCount += change;
    }

    currentCount = Math.max(1, Math.min(8, currentCount));
    
    countDisplay.textContent = currentCount;
    guestsInput.value = currentCount;
    
    decreaseBtn.disabled = currentCount === 1;
}