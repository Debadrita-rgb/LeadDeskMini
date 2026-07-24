import { MdEdit } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../../config";


const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    nUser: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/dashboardData`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.data.success) {
          setDashboardData(response.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const cardsValue = [
    {
      title: "Total Users",
      value: dashboardData.nUser,
      color: "text-green-500",
    },
    {
      title: "Total New Leads",
      value: dashboardData.nNewLeads,
      color: "text-blue-500",
    },
    {
      title: "Total Contacted Leads",
      value: dashboardData.nContactedLeads,
      color: "text-yellow-500",
    },
    {
      title: "Total Closed Leads",
      value: dashboardData.nClosedLeads,
      color: "text-red-500",
    },
  ];

  return (
    <main className="p-6 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsValue.map((card, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-sm text-gray-500">{card.title}</h3>
            <p className={`text-3xl font-bold mt-2 ${card.color}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      </main>
  );
};

export default AdminDashboard;
