import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().matches(/^\+91\s\d{10}$/, "Invalid phone format").required("Phone is required")
});

export default function Profile() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const user = {
    name: localStorage.getItem("userName") || "",
    email: localStorage.getItem("userEmail") || "",
    type: localStorage.getItem("userType") || "user"
  };
  const [editMode, setEditMode] = useState(false);
  const [toast, setToast] = useState(null);

  const getStats = () => {
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    const totalSpent = history.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
    
    const operatorCounts = {};
    history.forEach(item => {
      operatorCounts[item.operator] = (operatorCounts[item.operator] || 0) + 1;
    });
    const favorite = Object.entries(operatorCounts).sort((a, b) => b[1] - a[1])[0];
    
    return {
      totalRecharges: history.length,
      totalSpent,
      favoriteOperator: favorite ? favorite[0] : "None"
    };
  };

  const stats = getStats();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: localStorage.getItem("userPhone") || "+91 9876543210"
    }
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = (data) => {
    localStorage.setItem("userName", data.name);
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("userPhone", data.phone);
    setEditMode(false);
    setToast({ type: 'success', message: 'Profile updated successfully!' });
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userType");
      navigate("/");
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      localStorage.clear();
      setToast({ type: 'success', message: 'Account deleted successfully!' });
      setTimeout(() => navigate("/"), 2000);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                <button
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                  onClick={() => {
                    if (editMode) {
                      reset();
                    }
                    setEditMode(!editMode);
                  }}
                >
                  {editMode ? "Cancel" : "Edit"}
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                  {editMode ? (
                    <div>
                      <input
                        {...register("name")}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                  ) : (
                    <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{user?.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                  {editMode ? (
                    <div>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                  ) : (
                    <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{user?.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                  {editMode ? (
                    <div>
                      <input
                        {...register("phone")}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>
                  ) : (
                    <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{localStorage.getItem("userPhone") || "+91 9876543210"}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Account Type</label>
                  <p className="text-gray-900 p-3 bg-gray-50 rounded-lg capitalize flex items-center gap-2">
                    {user?.type}
                    {user?.type === "admin" && (
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                        Administrator
                      </span>
                    )}
                  </p>
                </div>

                {editMode && (
                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Save Changes</button>
                    <button onClick={() => setEditMode(false)} className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">Cancel</button>
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Account Actions</h2>
            </div>
            <div className="p-6">
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
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 text-center">
            <div className="p-6">
              <div className="w-24 h-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
              <p className="text-gray-600 capitalize">{user?.type} Account</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Account Statistics</h3>
            </div>
            <div className="p-6">
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

      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl shadow-lg">
          {toast.message}
        </div>
      )}
    </div>
  );
}