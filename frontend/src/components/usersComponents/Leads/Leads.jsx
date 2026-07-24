import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BASE_URL from "../../../../config";
import { jwtDecode } from "jwt-decode";

const Leads = () => {
      const navigate = useNavigate();
      const [leads, setLeads] = useState([]);

   useEffect(() => {
     const token = localStorage.getItem("token");
     const decode = jwtDecode(token);
     const userId = decode.id;

     fetch(`${BASE_URL}/user/get-lead-by-userId/${userId}`, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     })
       .then((res) => res.json())
       .then((data) => setLeads(data))
       .catch((err) => console.error(err));
   }, []);

      return (
        <div className="min-h-screen py-10 px-6 md:px-20">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Lead Management
                </h1>
                <p className="text-gray-500 mt-1">Manage all customer leads.</p>
              </div>

              <button
                onClick={() => navigate("/add-lead")}
                className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-lg transition"
              >
                + Add Lead
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="min-w-full">
                <thead className="bg-purple-700 text-white">
                  <tr>
                    <th className="px-5 py-3 text-left">#</th>
                    <th className="px-5 py-3 text-left">Name</th>
                    <th className="px-5 py-3 text-left">Email</th>
                    <th className="px-5 py-3 text-left">Mobile</th>
                    <th className="px-5 py-3 text-left">Budget</th>
                    <th className="px-5 py-3 text-left">Status</th>
                    <th className="px-5 py-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {leads.length > 0 ? (
                    leads.map((lead, index) => (
                      <tr
                        key={lead._id}
                        className="border-b hover:bg-purple-50 transition"
                      >
                        <td className="px-5 py-4 text-gray-700">{index + 1}</td>

                        <td className="px-5 py-4 font-medium text-gray-800">
                          {lead.name}
                        </td>

                        <td className="px-5 py-4 text-gray-600">
                          {lead.email}
                        </td>
                        <td className="px-5 py-4 text-gray-600">
                          {lead.mobile}
                        </td>

                        <td className="px-5 py-4 text-gray-600">
                          ₹{lead.budget}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold
                        ${
                          lead.status === "New"
                            ? "bg-blue-100 text-blue-700"
                            : lead.status === "Contacted"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }`}
                          >
                            {lead.status}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-center">
                          <Link
                            to={`/lead-details/${lead._id}`}
                            className="text-purple-700 hover:text-purple-900 font-medium"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 text-center text-gray-500"
                      >
                        No Leads Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
}

export default Leads;

