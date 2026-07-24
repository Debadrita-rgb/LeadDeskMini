import React from "react";
import {
  UserPlusIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const FeatureSection = () => {
  const features = [
    {
      title: "Easy Lead Collection",
      description:
        "Capture customer inquiries through a simple lead form with name, email, mobile number, budget, and message.",
      icon: <UserPlusIcon className="h-12 w-12 text-purple-600" />,
    },
    {
      title: "Secure Storage",
      description:
        "Store all lead information securely in the database with validation to prevent duplicate records.",
      icon: <ShieldCheckIcon className="h-12 w-12 text-purple-600" />,
    },
    {
      title: "Admin Dashboard",
      description:
        "Monitor total users and track New, Contacted, and Closed leads from a centralized dashboard.",
      icon: <ChartBarIcon className="h-12 w-12 text-purple-600" />,
    },
    {
      title: "Fast Search",
      description:
        "Quickly search leads by name, email, or mobile number to find customer information instantly.",
      icon: <MagnifyingGlassIcon className="h-12 w-12 text-purple-600" />,
    },
  ];

  return (
    <section id="features" className="py-20 ">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">Features</h2>
          <p className="mt-3 text-gray-100">
            Everything you need to manage your customer leads efficiently.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300"
            >
              <div className="mb-4">{feature.icon}</div>

              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>

              <p className="text-gray-600 text-sm leading-6">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
