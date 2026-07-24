import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../../config";

const HeroSection = () => {
      const [leadData, setLeadData] = useState();

      useEffect(() => {
        const fetchClosedLeadData = async () => {
          try {
            const response = await axios.get(
              `${BASE_URL}/user/lead-Data`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              },
            );

            if (response.data.success) {
              setLeadData(response.data);
            }
          } catch (error) {
            console.error("Error fetching dashboard data:", error);
          }
        };

        fetchClosedLeadData();
      }, []);
  return (
    <section id="home" className="min-h-[90vh] flex items-center text-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <span className="bg-white/10 px-4 py-2 rounded-full text-sm">
            🚀 Simple CRM for Managing Leads
          </span>

          <h1 className="mt-6 text-5xl lg:text-6xl font-bold leading-tight">
            Manage Your <span className="text-red-400">Customer Leads</span>
            <br />
            With Ease
          </h1>

          <p className="mt-6 text-lg text-gray-300 leading-8">
            LeadDesk Mini helps businesses collect, organize, and manage
            customer inquiries in one place. Track lead status, prevent
            duplicate entries, and boost productivity with an easy-to-use
            dashboard.
          </p>

          <div className="mt-8 flex gap-4">
            <Link to="/signin">
              <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold transition">
                Get Started
              </button>
            </Link>

            <a href="#features">
              <button className="border border-white hover:bg-white hover:text-purple-900 px-6 py-3 rounded-lg font-semibold transition">
                Learn More
              </button>
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-10">
            <div>
              <h3 className="text-3xl font-bold">100%</h3>
              <p className="text-gray-300">Secure Storage</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">Fast</h3>
              <p className="text-gray-300">Lead Search</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold">{leadData?.closedLeads}+</h3>
              <p className="text-gray-300">Completed Lead Status</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex justify-center">
          <img
            src="https://lirp.cdn-website.com/8137b68e/dms3rep/multi/opt/8814_my+digital+hero_branded+developer-e9a41aa4-640w.png" // Replace with your image
            alt="Lead Management"
            className="w-full max-w-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
