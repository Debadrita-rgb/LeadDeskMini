import React, { useState, useEffect } from "react";
import {
  ShieldCheckIcon,
  BoltIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import BASE_URL from "../../../../config";

const WhyChooseUsSection = () => {
  const [leadData, setLeadData] = useState();

  useEffect(() => {
    const fetchAllLeadData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/lead-Data`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setLeadData(response.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchAllLeadData();
  }, []);

  const benefits = [
    {
      title: "Simple Lead Management",
      description:
        "Create and organize customer leads with an easy-to-use interface.",
      icon: <ClipboardDocumentListIcon className="h-12 w-12 text-purple-600" />,
    },
    {
      title: "Secure Data",
      description:
        "Protect customer information with secure storage and validation.",
      icon: <ShieldCheckIcon className="h-12 w-12 text-purple-600" />,
    },
    {
      title: "Fast Performance",
      description: "Search, filter, and update lead information instantly.",
      icon: <BoltIcon className="h-12 w-12 text-purple-600" />,
    },
    {
      title: "Business Growth",
      description: "Track lead progress from New to Contacted and Closed.",
      icon: <ChartBarIcon className="h-12 w-12 text-purple-600" />,
    },
  ];

  const stats = [
    { number: "500+", label: "Leads Managed" },
    { number: "100%", label: "Secure Storage" },
    { number: leadData?.allLeads, label: "Total Leads" },
    { number: "24/7", label: "Available" },
  ];

  return (
    <section className="px-6 md:px-16 py-16">
      {" "}
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-100">
            Why Choose LeadDesk Mini?
          </h2>

          <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
            Everything you need to collect, organize, and manage customer leads
            in one simple platform.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="mb-5">{item.icon}</div>

              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 text-center">
          {stats.map((item, index) => (
            <div key={index}>
              <h3 className="text-4xl font-bold text-purple-100">
                {item.number}
              </h3>

              <p className="mt-2 text-gray-300">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
