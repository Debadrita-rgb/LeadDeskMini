import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DynamicForm from "../../../components/commonComponent/CrudComponent/DynamicFormComponent";
import BASE_URL from "../../../../config";

const fields = [
  // { name: "userName", label: "Created By", type: "text" },
  // { name: "userEmail", label: "User Email", type: "text" },

  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "mobile", label: "mobile", type: "text" },
  { name: "budget", label: "budget", type: "text" },
  { name: "status", label: "status", type: "text" },
  { name: "createdAt", label: "Created At", type: "date" },
  { name: "message", label: "Message", type: "textarea", rows: 4 },
];

const viewSingleLeads = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!id) return;

    fetch(`${BASE_URL}/admin/get-single-lead-by-userdetails/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const formatDate = (date) => {
          if (!date) return "";

          const d = new Date(date);

          if (isNaN(d.getTime())) return "";

          return d.toISOString().split("T")[0];
        };

        setInitialData({
          name: data.name || "",
          email: data.email || "",
          budget: data.budget,
          message: data.message,
          status: data.status || "",
          mobile: data.mobile || "",
          createdAt: formatDate(data.createdAt),

          userName: data.userId?.name || "",
          userEmail: data.userId?.email || "",
        });
      })
      .catch((err) => {
        console.error("Error fetching feedback:", err);
        toast.error("Failed to load feedback details.");
      });
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6 bg-white p-6 border rounded-xl shadow w-full">
        <h2 className="text-sm font-semibold mb-4 text-gray-700">
          Created By{" "}
        </h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Created By"
            value={initialData?.userName || ""}
            className="border p-2 w-full rounded-lg focus:outline-none focus:ring text-black"
          />
          <input
            type="text"
            placeholder="Created Email"
            value={initialData?.userEmail || ""}
            className="border p-2 w-full rounded-lg focus:outline-none focus:ring text-black"
          />
        </div>
      </div>

      {initialData ? (
        <DynamicForm
          fields={fields.map((f) => ({
            ...f,
            value: initialData[f.name],
            readOnly: true,
          }))}
          submitText=""
          onSubmit={() => {}}
          showSubmit={false}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default viewSingleLeads;
