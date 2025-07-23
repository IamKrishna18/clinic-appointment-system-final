import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className= "bg-gradient-to-r from-blue-900 to-green-800 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Clinic Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2">MediCare Connect</h2>
          <p>Your health is our priority. Book appointments online and meet certified doctors.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Home</a></li>
             <li><a href="#hospitals" className="hover:underline">Hospitals</a></li>
            <li><a href="#services" className="hover:underline">Services</a></li>
            <li><a href="#about" className="hover:underline">About </a></li>
           
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p>Email: support@clinicsite.com</p>
          <p>Phone: +91-9876543210</p>
          <p>Address: 123 Health St, Wellness City, India</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs mt-8 border-t border-gray-400 pt-4">
        © {new Date().getFullYear()} MediCare Connect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
