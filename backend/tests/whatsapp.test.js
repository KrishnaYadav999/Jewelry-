const sendWhatsAppMessage = require("../helpers/sendWhatsAppMessage");

const customers = [
  { phone: "+919028772788", message: "Hello, customer 1! Your order is ready for pickup." },
  { phone: "+918830397130", message: "Hello, customer 2! Your order is ready for pickup." },
  { phone: "+913456789012", message: "Hello, customer 3! Your order is ready for pickup." },
  // Add all other customers here...
];

// Function to send messages to all customers
const sendMessagesToAllCustomers = async () => {
  for (let i = 0; i < customers.length; i++) {
    const { phone, message } = customers[i];

    try {
      // Send WhatsApp message
      await sendWhatsAppMessage(phone, message);
      console.log(`Message sent to ${phone}`);
    } catch (error) {
      console.error(`Failed to send message to ${phone}:`, error);
    }
  }
};

// Call the function to send messages to all customers
sendMessagesToAllCustomers();
