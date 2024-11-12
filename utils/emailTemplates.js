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
          body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f8f4e9; }
          .container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; }
          .header { text-align: center; background-color: #282828; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0; }
          .header h1 { font-size: 24px; margin: 0; }
          .header p { margin: 5px 0; font-size: 14px; }
          .content { padding: 20px; font-size: 16px; }
          .details, .countdown { background-color: #f8f8f8; padding: 15px; margin: 20px 0; border-radius: 6px; }
          .details h3, .countdown h3 { font-size: 18px; color: #282828; margin-bottom: 10px; }
          .details p, .countdown p { font-size: 14px; margin: 8px 0; }
          .countdown-timer { display: flex; justify-content: center; gap: 10px; font-size: 16px; }
          .countdown-item { background-color: #ffffff; border: 1px solid #d3d3d3; padding: 10px; text-align: center; border-radius: 6px; width: 60px; }
          .countdown-item h4 { font-size: 20px; color: #282828; margin: 0; }
          .countdown-item p { margin: 0; color: #666; font-size: 12px; }
          .button { display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #282828; text-decoration: none; border-radius: 4px; font-size: 14px; margin-top: 15px; }
          .footer { text-align: center; padding: 10px; font-size: 12px; color: #666; }
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
              <p>Thank you for confirming your attendance at our anniversary celebration. We’re excited to celebrate this milestone with you!</p>
              
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
              <p>If you need to make any changes to your RSVP, please contact us directly.</p>
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
          body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f8f4e9; }
          .container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; }
          .header { text-align: center; background-color: #282828; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0; }
          .header h1 { font-size: 24px; margin: 0; }
          .content { padding: 20px; font-size: 16px; }
          .rsvp-details { background-color: #f8f8f8; padding: 15px; margin: 20px 0; border-radius: 6px; }
          .rsvp-details h3 { font-size: 18px; color: #282828; margin-bottom: 10px; }
          .rsvp-details p { font-size: 14px; margin: 8px 0; }
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
