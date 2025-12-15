import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [userName] = useState(() => localStorage.getItem("userName") || "User");
  const userType = localStorage.getItem("userType") || "user";
  
  // Debug: Check what userType is being retrieved
  console.log("UserType from localStorage:", userType);

  // If admin, show AdminDashboard
  if (userType === "admin") {
    return <AdminDashboard />;
  }
  const [stats, setStats] = useState({
    totalRecharges: 0,
    totalSpent: 0,
    recentTransactions: [],
    favoriteOperator: "None",
  });
  


  useEffect(() => {
    // Load user stats from history
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    const totalSpent = history.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
    
    // Find favorite operator
    const operatorCounts = {};
    history.forEach(item => {
      operatorCounts[item.operator] = (operatorCounts[item.operator] || 0) + 1;
    });
    const favorite = Object.entries(operatorCounts).sort((a, b) => b[1] - a[1])[0];
    
    // Calculate new stats
    const newStats = {
      totalRecharges: history.length,
      totalSpent,
      recentTransactions: history.slice(0, 3),
      favoriteOperator: favorite ? favorite[0] : "None",
    };
    
    setStats(newStats);
  }, []);

  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  const handleQuickRecharge = () => {
    if (isLoggedIn) {
      navigate("/recharge");
    } else {
      navigate("/login");
    }
  };



  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {userName}! 
        </h2>
        <p className="text-gray-600">
          Here's your recharge activity and account overview
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button
          onClick={handleQuickRecharge}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-2xl 
                   hover:from-amber-600 hover:to-orange-600 hover:shadow-xl 
                   transition-all duration-300 text-left group"
        >
          <h3 className="text-xl font-bold">{isLoggedIn ? "Quick Recharge" : "Login for Recharge"}</h3>
          <p className="text-amber-100 text-sm mt-1">{isLoggedIn ? "Recharge instantly" : "Login to recharge"}</p>
        </button>

        <Link
          to="/plans"
          className="bg-white border border-gray-200 p-6 rounded-2xl 
                   hover:border-amber-300 hover:shadow-lg 
                   transition-all duration-300 text-left group"
        >
          <h3 className="text-xl font-bold text-gray-900">Browse Plans</h3>
          <p className="text-gray-600 text-sm mt-1">View all plans</p>
        </Link>

        <Link
          to="/offers"
          className="bg-white border border-gray-200 p-6 rounded-2xl 
                   hover:border-amber-300 hover:shadow-lg 
                   transition-all duration-300 text-left group"
        >
          <h3 className="text-xl font-bold text-gray-900">Special Offers</h3>
          <p className="text-gray-600 text-sm mt-1">Exclusive deals</p>
        </Link>

        <Link
          to="/history"
          className="bg-white border border-gray-200 p-6 rounded-2xl 
                   hover:border-amber-300 hover:shadow-lg 
                   transition-all duration-300 text-left group"
        >
          <h3 className="text-xl font-bold text-gray-900">View History</h3>
          <p className="text-gray-600 text-sm mt-1">Transaction history</p>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Recharges</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalRecharges}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Spent</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">₹{stats.totalSpent}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Favorite Operator</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.favoriteOperator}</p>
              </div>
              
            </div>
          </div>

          <div className="bg-white border border-gray-200 p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Account Type</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">User</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Recent Transactions</h2>
          <Link
            to="/history"
            className="text-amber-600 hover:text-orange-600 font-medium"
          >
            View All →
          </Link>
        </div>

        {stats.recentTransactions.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Transactions Yet</h3>
            <p className="text-gray-600 mb-4">Start your first recharge to see history</p>
            <button
              onClick={handleQuickRecharge}
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 
                       text-white font-semibold rounded-lg hover:from-amber-600 
                       hover:to-orange-600 transition-all duration-300"
            >
              Make First Recharge
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-700">Phone</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Operator</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentTransactions.map((transaction, index) => (
                    <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-4 font-medium">{transaction.phone}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold
                          ${transaction.operator === "Jio" ? 'bg-red-100 text-red-700' :
                            transaction.operator === "Airtel" ? 'bg-red-100 text-red-700' :
                            transaction.operator === "VI" ? 'bg-purple-100 text-purple-700' :
                            'bg-orange-100 text-orange-700'}`}
                        >
                          {transaction.operator}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-gray-900">₹{transaction.amount}</td>
                      <td className="p-4 text-gray-600">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => {
                            navigate("/recharge", {
                              state: {
                                prefillAmount: transaction.amount,
                                operator: transaction.operator,
                                phone: transaction.phone.replace('+91', '')
                              }
                            });
                          }}
                          className="text-amber-600 hover:text-orange-600 font-medium"
                        >
                          Repeat
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}