import { useState } from "react";
import { Menu } from "lucide-react"; // Icons for navigation
import { Sidebar } from "../Sidebar";
import { Outlet } from "react-router-dom"; // Import Link and Outlet from react-router-dom

export const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        title="Dent Dashboard"
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col bg-gray-50 transition-all duration-300 md:ml-64`}
      >
        {/* Navbar on mobile */}
        <div className="md:hidden p-4 flex justify-between items-center bg-white shadow-md">
          <button onClick={toggleSidebar}>
            <Menu className="w-6 h-6 text-gray-800" />
          </button>
          <div className="text-xl font-bold text-blue-600">Dent Dashboard</div>
        </div>

        {/* Dashboard content */}
        <main className="p-4 md:p-6 flex-1">
          <Outlet />{" "}
        </main>
      </div>
    </div>
  );
};
