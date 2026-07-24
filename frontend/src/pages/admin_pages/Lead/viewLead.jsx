import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableComponent from "../../../components/commonComponent/CrudComponent/TableComponent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../../../../config";

const ViewLead = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [staff, setStaff] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/admin/get-lead`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setStaff(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

 const filteredLeads = (staff || [])
   .filter((lead) => {
     const search = searchTerm.toLowerCase();

     const matchesSearch =
       lead.name?.toLowerCase().includes(search) ||
       lead.email?.toLowerCase().includes(search);

     const matchesStatus =
       statusFilter === "All" || lead.status === statusFilter;

     return matchesSearch && matchesStatus;
   })
   .map((lead, index) => ({
     Id: index + 1,
     Name: lead.name,
     Email: lead.email,
     Budget: lead.budget,
     Status: lead.status,
     Message:
       lead.message?.split(" ").length > 5
         ? lead.message.split(" ").slice(0, 5).join(" ") + "..."
         : lead.message,
     id: lead._id,
     viewPath: `/admin/view-single-lead/${lead._id}`,
   }));

  const handleLeadStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${BASE_URL}/admin/update-lead-status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      setStaff((prev) =>
        prev.map((lead) =>
          lead._id === data.updated._id ? data.updated : lead,
        ),
      );

      toast.success("Lead status updated");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };
  
  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="flex justify-end mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 "
        >
          <option value="All">All</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <TableComponent
        title="Lead"
        columns={["Id", "Name", "Email", "Budget", "Status", "Message"]}
        data={filteredLeads}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleToggleActive={false}
        showActiveColumn={false}
        handleDelete={false}
        showAddButton={false}
        handleLeadStatus={handleLeadStatus}
      />
    </div>
  );
};

export default ViewLead;
