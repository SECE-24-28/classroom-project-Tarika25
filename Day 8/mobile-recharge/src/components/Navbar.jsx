// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  // initialize from localStorage to avoid setState in useEffect (no ESLint warning)
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem("loggedIn") === "true");
  const navigate = useNavigate();

  // keep state in sync if another tab changes it
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "loggedIn") setLoggedIn(localStorage.getItem("loggedIn") === "true");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-white">
          <Link to="/">Mobile Recharge</Link>
        </div>

        <div className="hidden md:flex gap-8 items-center text-sm font-medium text-white/90">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/recharge" className="hover:text-white transition">Recharge</Link>
          <Link to="/plans" className="hover:text-white transition">Plans</Link>
          <Link to="/offers" className="hover:text-white transition">Offers</Link>
        </div>

        <div>
          {!loggedIn ? (
            <Link
              to="/login"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
