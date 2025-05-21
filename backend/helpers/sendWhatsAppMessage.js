const puppeteer = require('puppeteer');

async function sendWhatsAppMessage(phone, message) {
  try {
    const browser = await puppeteer.launch({ 
      headless: false, 
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    }); // Run in non-headless mode for debugging
    const page = await browser.newPage();

    // Navigate to WhatsApp Web
    console.log('Navigating to WhatsApp Web...');
    await page.goto(`https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`, { waitUntil: "networkidle2" });

    // Wait for WhatsApp Web to load
    console.log('Waiting for search input selector...');
    await page.waitForSelector('input[title="Search or start new chat"]', { timeout: 60000 }); // Increased timeout

    // Take a screenshot to inspect the loaded page (for debugging)
    await page.screenshot({ path: 'whatsapp_debug.png' });
    console.log('Screenshot taken for debugging (whatsapp_debug.png).');

    // Search for the contact using the phone number
    console.log(`Searching for phone: ${phone}...`);
    await page.type('input[title="Search or start new chat"]', phone, { delay: 100 });
    await page.waitForTimeout(2000); // Wait for search to complete

    // Ensure contact is found
    console.log('Waiting for contact to be clicked...');
    await page.waitForSelector(`span[title="${phone}"]`);
    await page.click(`span[title="${phone}"]`);

    // Wait for the message box to appear
    console.log('Waiting for message box...');
    await page.waitForSelector('div._3u328');
    await page.type('div._3u328', message, { delay: 100 });

    // Wait for the send button to appear and click it
    console.log('Waiting for send button...');
    await page.waitForSelector('span[data-testid="send"]', { timeout: 60000 }); // Increased timeout
    await page.click('span[data-testid="send"]');

    console.log(`Message sent to ${phone}`);

    // Close the browser after sending the message
    await browser.close();
  } catch (error) {
    console.error(`Error sending message to ${phone}:`, error);
  }
}

module.exports = sendWhatsAppMessage;
