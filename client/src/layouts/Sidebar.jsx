import { LogOut, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { logoutUser } from "../api/authApi";
import { logout } from "../app/authSlice";

import logo from "../assets/images/logo.png";
import { sidebarItems } from "../constants/sidebar";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();   

  const handleLogout = async () => {
    try {
      const response = await logoutUser();

      dispatch(logout());

      toast.success(response.message);

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 z-50
        flex h-screen w-72 flex-col
        border-r border-slate-800
        bg-slate-900
        text-white
        transition-transform duration-300 ease-in-out

        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }

        lg:translate-x-0
      `}
    >
      {/* ================= Logo ================= */}
      <div className="border-b border-slate-800 px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="NextOffer"
              className="h-18 w-18 object-contain"
            />

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Next
                <span className="text-blue-500">Offer</span>
              </h1>

              <p className="text-sm text-slate-400">
                AI Placement Mentor
              </p>
            </div>
          </div>

          {/* Close Button (Mobile Only) */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 transition hover:bg-slate-800 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* ================= Navigation ================= */}
      <nav className="flex-1 space-y-2 p-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* ================= Logout ================= */}
      <div className="border-t border-slate-800 p-4">
        <button
          onClick={handleLogout}
          className="
            flex w-full items-center gap-3
            rounded-xl px-4 py-3
            text-sm font-medium
            text-slate-300
            transition-all duration-200

            hover:bg-red-600
            hover:text-white
          "
        >
          <LogOut size={20} />

          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;