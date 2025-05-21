const axios = require('axios');

// Basic keyword-based FAQ responses
const faqResponses = [
  // 1–10: Product-related
  { keywords: ["types of jewelry", "jewelry types", "what jewelry"], reply: "We offer Earrings, Bracelets, Bangles, Earrings Combos, Rings, Pendant Sets, and Necklace Sets." },
  { keywords: ["jewelry material", "what material", "made of"], reply: "Our jewelry is crafted from high-quality metal alloys, gold plating, silver plating, and semi-precious stones." },
  { keywords: ["is it real gold", "pure gold", "solid gold"], reply: "We offer gold-plated jewelry, not solid gold." },
  { keywords: ["nickel free", "skin safe", "hypoallergenic"], reply: "Yes, our jewelry is nickel-free and safe for most skin types." },
  { keywords: ["custom jewelry", "personalized", "engrave"], reply: "We currently do not offer custom or engraved jewelry." },
  { keywords: ["how to care", "clean jewelry", "jewelry maintenance"], reply: "Avoid contact with water, perfume, or chemicals. Store in a dry box and clean with a soft cloth." },
  { keywords: ["men's jewelry", "jewelry for men"], reply: "Currently, we offer jewelry collections primarily for women." },
  { keywords: ["kids jewelry", "children jewelry"], reply: "We do not have a dedicated kids jewelry section at the moment." },
  { keywords: ["is it heavy", "weight", "lightweight"], reply: "Our jewelry is designed to be lightweight and comfortable to wear all day." },
  { keywords: ["jewelry combo", "combo offers", "sets"], reply: "Yes, we offer curated jewelry combos for special occasions." },

  // 11–20: Ordering
  { keywords: ["how do i place", "place an order", "how to order"], reply: "Select the jewelry, go to checkout, add your address and payment method, and confirm your order." },
  { keywords: ["cancel my order", "cancel order", "can i cancel"], reply: "Yes, you can cancel your order before it’s shipped." },
  { keywords: ["modify my order", "change my order"], reply: "Once an order is placed, changes are limited. Contact support immediately for help." },
  { keywords: ["order confirmation", "did my order go through", "order placed"], reply: "You’ll receive a confirmation email with order details shortly after placing it." },
  { keywords: ["repeat order", "reorder"], reply: "You can reorder by checking your order history and selecting the desired product." },
  { keywords: ["bulk order", "large quantity", "wholesale"], reply: "For bulk orders, please contact our support team directly." },
  { keywords: ["gift wrap", "gift option"], reply: "We currently do not offer gift wrapping, but you can include a note." },
  { keywords: ["COD", "cash on delivery"], reply: "Currently, we do not support Cash on Delivery." },
  { keywords: ["minimum order", "minimum purchase"], reply: "There is no minimum order value required." },
  { keywords: ["first order", "new user discount"], reply: "Sign up for our newsletter to receive special first-time user offers." },

  // 21–30: Payments
  { keywords: ["payment methods", "payment options", "how can i pay"], reply: "We support UPI, Credit Card, Debit Card, and Net Banking via Razorpay." },
  { keywords: ["payment failed", "issue with payment"], reply: "If your payment failed, please try again or use a different method." },
  { keywords: ["EMI available", "installments"], reply: "We do not currently offer EMI options." },
  { keywords: ["payment secure", "is it safe"], reply: "Yes, all transactions are processed through secure and encrypted payment gateways." },
  { keywords: ["invoice", "receipt", "bill"], reply: "You will receive an invoice via email after successful payment." },
  { keywords: ["refund process", "get my money back"], reply: "Refunds are processed within 7–10 business days after return approval." },
  { keywords: ["discount code", "coupon"], reply: "You can apply valid discount codes during checkout." },
  { keywords: ["where to enter coupon", "apply promo"], reply: "Enter your coupon code in the 'Promo Code' field at checkout." },
  { keywords: ["promo not working", "code invalid"], reply: "Check the coupon's validity and terms. Contact support if the issue continues." },
  { keywords: ["offer expired", "discount ended"], reply: "Offers are valid for a limited time. Stay subscribed for new deals!" },

  // 31–40: Shipping
  { keywords: ["how long", "delivery time", "shipping duration"], reply: "Delivery usually takes between 2 to 7 business days." },
  { keywords: ["track my order", "order status", "where is my order"], reply: "You can track your order via the tracking link sent to your email or in your account." },
  { keywords: ["shipping cost", "delivery charge"], reply: "Shipping is free for orders above ₹499. Below that, standard rates apply." },
  { keywords: ["international shipping", "ship internationally", "deliver abroad"], reply: "Currently, we ship only within India." },
  { keywords: ["courier partner", "delivery company"], reply: "We ship through trusted courier partners like Delhivery, Blue Dart, and Ecom Express." },
  { keywords: ["delayed delivery", "not received"], reply: "If your order is delayed, please check the tracking link or contact our support." },
  { keywords: ["change address", "update shipping address"], reply: "If your order hasn’t shipped yet, contact support to update your address." },
  { keywords: ["wrong address", "incorrect delivery"], reply: "If the address was incorrect, reach out immediately to prevent misdelivery." },
  { keywords: ["delivery timings", "what time delivery"], reply: "Deliveries occur between 9 AM to 7 PM, depending on the courier." },
  { keywords: ["pickup", "self collect", "store pickup"], reply: "We are currently an online-only store and do not offer pickups." },

  // 41–50: Returns and Exchanges
  { keywords: ["return policy", "how to return", "returns", "refund"], reply: "We accept returns within 7 days of delivery. Items must be unused and in original packaging." },
  { keywords: ["exchange product", "swap item"], reply: "We offer exchanges only for damaged or incorrect items. Contact support within 48 hours." },
  { keywords: ["return charges", "who pays return shipping"], reply: "If the return is due to our error, we cover return shipping." },
  { keywords: ["how to return", "return process"], reply: "Contact us with your order ID and reason, and we'll guide you through the return steps." },
  { keywords: ["refund time", "money back"], reply: "Refunds are initiated once the returned item is received and inspected." },
  { keywords: ["item damaged", "received broken", "defective product"], reply: "We’re sorry! Contact us with pictures within 48 hours for a replacement or refund." },
  { keywords: ["wrong item", "incorrect item"], reply: "Please reach out to support with photos and order details for correction." },
  { keywords: ["non-returnable", "final sale"], reply: "Earrings and personalized items are non-returnable for hygiene reasons." },
  { keywords: ["return address", "where to send return"], reply: "Our return address will be shared by support after initiating the return." },
  { keywords: ["cancel return", "change mind on return"], reply: "Yes, if your return is not yet picked up, you can cancel it." },

  // 51–60: Support
  { keywords: ["customer support number", "support number", "phone number"], reply: "You can reach us at +91 9028772788 (Mon–Sat, 10 AM to 6:30 PM)." },
  { keywords: ["email for support", "support email", "contact email"], reply: "You can contact us at krishnaerrorr@gmail.com." },
  { keywords: ["contact support", "customer support", "help", "support team"], reply: "Reach us at +91 9028772788 or krishnaerrorr@gmail.com for any assistance." },
  { keywords: ["chat support", "live chat"], reply: "Live chat support is available on our website from 10 AM to 6 PM IST." },
  { keywords: ["working hours", "support timing"], reply: "Our support hours are Mon–Sat, 10 AM to 6:30 PM." },
  { keywords: ["how to complain", "file complaint"], reply: "Please email your concern with order ID and issue to krishnaerrorr@gmail.com." },
  { keywords: ["feedback", "suggestion"], reply: "We welcome feedback! Email us or leave a review on the product page." },
  { keywords: ["business inquiry", "partnership"], reply: "Email us at krishnaerrorr@gmail.com for collaborations or B2B inquiries." },
  { keywords: ["social media", "instagram", "facebook"], reply: "Follow us on Instagram @herjewels_official and Facebook for updates!" },
  { keywords: ["report issue", "technical error"], reply: "If you face any issues, please report them to our support team via email." },

  // 61–70: Account Management
  { keywords: ["create account", "register", "sign up"], reply: "Click 'Sign Up' on the top right, enter your details, and create an account." },
  { keywords: ["forgot password", "reset password"], reply: "Click on 'Forgot Password' on the login page to reset via email." },
  { keywords: ["change email", "update email"], reply: "Go to your profile settings to update your email address." },
  { keywords: ["change phone number", "update mobile"], reply: "You can update your mobile number from your account dashboard." },
  { keywords: ["delete account", "remove my account"], reply: "Please email us at krishnaerrorr@gmail.com with your request." },
  { keywords: ["account security", "is my account safe"], reply: "Yes, we use secure authentication and data encryption to protect your account." },
  { keywords: ["my orders", "order history"], reply: "Log in and go to 'My Orders' to see your past orders and status." },
  { keywords: ["newsletter", "email updates", "subscribe to your newsletter"], reply: "Scroll to the bottom of the page, enter your email, and click subscribe." },
  { keywords: ["unsubscribe", "stop emails"], reply: "Click 'Unsubscribe' at the bottom of any of our emails." },
  { keywords: ["login issue", "can't log in"], reply: "Please reset your password or contact support for help logging in." },

  // 71–100: Miscellaneous
  { keywords: ["festival offer", "diwali sale", "special sale"], reply: "Watch out for our festive offers during major Indian festivals!" },
  { keywords: ["refer friend", "referral program"], reply: "We’re working on a referral program — stay tuned!" },
  { keywords: ["reward points", "loyalty program"], reply: "We currently don’t have a rewards program." },
  { keywords: ["app available", "mobile app"], reply: "We're launching our mobile app soon!" },
  { keywords: ["location", "store near me"], reply: "We operate online only and do not have physical stores yet." },
  { keywords: ["terms and conditions"], reply: "You can view our terms and conditions in the footer section of our website." },
  { keywords: ["privacy policy", "data privacy"], reply: "We respect your privacy and do not share your data. See our Privacy Policy page." },
  { keywords: ["about us", "who are you"], reply: "We are an Indian jewelry brand committed to elegance, quality, and affordability." },
  { keywords: ["blog", "styling tips"], reply: "Check out our blog section for styling tips and jewelry guides." },
  { keywords: ["best seller", "most popular"], reply: "Our top-selling pieces are highlighted on the homepage and 'Bestsellers' section." },
  { keywords: ["return expired", "missed return window"], reply: "Unfortunately, we can't accept returns after 7 days of delivery." },
  { keywords: ["pre-order", "out of stock"], reply: "Out-of-stock items can’t be ordered, but you can click 'Notify Me' to get updates." },
  { keywords: ["gift card", "voucher"], reply: "We do not offer gift cards yet, but plan to launch soon!" },
  { keywords: ["anniversary gift", "wedding gift"], reply: "Explore our 'Gifting' section for beautiful options for anniversaries and weddings." },
  { keywords: ["eco-friendly", "sustainable packaging"], reply: "We use recyclable and eco-conscious packaging for all our orders." },
  { keywords: ["order limit", "max quantity"], reply: "You can order up to 10 pieces per item in a single order." },
  { keywords: ["GST invoice", "tax invoice"], reply: "We can provide GST invoices upon request. Contact support after placing your order." },
  { keywords: ["do you have warranty", "product guarantee"], reply: "Our products do not come with a warranty, but we guarantee quality at delivery." },
  { keywords: ["how to wear", "jewelry styling"], reply: "Follow us on Instagram or visit our blog for style inspiration." },
  { keywords: ["can i talk to someone", "real person support"], reply: "Yes, call us at +91 9028772788 during support hours for direct assistance." }
];


async function chatWithGemini(req, res) {
  const { message } = req.body;
  const userMessage = message.toLowerCase();

  // 1. Check for FAQ match
  for (const faq of faqResponses) {
    if (faq.keywords.some(keyword => userMessage.includes(keyword))) {
      console.log("Matched FAQ response.");
      return res.json({ reply: faq.reply });
    }
  }

  // 2. If no match, call Gemini API
  const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  try {
    console.log('Sending message to Gemini API:', message);

    const response = await axios.post(apiUrl, {
      contents: [
        {
          parts: [
            { text: message }
          ]
        }
      ]
    }, {
      headers: { 'Content-Type': 'application/json' },
      params: { key: process.env.GEMINI_API_KEY }
    });

    console.log('Gemini API Response:', response.data);

    if (response.data?.candidates?.length > 0) {
      const reply = response.data.candidates[0].content;
      return res.json({ reply });
    } else {
      return res.status(500).json({ error: 'No reply received from Gemini API.' });
    }

  } catch (error) {
    console.error('Gemini API Error:', error.response ? error.response.data : error.message);
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
}

module.exports = { chatWithGemini };
