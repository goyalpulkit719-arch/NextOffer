import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

import Header from "./Header";
import Sidebar from "./Sidebar";
import AppFooter from "../components/AppFooter";

function DashboardLayout() {
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <ClipLoader size={40} />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex min-h-screen flex-col lg:ml-72">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>

        <AppFooter />
      </div>
    </div>
  );
}

export default DashboardLayout;