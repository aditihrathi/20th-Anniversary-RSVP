// utils/emailTemplates.js
function generateGuestEmailTemplate(rsvpData) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px; background-color: #f8f8f8; }
          .content { padding: 20px; }
          .footer { text-align: center; padding: 20px; font-size: 0.8em; color: #666; }
          .details { background-color: #f8f8f8; padding: 20px; margin: 20px 0; }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Thank You for Your RSVP</h1>
              <p>Hema & Hemendra's 20th Anniversary Celebration</p>
          </div>
          <div class="content">
              <p>Dear ${rsvpData.name},</p>
              <p>Thank you for responding to our invitation. We have received your RSVP for our anniversary celebration.</p>
              
              <div class="details">
                  <h3>Your Response Details:</h3>
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
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px; background-color: #f8f8f8; }
          .content { padding: 20px; }
          .rsvp-details { background-color: #f8f8f8; padding: 20px; margin: 20px 0; }
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