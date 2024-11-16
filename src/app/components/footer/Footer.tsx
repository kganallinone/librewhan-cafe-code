import React from "react";
import { ASSETS } from "../../config/assetConfig";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-stone-900 to-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          {/* Logo */}
          <div className="mb-8 md:mb-0 flex items-center">
            <img
              src={ASSETS.IMAGES.LIBREWHANLOGO}
              alt="Librewhan Cafe Logo"
              className="h-20 w-auto"
            />
            <h2 className="text-2xl font-bold ml-4 mr-10">LIBREWHAN Cafe</h2>
          </div>

          {/* Navigation Shortcuts */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <Link
                  to="/about"
                  className="hover:text-teal-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/stores#stores"
                  className="hover:text-teal-400 transition-colors"
                >
                  Stores
                </Link>
              </li>
              <li>
                <Link
                  to="/stores#franchise"
                  className="hover:text-teal-400 transition-colors"
                >
                  Franchise
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-teal-400 transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="flex items-center justify-center md:justify-start mb-2">
              <FaPhoneAlt className="text-teal-400 mr-2" />
              0981 725 1782 or 8642 0110
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <FaEnvelope className="text-teal-400 mr-2" />
              <a
                href="mailto:librewhancafe@gmail.com"
                className="text-teal-400 hover:underline"
              >
                librewhancafe@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 text-center border-t border-gray-700 pt-6">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} LIBREWHAN CAFE. All rights
            reserved.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Designed with love by Lebrewhan Team X KGAN
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
