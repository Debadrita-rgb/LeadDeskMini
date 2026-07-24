import React from "react";
import { Outlet } from "react-router-dom";
import Leads from "../../../components/usersComponents/Leads/Leads.jsx"; 

export default function leads() {
  return (
    <>
          <div className="">
            <Leads />
            </div>

    </>
  );
};

