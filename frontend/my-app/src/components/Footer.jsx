import React from 'react';

const Footer = () => {
  return (
    <footer className="py-10 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Newsletter Section */}
        <div className="flex flex-col mb-8">
          <h2 className="text-xl font-bold mb-2">Join Our Newsletter</h2>
          <p className="mb-4">Sign up for exclusive offers and updates.</p>
          <div className="flex flex-col md:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Enter your email"
              className="p-2 rounded-md border border-gray-400 mb-2 md:mb-0 md:mr-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
              aria-label="Subscribe to newsletter"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Customer Care Section */}
        <div className="flex flex-col mb-8">
          <h2 className="text-xl font-bold mb-2">Customer Care</h2>
          <p className="mb-1">Mon - Sat | 10:00 AM to 6 PM</p>
          <p className="mb-1">📞 +91 9028772788 (10 AM to 6:30 PM)</p>
          <p className="mb-1">📧 KYA@gmail.com</p>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col mb-8">
          <h2 className="text-xl font-bold mb-2">Quick Links</h2>
          <ul className="space-y-2">
            {[
              { text: "Customer Reviews", icon: "star", link: "/Crf" },
              { text: "Our Blogs", icon: "blog", link: "/blogs" }, // Updated link
              { text: "Store Locator", icon: "map-marker-alt", link: "/StoreLocator" },
              { text: "Jewellery Care", icon: "cogs", link: "/JewelryCare" },
              { text: "Join Us", icon: "user-plus", link: "#" },
              { text: "Info", icon: "info-circle", link: "/info" }, // Updated link
            ].map((link, index) => (
              <li key={index} className="flex items-center">
                <i className={`fas fa-${link.icon} text-blue-400 mr-2`}></i>
                <a 
                  href={link.link} 
                  className="hover:underline hover:text-blue-300 transition duration-200"
                  aria-label={link.text}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Brand Description */}
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-1">Jewels</h2>
        <p className="max-w-lg mx-auto text-sm">
          Discover the perfect piece of western jewellery that speaks to you. 
          With free shipping on all orders and easy returns, it's never been easier 
          to add a touch of western flair to your jewellery collection.
        </p>
      </div>

      {/* Address Section */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold mb-1">Contact Us</h3>
        <p>KYA Fashions Private Limited</p>
        <p>Sarvoday nager ambernath west ajit Blg B-wing 502</p>
      </div>

      {/* Footer Copyright */}
      <div className="mt-4 text-center text-sm text-gray-400">
        <p>© 2025 - Jewels. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
