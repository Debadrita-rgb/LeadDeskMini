import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../../config";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddLeads = () => {
  const [lead, setLead] = useState({
    name: "",
    email: "",
    mobile: "",
    budget: "",
    message: "",
    status: "New",
  });
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    const userId = decode.id;

    const leadData = {
      ...lead,
      userId,
    };

    try {
      const res = await fetch(`${BASE_URL}/user/add-lead-by-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(leadData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create lead");
      }
      toast.success("Lead created successfully!");

      navigate("/user-leads");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen py-10 px-6 md:px-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Add Lead</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={lead.name}
            onChange={(e) => setLead({ ...lead, name: e.target.value })}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={lead.email}
            onChange={(e) => setLead({ ...lead, email: e.target.value })}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label>Mobile</label>
          <input
            type="text"
            placeholder="Mobile"
            value={lead.mobile}
            onChange={(e) => setLead({ ...lead, mobile: e.target.value })}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label>Budget</label>
          <input
            type="text"
            placeholder="Budget"
            value={lead.budget}
            onChange={(e) => setLead({ ...lead, budget: e.target.value })}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label>Message</label>

          <textarea
            rows={4}
            value={lead.message}
            onChange={(e) => setLead({ ...lead, message: e.target.value })}
            className="w-full border rounded-lg p-2"
          />
        </div>
      </div>

      {/* <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label>Status</label>

              <input
                type="number"
                placeholder="Budget"
                value={lead.budget}
                onChange={(e) => setLead({ ...lead, budget: e.target.value })}
                className="w-full border rounded-lg p-2"
              />
            </div>
          </div> */}

      <button
        onClick={handleSave}
        className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Save Changes
      </button>
    </div>
  );
};
export default AddLeads;
