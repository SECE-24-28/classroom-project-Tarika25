import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Power Up
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for instant mobile recharges. Experience premium service with bank-grade security.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-amber-400 transition-colors text-sm">Home</Link>
              <Link to="/recharge" className="block text-gray-300 hover:text-amber-400 transition-colors text-sm">Recharge Now</Link>
              <Link to="/plans" className="block text-gray-300 hover:text-amber-400 transition-colors text-sm">Browse Plans</Link>
              <Link to="/offers" className="block text-gray-300 hover:text-amber-400 transition-colors text-sm">Special Offers</Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-amber-400 transition-colors text-sm">Help Center</a>
              <a href="#" className="block text-gray-300 hover:text-amber-400 transition-colors text-sm">Contact Us</a>
              <a href="#" className="block text-gray-300 hover:text-amber-400 transition-colors text-sm">FAQ</a>
              <a href="#" className="block text-gray-300 hover:text-amber-400 transition-colors text-sm">Terms & Conditions</a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-amber-400">📞</span>
                <span className="text-gray-300 text-sm">+91 1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-amber-400">✉️</span>
                <span className="text-gray-300 text-sm">support@powerup.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © 2024 Power Up. All rights reserved. Built with ❤️ for seamless recharge experience.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Security</a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Careers</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}