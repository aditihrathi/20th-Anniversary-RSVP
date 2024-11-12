// utils/emailTemplates.js

function generateGuestEmailTemplate(rsvpData) {
  const eventDate = new Date("2024-12-21T19:30:00");
  const timeUntilEvent = eventDate - Date.now();
  const days = Math.floor(timeUntilEvent / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeUntilEvent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return `
  <!DOCTYPE html>
  <html>
  <head>
      <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f8f4e9; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
          .header { text-align: center; padding: 20px; background-color: #282828; color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px; }
          .header h1 { font-family: 'Playfair Display SC', serif; font-size: 2rem; }
          .content { padding: 20px; }
          .footer { text-align: center; padding: 20px; font-size: 0.8em; color: #666; }
          .details, .countdown { background-color: #f8f8f8; padding: 20px; margin: 20px 0; border-radius: 4px; }
          .details h3, .countdown h3 { color: #282828; font-size: 1.2rem; margin-bottom: 10px; }
          .countdown { text-align: center; font-size: 1.2rem; }
          .countdown-timer { display: flex; justify-content: center; gap: 10px; }
          .countdown-item { padding: 10px; background-color: #ffffff; border: 1px solid #d3d3d3; border-radius: 4px; width: 80px; }
          .countdown-item h4 { margin: 0; font-size: 1.5rem; color: #282828; }
          .countdown-item p { margin: 0; font-size: 0.9rem; color: #666; text-transform: uppercase; }
          .button { display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #282828; text-decoration: none; border-radius: 4px; }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Thank You for Your RSVP!</h1>
              <p>Hema & Hemendra's 20th Anniversary Celebration</p>
          </div>
          <div class="content">
              <p>Dear ${rsvpData.name},</p>
              <p>Thank you for confirming your attendance at our anniversary celebration. We are excited to celebrate this with you!</p>
              
              <div class="details">
                  <h3>Your RSVP Details:</h3>
                  <p><strong>Attendance:</strong> ${rsvpData.attendance}</p>
                  <p><strong>Number of Guests:</strong> ${rsvpData.guests}</p>
                  ${rsvpData.dietary.length ? `<p><strong>Dietary Requirements:</strong> ${rsvpData.dietary.join(', ')}</p>` : ''}
                  ${rsvpData.message ? `<p><strong>Your Message:</strong> ${rsvpData.message}</p>` : ''}
              </div>

              <div class="details">
                  <h3>Event Details:</h3>
                  <p><strong>Date:</strong> Saturday, December 21st, 2024</p>
                  <p><strong>Time:</strong> 7:30 PM - 11:30 PM</p>
                  <p><strong>Venue:</strong> Villa Borghesie</p>
              </div>

              <div class="countdown">
                  <h3>Countdown to the Event:</h3>
                  <div class="countdown-timer">
                      <div class="countdown-item">
                          <h4>${days}</h4>
                          <p>Days</p>
                      </div>
                      <div class="countdown-item">
                          <h4>${hours}</h4>
                          <p>Hours</p>
                      </div>
                  </div>
              </div>

              <div style="text-align: center; margin-top: 20px;">
                  <a href="https://maps.google.com?q=Villa+Borghesie" class="button" target="_blank">Get Directions</a>
              </div>
          </div>
          <div class="footer">
              <p>If you need to make any changes to your RSVP, please contact Aditi directly.</p>
          </div>
      </div>
  </body>
  </html>
  `;
}

function generateOrganizerEmailTemplate(rsvpData) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f8f4e9; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
          .header { text-align: center; padding: 20px; background-color: #282828; color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px; }
          .header h1 { font-size: 2rem; }
          .content { padding: 20px; }
          .rsvp-details { background-color: #f8f8f8; padding: 20px; margin: 20px 0; border-radius: 4px; }
          .rsvp-details h3 { color: #282828; font-size: 1.2rem; margin-bottom: 10px; }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>New RSVP Received</h1>
          </div>
          <div class="content">
              <div class="rsvp-details">
                  <h3>RSVP Details:</h3>
                  <p><strong>Name:</strong> ${rsvpData.name}</p>
                  <p><strong>Email:</strong> ${rsvpData.email}</p>
                  <p><strong>Phone:</strong> ${rsvpData.phone}</p>
                  <p><strong>Attendance:</strong> ${rsvpData.attendance}</p>
                  <p><strong>Number of Guests:</strong> ${rsvpData.guests}</p>
                  ${rsvpData.dietary.length ? `<p><strong>Dietary Requirements:</strong> ${rsvpData.dietary.join(', ')}</p>` : ''}
                  ${rsvpData.message ? `<p><strong>Message:</strong> ${rsvpData.message}</p>` : ''}
              </div>
          </div>
      </div>
  </body>
  </html>
  `;
}

module.exports = {
  generateGuestEmailTemplate,
  generateOrganizerEmailTemplate
};
