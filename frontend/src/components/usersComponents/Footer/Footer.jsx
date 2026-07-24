import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <footer className="mt-12 bg-[#002a47] py-4 text-center text-sm text-gray-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-5">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ABOUT</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contact" className="hover:none">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">FOLLOW US</h3>
            <div className="flex space-x-4 ms-35">
              <Link
                to="https://www.facebook.com/"
                aria-label="Facebook"
                className="hover:opacity-75"
                target="_blank"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/250px-Facebook_f_logo_%282019%29.svg.png"
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </Link>
              <Link
                to="https://www.instagram.com/"
                aria-label="Instagram"
                className="hover:opacity-75"
                target="_blank"
              >
                <img
                  src="https://cdn-icons-png.freepik.com/256/15707/15707869.png?semt=ais_hybrid"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </Link>
              <Link
                to="https://in.linkedin.com/"
                aria-label="LinkedIn"
                className="hover:opacity-75"
                target="_blank"
              >
                <img
                  src="https://img.magnific.com/premium-vector/vinnytsia-ukraine-april-29-2023-popular-social-media-logo-icon-linkedin-vector-design-realistic-editorial-sign_545793-1682.jpg?semt=ais_hybrid&w=740&q=80"
                  alt="LinkedIn"
                  className="w-6 h-6"
                />
              </Link>
            </div>
          </div>
        </div>
        © 2026 LeadDesk Mini Inc. All rights reserved.
      </footer>
    </div>
  );
};

export default Footer;
