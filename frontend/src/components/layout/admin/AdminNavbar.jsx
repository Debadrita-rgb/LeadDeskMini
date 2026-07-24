import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Sidebar toggle icons
import { MdArrowDropDown } from "react-icons/md"; // Dropdown Arrow Icon
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import logo from "../../../assets/admin_login_logo.png";

const AdminNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [admin, setAdmin] = useState({
    name: "Admin",
    role: "Admin",
    profilePic: "",
  });
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const getPageTitle = () => {
    
    if (location.pathname.startsWith("/admin/view-single-lead/")) {
      return "View Single Lead ";
    }
    if (location.pathname.startsWith("/admin/view-single-user/")) {
      return "View Single User ";
    }

    if (location.pathname.startsWith("/admin/view-contact-details/")) {
      return "View Contact Details ";
    }
    
    switch (location.pathname) {
      case "/admin/view-all-user":
        return "View All Users";
      case "/admin/view-all-contact":
        return "View Contact";
      case "/admin/view-all-lead":
        return "View All Leads";
      default:
        return "Admin Dashboard";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("showWelcomeToast"); // Clear the toast flag
    toast.success("Logged out successfully!");
    navigate("/backend/login");
  };
  return (
    <nav
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-black/80 via-purple-900/70 to-black/80 backdrop-blur-md 
 text-white p-4 shadow-md flex items-center justify-between z-50 "
    >
      <div className="flex items-center space-x-4">
        <button className=" text-white" onClick={toggleSidebar}>
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <img
          src={logo}
          alt="Logo"
          className="h-15 w-auto sm:inline hidden rounded-4xl ms-5"
        />
      </div>

      <h4 className="text-lg font-semibold text-center md:text-left text-white justify-between items-center">
        {getPageTitle()}
      </h4>

      <div className="relative dropdown">
        <button
          className="flex items-center space-x-2 focus:outline-none"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img
            src={
              admin.profilePic ||
              "https://cdn.pixabay.com/photo/2015/04/13/12/07/business-720429_1280.jpg"
            }
            className="rounded-full w-10 h-10 border-2 border-white object-cover"
            alt="admin"
          />
          <div className="flex flex-col text-left">
            <p className="font-semibold text-white">{admin.name}</p>
            <p className="text-sm text-white">Admin</p>
          </div>
          <MdArrowDropDown size={24} />
        </button>

        {dropdownOpen && (
          <div className="absolute right-4 w-56 bg-gray-200 text-black shadow-xl rounded-md py-2 top-16 p-4 z-50">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-300 cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
