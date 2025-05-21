const sendWhatsAppMessage = require('../helpers/sendWhatsAppMessage');

const sendMessage = async (req, res) => {
  const { customers } = req.body; // Expect an array of customers

  if (!customers || customers.length === 0) {
    return res.status(400).json({ success: false, message: 'At least one customer is required.' });
  }

  try {
    // Iterate through the list of customers and send messages
    for (let customer of customers) {
      const { phone, message } = customer;
      if (!phone || !message) {
        return res.status(400).json({ success: false, message: 'Phone and message are required for each customer.' });
      }

      // Call the WhatsApp sending function
      await sendWhatsAppMessage(phone, message);
    }

    res.status(200).json({ success: true, message: 'WhatsApp messages sent to all customers!' });
  } catch (error) {
    console.error('Error sending messages:', error);
    res.status(500).json({ success: false, message: 'Failed to send WhatsApp messages.' });
  }
};

module.exports = { sendMessage };
