import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [allUsers, setAllUsers] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    totalTransactions: 0,
    activeUsers: 0,
    pendingRecharges: 0,
    todayRevenue: 0
  });

  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    type: "user"
  });

  const [showAddPlan, setShowAddPlan] = useState(false);
  const [newPlan, setNewPlan] = useState({
    operator: "Jio",
    title: "",
    price: "",
    data: "",
    validity: "",
    ott: ""
  });

  const loadAdminData = () => {
    // Load sample users
    const users = [
      { id: 1, name: "John Doe", email: "john@example.com", type: "user", 
        joined: "2024-01-15", status: "active", totalRecharges: 5, totalSpent: 2500 },
      { id: 2, name: "Jane Smith", email: "jane@example.com", type: "admin", 
        joined: "2024-01-10", status: "active", totalRecharges: 12, totalSpent: 6000 },
      { id: 3, name: "Bob Johnson", email: "bob@example.com", type: "user", 
        joined: "2024-01-20", status: "inactive", totalRecharges: 0, totalSpent: 0 },
      { id: 4, name: "Alice Williams", email: "alice@example.com", type: "user", 
        joined: "2024-01-18", status: "active", totalRecharges: 8, totalSpent: 4000 },
      { id: 5, name: "Charlie Brown", email: "charlie@example.com", type: "user", 
        joined: "2024-01-22", status: "active", totalRecharges: 3, totalSpent: 1500 },
    ];

    const history = JSON.parse(localStorage.getItem("history") || "[]");
    const totalRevenue = history.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
    
    // Calculate today's revenue
    const today = new Date().toDateString();
    const todayRevenue = history
      .filter(item => new Date(item.date).toDateString() === today)
      .reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

    setAllUsers(users);
    setAllTransactions(history.slice(0, 10));
    setStats({
      totalUsers: users.length,
      totalRevenue,
      totalTransactions: history.length,
      activeUsers: users.filter(u => u.status === "active").length,
      pendingRecharges: 3,
      todayRevenue
    });
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Please fill all fields");
      return;
    }

    const newUserObj = {
      id: Date.now(),
      ...newUser,
      joined: new Date().toISOString().split('T')[0],
      status: "active",
      totalRecharges: 0,
      totalSpent: 0
    };

    setAllUsers([...allUsers, newUserObj]);
    setNewUser({ name: "", email: "", password: "", type: "user" });
    setShowAddUser(false);
    
    alert("User added successfully!");
  };

  const handleAddPlan = () => {
    if (!newPlan.title || !newPlan.price) {
      alert("Please fill required fields");
      return;
    }

    // In real app, this would save to localStorage or API
    alert(`Plan "${newPlan.title}" added for ${newPlan.operator}!`);
    setNewPlan({
      operator: "Jio",
      title: "",
      price: "",
      data: "",
      validity: "",
      ott: ""
    });
    setShowAddPlan(false);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setAllUsers(allUsers.filter(user => user.id !== userId));
      alert("User deleted!");
    }
  };

  const handleExportData = () => {
    const data = {
      users: allUsers,
      transactions: allTransactions,
      stats: stats,
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `admin_data_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert("Data exported successfully!");
  };

  

  return (
    <>
      {/* Admin Welcome */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Administrator Control Panel
        </h2>
        <p className="text-gray-600">
          Manage users, transactions, plans, and system settings
        </p>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-2xl">
          <p className="text-sm opacity-90">Total Users</p>
          <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
          <p className="text-sm opacity-90 mt-2">{stats.activeUsers} active</p>
        </div>
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 rounded-2xl">
          <p className="text-sm opacity-90">Total Revenue</p>
          <p className="text-3xl font-bold mt-2">₹{stats.totalRevenue.toLocaleString()}</p>
          <p className="text-sm opacity-90 mt-2">All time</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl">
          <p className="text-sm opacity-90">Transactions</p>
          <p className="text-3xl font-bold mt-2">{stats.totalTransactions}</p>
          <p className="text-sm opacity-90 mt-2">Processed</p>
        </div>
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-2xl">
          <p className="text-sm opacity-90">Today's Revenue</p>
          <p className="text-3xl font-bold mt-2">₹{stats.todayRevenue.toLocaleString()}</p>
          <p className="text-sm opacity-90 mt-2">Today</p>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="mb-8 flex flex-wrap gap-4">
        <button
          onClick={() => setShowAddUser(true)}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 
                   text-white font-semibold rounded-xl hover:from-amber-600 
                   hover:to-orange-600 transition-all duration-300 flex items-center gap-2"
>
          Add New User
        </button>
        
        <button
          onClick={() => setShowAddPlan(true)}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 
                   text-white font-semibold rounded-xl hover:from-green-600 
                   hover:to-emerald-600 transition-all duration-300 flex items-center gap-2"
        >
          Add New Plan
        </button>
        
        <button
          onClick={handleExportData}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 
                   text-white font-semibold rounded-xl hover:from-blue-600 
                   hover:to-cyan-600 transition-all duration-300 flex items-center gap-2"
        >
          Export Data
        </button>
        
        
      </div>

      {/* Users Management */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Users Management</h3>
          <div className="text-gray-600">
            {allUsers.length} users
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 font-semibold text-gray-700">ID</th>
                <th className="text-left p-3 font-semibold text-gray-700">Name</th>
                <th className="text-left p-3 font-semibold text-gray-700">Email</th>
                <th className="text-left p-3 font-semibold text-gray-700">Type</th>
                <th className="text-left p-3 font-semibold text-gray-700">Joined</th>
                <th className="text-left p-3 font-semibold text-gray-700">Spent</th>
                <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                <th className="text-left p-3 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map(user => (
                <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="p-3 font-mono text-gray-600">{user.id}</td>
                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${user.type === "admin" 
                        ? 'bg-amber-100 text-amber-700' 
                        : 'bg-blue-100 text-blue-700'}`}
                    >
                      {user.type}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">{user.joined}</td>
                  <td className="p-3 font-bold text-gray-900">₹{user.totalSpent}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${user.status === "active" 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => alert(`Edit user ${user.id}`)}
                        className="text-blue-600 hover:text-blue-800 px-2"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
          <div className="text-gray-600">
            {allTransactions.length} transactions
          </div>
        </div>
        
        {allTransactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No transactions found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-3 font-semibold text-gray-700">ID</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Phone</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Operator</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Amount</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Date</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {allTransactions.map((transaction, index) => (
                  <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-mono text-gray-600">#{transaction.id}</td>
                    <td className="p-3">{transaction.phone}</td>
                    <td className="p-3">{transaction.operator}</td>
                    <td className="p-3 font-bold text-gray-900">₹{transaction.amount}</td>
                    <td className="p-3 text-gray-600">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        Success
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Add New User</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder="user@example.com"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder="Minimum 6 characters"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">User Type</label>
                <select
                  value={newUser.type}
                  onChange={(e) => setNewUser({...newUser, type: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                >
                  <option value="user">Regular User</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleAddUser}
                className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 
                         text-white font-semibold rounded-xl"
              >
                Add User
              </button>
              <button
                onClick={() => setShowAddUser(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Plan Modal */}
      {showAddPlan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Add New Recharge Plan</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Operator *</label>
                <select
                  value={newPlan.operator}
                  onChange={(e) => setNewPlan({...newPlan, operator: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                >
                  <option value="Jio">Reliance Jio</option>
                  <option value="Airtel">Airtel</option>
                  <option value="VI">VI</option>
                  <option value="BSNL">BSNL</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Plan Title *</label>
                <input
                  type="text"
                  value={newPlan.title}
                  onChange={(e) => setNewPlan({...newPlan, title: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder="e.g., Popular Plan"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Price (₹) *</label>
                <input
                  type="number"
                  value={newPlan.price}
                  onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder="199"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Data Allowance</label>
                <input
                  type="text"
                  value={newPlan.data}
                  onChange={(e) => setNewPlan({...newPlan, data: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder="e.g., 1GB/day"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Validity</label>
                <input
                  type="text"
                  value={newPlan.validity}
                  onChange={(e) => setNewPlan({...newPlan, validity: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder="e.g., 28 days"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">OTT Benefits</label>
                <input
                  type="text"
                  value={newPlan.ott}
                  onChange={(e) => setNewPlan({...newPlan, ott: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder="e.g., Disney+ Hotstar"
                />
              </div>
            </div>
            
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleAddPlan}
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 
                         text-white font-semibold rounded-xl"
              >
                Add Plan
              </button>
              <button
                onClick={() => setShowAddPlan(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}