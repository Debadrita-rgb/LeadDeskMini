import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout
import UserLayout from "./pages/users_pages/layouts/UsersLayout.jsx";

//users routes
import UserHomePage from "./pages/users_pages/Index/Index";
import SignUp from "./pages/users_pages/signUp/signUp";
import SignIn from "./pages/users_pages/signIn/signIn";
import Leads from "./pages/users_pages/leads/leads.jsx"
import AddLeads from "./components/usersComponents/Leads/addLeads.jsx"
import LeadDetails from "./components/usersComponents/Leads/leadDetails.jsx";
import Feature from "./pages/users_pages/Feature/Feature.jsx"
import Contact from "./pages/users_pages/Contact/Contact.jsx";

//admin routes
import AdminLayout from "./components/layout/admin/AdminLayout";
import AdminDashboard from "./pages/admin_pages/AdminDashboard/AdminDashboard.jsx";

//User
import AdminUser from "./pages/admin_pages/User/viewUser.jsx";
import AdminSingleUser from "./pages/admin_pages/User/viewUserDetails.jsx"

//Lead
import AdminLead from "./pages/admin_pages/Lead/viewLead.jsx"
import AdminSingleLeads from "./pages/admin_pages/Lead/viewSingleLeads.jsx";

//Contact
import AdminContact from "./pages/admin_pages/Contact/contact.jsx";
import AdminViewContact from "./pages/admin_pages/Contact/ViewContactDetails.jsx";


// Login Page of Admin,Manager,Head Cook,Supervisor
import LoginPage from "./pages/LoginPage/LoginPage";

const App = () => {
  const { loading, isAuthenticated, role } = useAuth();
  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-transparent">
      <BrowserRouter>
        <Routes>
          {/* User */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<UserHomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/user-leads" element={<Leads />} />
            <Route path="/add-lead" element={<AddLeads />} />
            <Route path="/lead-details/:id" element={<LeadDetails />} />
            <Route path="/features" element={<Feature />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Common Login Page */}
          <Route path="/backend/login" element={<LoginPage />} />

          {/* Admin Routes */}
          {isAuthenticated && role === "admin" && (
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              {/* User */}
              <Route path="view-all-user" element={<AdminUser />} />
              <Route path="view-all-lead" element={<AdminLead />} />
              <Route
                path="view-single-lead/:id"
                element={<AdminSingleLeads />}
              />
              <Route
                path="view-single-user/:id"
                element={<AdminSingleUser />}
              />
              <Route path="view-contact-details/:id" element={<AdminViewContact />} />

              <Route path="view-all-contact" element={<AdminContact />} />
            </Route>
          )}

          {/* Redirect unknown routes */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
