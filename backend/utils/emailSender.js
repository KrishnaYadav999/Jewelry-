const sgMail = require('@sendgrid/mail');

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Function to send OTP email
 * @param {string} recipientEmail - The recipient's email address
 * @param {string} otp - The OTP to be sent
 */
const sendOtpEmail = async (recipientEmail, otp) => {
  const msg = {
    to: recipientEmail,
    from: 'aniket.plabsintern@gmail.com',
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
    html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
  };

  try {
    await sgMail.send(msg);
    console.log(`OTP sent successfully to ${recipientEmail}`);
  } catch (error) {
    console.error('Error sending OTP:', error.response?.body || error.message || error);
    throw new Error('Failed to send OTP');
  }
};

module.exports = { sendOtpEmail };
