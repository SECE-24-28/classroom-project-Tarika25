function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-xl h-screen p-6 rounded-tr-3xl rounded-br-3xl border-r border-gray-200">
      <h2 className="text-xl font-bold mb-6 text-gray-700">Menu</h2>
      <ul className="space-y-4">
        <li className="p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition duration-300">Dashboard</li>
        <li className="p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition duration-300">Recharge</li>
        <li className="p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition duration-300">History</li>
        <li className="p-3 rounded-lg hover:bg-blue-100 cursor-pointer transition duration-300">Profile</li>
      </ul>
    </aside>
  );
}

export default Sidebar;
