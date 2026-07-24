import React, { useState } from "react";
import { FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";


export default function AdminSidebar({ isOpen, toggleSidebar }) {

  return (
    <>
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden
  bg-white/10 shadow-2xl backdrop-blur-md border border-white/20 p-6
  transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-64"}
  md:translate-x-0 md:w-64 lg:w-64 z-50`}
      >
        <nav className="mt-5 space-y-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center space-x-2 p-4 rounded transition duration-200 text-white hover:text-[#1b4c6d] hover:bg-gray-100 hover:rounded-2xl"
          >
            <FiHome /> <span>Dashboard</span>
          </Link>
          <Link
            to="/admin/view-all-lead"
            className="block items-center p-2 ps-3 rounded transition duration-200 text-white hover:text-[#1b4c6d] hover:bg-gray-100 hover:rounded-2xl"
          >
            <MdCategory size={10} className="inline-block mr-2" />
            Lead
          </Link>
          <Link
            to="/admin/view-all-user"
            className="flex items-center space-x-2 p-4 rounded transition duration-200 text-white hover:text-[#1b4c6d] hover:bg-gray-100 hover:rounded-2xl"
          >
            <FaUser size={10} className="inline-block mr-2" />
            View User
          </Link>
          <Link
            to="/admin/view-all-user"
            className="flex items-center space-x-2 p-4 rounded transition duration-200 text-white hover:text-[#1b4c6d] hover:bg-gray-100 hover:rounded-2xl"
          >
            <RiContactsFill size={10} className="inline-block mr-2" />
            View Contact
          </Link>
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
