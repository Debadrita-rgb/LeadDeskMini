import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DynamicForm from "../../../components/commonComponent/CrudComponent/DynamicFormComponent";
import BASE_URL from "../../../../config";

const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "text" },
  
];

const viewUserDetails = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!id) return;

    fetch(`${BASE_URL}/admin/get-single-user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const formatDate = (date) => {
          if (!date) return "";
          return new Date(date).toISOString().split("T")[0];
        };

        setInitialData({
          name: data.name || "",
          email: data.email || "",
          
        });
      })
      .catch((err) => {
        console.error("Error fetching feedback:", err);
        toast.error("Failed to load feedback details.");
      });
  }, []);

  return (
    <div className="p-6">
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

export default viewUserDetails;
