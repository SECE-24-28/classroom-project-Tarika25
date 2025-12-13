import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "user",
    joinDate: "",
    lastLogin: ""
  });
  
  const [editMode, setEditMode] = useState(false);
  const [stats, setStats] = useState({
    totalRecharges: 0,
    totalSpent: 0,
    favoriteOperator: "None"
  });

  useEffect(() => {
    // Load user data from localStorage
    const userData = {
      name: localStorage.getItem("userName") || "User",
      email: localStorage.getItem("userEmail") || "user@example.com",
      phone: localStorage.getItem("userPhone") || "+91 9876543210",
      userType: localStorage.getItem("userType") || "user",
      joinDate: localStorage.getItem("joinDate") || new Date().toLocaleDateString(),
      lastLogin: new Date().toLocaleDateString()
    };
    setUserInfo(userData);

    // Load user stats
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    const totalSpent = history.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
    
    const operatorCounts = {};
    history.forEach(item => {
      operatorCounts[item.operator] = (operatorCounts[item.operator] || 0) + 1;
    });
    const favorite = Object.entries(operatorCounts).sort((a, b) => b[1] - a[1])[0];
    
    setStats({
      totalRecharges: history.length,
      totalSpent,
      favoriteOperator: favorite ? favorite[0] : "None"
    });
  }, []);

  const handleSave = () => {
    localStorage.setItem("userName", userInfo.name);
    localStorage.setItem("userEmail", userInfo.email);
    localStorage.setItem("userPhone", userInfo.phone);
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userType");
      navigate("/login");
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      localStorage.clear();
      alert("Account deleted successfully!");
      navigate("/");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
              <button
                onClick={() => setEditMode(!editMode)}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                {editMode ? (
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{userInfo.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                {editMode ? (
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{userInfo.email}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                {editMode ? (
                  <input
                    type="tel"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                ) : (
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{userInfo.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Account Type</label>
                <p className="text-gray-900 p-3 bg-gray-50 rounded-lg capitalize">
                  {userInfo.userType}
                  {userInfo.userType === "admin" && (
                    <span className="ml-2 px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                      Administrator
                    </span>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Join Date</label>
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{userInfo.joinDate}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Last Login</label>
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{userInfo.lastLogin}</p>
                </div>
              </div>
            </div>

            {editMode && (
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Account Actions</h2>
            <div className="space-y-3">
              
              
              <button
                onClick={handleLogout}
                className="w-full p-3 text-left bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition"
              >
                 Logout
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full p-3 text-left bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          {/* Profile Avatar */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
              {userInfo.name.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{userInfo.name}</h3>
            <p className="text-gray-600 capitalize">{userInfo.userType} Account</p>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Account Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Recharges</span>
                <span className="font-bold text-gray-900">{stats.totalRecharges}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Spent</span>
                <span className="font-bold text-gray-900">₹{stats.totalSpent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Favorite Operator</span>
                <span className="font-bold text-gray-900">{stats.favoriteOperator}</span>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}