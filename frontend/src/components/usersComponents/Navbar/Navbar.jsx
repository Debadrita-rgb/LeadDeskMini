import { useState, useEffect, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

import logo from "../../../assets/admin_login_logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../../../../config";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { role } = useAuth();
  const dropdownRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNameDropdown, setShowNameDropdown] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("userName");

    if (token && storedName) {
      setIsLoggedIn(true);
      setUserName(storedName);
    } else {
      setIsLoggedIn(false);
      setUserName("Guest");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("showWelcomeToast");
    localStorage.removeItem("userName");

    setIsLoggedIn(false);
    setUserName("Guest");

    toast.success("🎉 Logged out successfully!", {
      autoClose: 3000,
      pauseOnFocusLoss: false,
    });

    navigate("/signin");
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-black/80 via-purple-900/70 to-black/80 backdrop-blur-md text-white shadow-lg">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="cursor-pointer hover:scale-105 transition
        h-10 sm:h-11 md:h-12 lg:h-16
        w-auto object-contain ml-2 sm:ml-5"
            />
          </Link>
        </div>

        {/* Center Menu */}
        <div className="hidden md:flex items-center gap-10 text-white font-medium">
          <Link to="/" className="hover:text-red-500 transition">
            Home
          </Link>
          <Link to="/features" className="hover:text-red-500 transition">
            Features
          </Link>
          <Link to="/contact" className="hover:text-red-500 transition">
            Contact
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4" ref={dropdownRef}>
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowNameDropdown(!showNameDropdown)}
                className="bg-purple-900 hover:bg-purple-800 text-white px-4 py-1.5 rounded-md text-sm"
              >
                Hi{" "}
                {userName
                  ? `${userName.slice(0, 4)}${userName.length > 4 ? "..." : ""}`
                  : "Guest"}
              </button>

              {showNameDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-black/80 backdrop-blur-md border border-purple-800 rounded-md shadow-lg z-[100]">
                  <Link to="/user-leads">
                    <div className="px-4 py-2 hover:bg-purple-900 cursor-pointer">
                      My Lead
                    </div>
                  </Link>

                  <div
                    className="px-4 py-2 hover:bg-red-600 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin">
              <button className="cursor-pointer bg-red-500 hover:bg-purple-950 text-white px-4 py-2 rounded-md shadow-sm transition hidden md:block">
                Sign In
              </button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-black" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
