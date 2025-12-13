import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl mx-4 md:mx-8 mt-6 md:mt-8 p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              <span className="text-white">Dashboard</span>
              <span className="block text-transparent bg-clip-text 
                             bg-gradient-to-r from-amber-400 to-orange-400">
                Power Up Control Center
              </span>
            </h1>
            <p className="text-gray-300 mt-2">
              Manage your recharges, limits, and account settings
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-medium">
                  {localStorage.getItem("userName") || "User"}
                </p>
                <p className="text-gray-300 text-sm">
                  {localStorage.getItem("userEmail") || ""}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 
                            flex items-center justify-center text-white font-bold text-lg">
                {localStorage.getItem("userName")?.charAt(0).toUpperCase() || "U"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 px-4 md:px-8 pb-12">
        {children}
      </div>
    </div>
  );
}