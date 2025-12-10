function Navbar() {
  return (
    <nav className="bg-white shadow-lg px-10 py-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text drop-shadow-lg">
        Mobile Recharge
      </h1>

      <div className="hidden md:flex gap-8 text-gray-700 font-medium text-lg">
        <span className="hover:text-blue-600 cursor-pointer">Home</span>
        <span className="hover:text-blue-600 cursor-pointer">Recharge</span>
        <span className="hover:text-blue-600 cursor-pointer">Plans</span>
      </div>

      <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-xl shadow-lg font-semibold hover:scale-105 transition">
        Login
      </button>
    </nav>
  );
}
export default Navbar;
