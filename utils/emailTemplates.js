const imageUrl = 'https://i.imgur.com/6LYRbGN.png';

function generateEmailTemplate(rsvpData) {
  if (rsvpData.attendance === 'yes') {
    return generateYesEmailTemplate(rsvpData);
  } else if (rsvpData.attendance === 'no') {
    return generateNoEmailTemplate(rsvpData);
  } else if (rsvpData.attendance === 'maybe') {
    return generateMaybeEmailTemplate(rsvpData);
  }
}

// yes
  function generateYesEmailTemplate(rsvpData) {
  const eventDate = new Date("2024-12-21T19:30:00");
  const timeUntilEvent = eventDate - Date.now();
  const days = Math.floor(timeUntilEvent / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeUntilEvent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display+SC:wght@900&family=UnifrakturMaguntia&display=swap" rel="stylesheet">
  </head>
  <body style="font-family: 'Times New Roman', Times, serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f4e9;">
      <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; border: 1px solid #d3d3d3;">
          <!-- Header with image and title -->
          <div style="text-align: center; background-color: #282828; padding: 15px;">
              <h1 style="font-family: 'UnifrakturMaguntia', serif; font-size: 32px; color: #ffffff; margin: 0;">The Lovebird's Post</h1>
              <p style="font-size: 14px; color: #ffffff; margin: 5px 0;">Hema and Hemendra’s Big Night!</p>
          </div>
          
          <div style="text-align: center;">
              <img src="${imageUrl}" alt="The Lovebird's Post" style="width: 100%; max-width: 600px; margin: 20px 0; border-radius: 8px;" />
          </div>

          <div style="padding: 20px;">
              <p style="font-size: 16px;">Dear ${rsvpData.name},</p>
              <p style="font-size: 16px;">Thank you for confirming your attendance! We’re excited to celebrate this milestone with you!</p>
              
              <div style="background-color: #f8f8f8; padding: 15px; margin: 20px 0; border-radius: 6px; border: 1px solid #d3d3d3;">
                  <h3 style="font-family: 'Playfair Display SC', serif; font-size: 18px; color: #282828; margin-bottom: 10px;">Your RSVP Details</h3>
                  <p style="font-size: 14px; margin: 8px 0;"><strong>Number of Guests:</strong> ${rsvpData.guests}</p>
                  ${rsvpData.dietary.length ? `<p style="font-size: 14px; margin: 8px 0;"><strong>Dietary Requirements:</strong> ${rsvpData.dietary.join(', ')}</p>` : ''}
              </div>

              <div style="background-color: #f8f8f8; padding: 15px; margin: 20px 0; border-radius: 6px; border: 1px solid #d3d3d3;">
                  <h3 style="font-family: 'Playfair Display SC', serif; font-size: 18px; color: #282828; margin-bottom: 10px;">Event Details</h3>
                  <p style="font-size: 14px; margin: 8px 0;"><strong>Date:</strong> December 21st, 2024</p>
                  <p style="font-size: 14px; margin: 8px 0;"><strong>Time:</strong> 7:30 PM - 11:30 PM</p>
                  <p style="font-size: 14px; margin: 8px 0;"><strong>Venue:</strong> Villa Borghese - 70 Widmer Rd, Wappingers Falls, NY 12590</p>
                  <p style="font-size: 14px; margin: 8px 0;"><strong>Venue:</strong> Dress Code - Indian or Western formal</p>

              </div>
              <p style="font-size: 16px; text-align: center; margin-top: 20px;">If your plans change, please feel free to reply to this email or text me at (845) 392-8087!</p>
              <p style="font-size: 14px; margin: 8px 0;"><strong>No Gifts Please!!</strong></p>

          </div>
      </div>
  </body>
  </html>
  `;
}

// no
function generateNoEmailTemplate(rsvpData) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display+SC:wght@900&family=UnifrakturMaguntia&display=swap" rel="stylesheet">
  </head>
  <body style="font-family: 'Times New Roman', Times, serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f4e9;">
      <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; border: 1px solid #d3d3d3;">
          <div style="text-align: center; background-color: #282828; padding: 15px;">
              <h1 style="font-family: 'UnifrakturMaguntia', serif; font-size: 32px; color: #ffffff; margin: 0;">The Lovebird's Post</h1>
              <p style="font-size: 14px; color: #ffffff; margin: 5px 0;">Hema and Hemendra’s Big Night!</p>
          </div>
          <div style="padding: 20px;">
              <p style="font-size: 16px;">Dear ${rsvpData.name},</p>
              <p style="font-size: 16px;">Thank you for letting us know. We’re sorry that you won’t be able to join us for Hema and Hemendra’s 20th Anniversary Celebration, and we will miss having you there.</p>
              <p style="font-size: 16px;">If your plans happen to change, know that we have room for you! Text me at (845) 392-8087, with any questions or updates.</p>
          </div>
      </div>
  </body>
  </html>
  `;
}

// maybe
function generateMaybeEmailTemplate(rsvpData) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display+SC:wght@900&family=UnifrakturMaguntia&display=swap" rel="stylesheet">
  </head>
  <body style="font-family: 'Times New Roman', Times, serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f4e9;">
      <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; border: 1px solid #d3d3d3;">
          <div style="text-align: center; background-color: #282828; padding: 15px;">
              <h1 style="font-family: 'UnifrakturMaguntia', serif; font-size: 32px; color: #ffffff; margin: 0;">The Lovebird's Post</h1>
              <p style="font-size: 14px; color: #ffffff; margin: 5px 0;">Hema and Hemendra’s Big Night!</p>
          </div>
          <div style="padding: 20px;">
              <p style="font-size: 16px;">Dear ${rsvpData.name},</p>
              <p style="font-size: 16px;">Thank you for your response! We understand that your plans are uncertain, but we hope to see you there! Feel free to text me at (845) 392-8087, if you have any updates or questions.</p>
          </div>
      </div>
  </body>
  </html>
  `;
}

module.exports = {
  generateEmailTemplate
};
