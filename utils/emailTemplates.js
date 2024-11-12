const imageUrl = https://i.imgur.com/6LYRbGN.png

function generateEmailTemplate(rsvpData) {
  // Determine which template to use based on the RSVP response
  if (rsvpData.attendance === 'yes') {
    return generateYesEmailTemplate(rsvpData);
  } else if (rsvpData.attendance === 'no') {
    return generateNoEmailTemplate(rsvpData);
  } else if (rsvpData.attendance === 'maybe') {
    return generateMaybeEmailTemplate(rsvpData);
  }
}

// Template for "Yes" RSVP
function generateYesEmailTemplate(rsvpData) {
  const eventDate = new Date("2024-12-21T19:30:00");
  const timeUntilEvent = eventDate - Date.now();
  const days = Math.floor(timeUntilEvent / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeUntilEvent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return `
  <!DOCTYPE html>
  <html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f4e9;">
          <div style="padding: 20px;">
              <p style="font-size: 16px;">Dear ${rsvpData.name},</p>
              <p style="font-size: 16px;">Thank you for confirming your attendance! We’re excited to celebrate this milestone with you!</p>
              
              <div style="background-color: #f8f8f8; padding: 15px; margin: 20px 0; border-radius: 6px;">
                  <h3 style="font-size: 18px; color: #282828; margin-bottom: 10px;">Your RSVP Details:</h3>
                  <p style="font-size: 14px; margin: 8px 0;"><strong>Number of Guests:</strong> ${rsvpData.guests}</p>
                  ${rsvpData.dietary.length ? `<p style="font-size: 14px; margin: 8px 0;"><strong>Dietary Requirements:</strong> ${rsvpData.dietary.join(', ')}</p>` : ''}
              </div>
              <div style="text-align: center;">
              <img src="${imageUrl}" alt="The Lovebird's Post" style="width: 100%; max-width: 600px; border-radius: 8px 8px 0 0;" />
          </div>
              <div style="background-color: #f8f8f8; padding: 15px; margin: 20px 0; border-radius: 6px;">
                  <h3 style="font-size: 18px; color: #282828; margin-bottom: 10px;">Event Details:</h3>
                  <p style="font-size: 14px; margin: 8px 0;"><strong>Date:</strong> December 21st, 2024</p>
                  <p style="font-size: 14px; margin: 8px 0;"><strong>Time:</strong> 7:30 PM - 11:30 PM</p>
                  <p style="font-size: 14px; margin: 8px 0;"><strong>Venue:</strong> Villa Borghesie</p>
              </div>

              <div style="text-align: center; padding: 20px;">
                  <h3 style="font-size: 18px; color: #282828; margin-bottom: 10px;">Countdown to the Event:</h3>
                  <div style="display: flex; justify-content: center; gap: 10px; font-size: 16px;">
                      <div style="background-color: #ffffff; border: 1px solid #d3d3d3; padding: 10px; text-align: center; border-radius: 6px; width: 60px;">
                          <h4 style="font-size: 20px; color: #282828; margin: 0;">${days}</h4>
                          <p style="margin: 0; color: #666; font-size: 12px;">Days</p>
                      </div>
                      <div style="background-color: #ffffff; border: 1px solid #d3d3d3; padding: 10px; text-align: center; border-radius: 6px; width: 60px;">
                          <h4 style="font-size: 20px; color: #282828; margin: 0;">${hours}</h4>
                          <p style="margin: 0; color: #666; font-size: 12px;">Hours</p>
                      </div>
                  </div>
              </div>

              <p style="font-size: 16px;">If your plans change, please feel free to reply to this email or text Aditi directly.</p>
          </div>
      </div>
  </body>
  </html>
  `;
}

// Template for "No" RSVP
function generateNoEmailTemplate(rsvpData) {
  return `
  <!DOCTYPE html>
  <html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f4e9;">
      <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px;">
          <div style="padding: 20px;">
              <p style="font-size: 16px;">Dear ${rsvpData.name},</p>
              <p style="font-size: 16px;">Thank you for letting us know. We’re sorry that you won’t be able to join us for Hema and Hemendra’s 20th Anniversary Celebration, but we understand and will miss having you with us.</p>
              <p style="font-size: 16px;">If your plans happen to change, please feel free to reach out by replying to this email or texting Aditi directly.</p>
          </div>
      </div>
  </body>
  </html>
  `;
}

// Template for "Maybe" RSVP
function generateMaybeEmailTemplate(rsvpData) {
  return `
  <!DOCTYPE html>
  <html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f4e9;">
      <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px;">
          <div style="padding: 20px;">
              <p style="font-size: 16px;">Dear ${rsvpData.name},</p>
              <p style="font-size: 16px;">Thank you for your response. We understand that your plans are uncertain, and we hope you’ll be able to join us for Hema and Hemendra’s 20th Anniversary Celebration if possible.</p>
              <p style="font-size: 16px;">If you decide to attend, please feel free to update your RSVP by replying to this email or texting Aditi directly.</p>
          </div>
      </div>
  </body>
  </html>
  `;
}

module.exports = {
  generateEmailTemplate
};
