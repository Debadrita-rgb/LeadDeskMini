import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../../../../config";

const LeadDetails = () => {
      const { id } = useParams();
  const [lead, setLead] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${BASE_URL}/user/get-single-lead/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setLead(data));
  }, []);

  return (
    <div className="min-h-screen py-10 px-6 md:px-20">
      <h1 className="text-3xl font-bold mb-8">Lead Details</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label>Name</label>
          <input
            value={lead.name || ""}
            readOnly
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            value={lead.email || ""}
            readOnly
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label>Mobile</label>
          <input
            value={lead.mobile || ""}
            readOnly
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label>Budget</label>
          <input
            value={lead.budget || ""}
            readOnly
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label>Message</label>

          <textarea
            rows={4}
            value={lead.message || ""}
            readOnly
            className="w-full border rounded-lg p-2"
          />
        </div>
      </div>
    </div>
  );
};
export default LeadDetails;
