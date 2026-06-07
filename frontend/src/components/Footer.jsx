// Footer.jsx

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 ">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        
        {/* University Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Kumaun University
          </h2>

          <p className="text-sm leading-6 text-gray-400">
            NAAC Accredited Grade "A" University committed to quality
            education, research, innovation, and academic excellence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer transition">
              Home
            </li>

            <li className="hover:text-yellow-400 cursor-pointer transition">
              About
            </li>

            <li className="hover:text-yellow-400 cursor-pointer transition">
              NAAC Portal
            </li>

            <li className="hover:text-yellow-400 cursor-pointer transition">
              Departments
            </li>
          </ul>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Important Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer transition">
              IQAC
            </li>

            <li className="hover:text-yellow-400 cursor-pointer transition">
              Research
            </li>

            <li className="hover:text-yellow-400 cursor-pointer transition">
              Faculty
            </li>

            <li className="hover:text-yellow-400 cursor-pointer transition">
              Contact Us
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>

          <p className="text-sm text-gray-400 leading-6">
            Kumaun University, Nainital <br />
            Uttarakhand, India
          </p>

          <p className="text-sm mt-3">
            Email: info@kunainital.ac.in
          </p>

          <p className="text-sm">
            Phone: +91 9876543210
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700 py-4 text-center text-sm text-gray-400">
        © 2026 Kumaun University | NAAC Self-Assessment Portal
      </div>
    </footer>
  );
};

export default Footer;