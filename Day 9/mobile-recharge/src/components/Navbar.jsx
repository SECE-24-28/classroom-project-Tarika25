// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
   const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem("loggedIn") === "true");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "loggedIn") setLoggedIn(localStorage.getItem("loggedIn") === "true");
    };
    window.addEventListener("storage", onStorage);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    navigate("/");
  };
  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
                    ${scrolled 
                      ? 'bg-white shadow-lg border-b border-gray-100' 
                      : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'}`}>
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className={`text-3xl font-bold tracking-tight
                  ${scrolled ? 'text-2xl font-extrabold bg-clip-text bg-gradient-to-r from-indigo-900 to-black' : 'text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-white'}`}>
          <Link to="/">Power Up</Link>
        </div>
           <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`flex items-center gap-2 font-medium transition
                                   ${scrolled 
                                     ? 'text-gray-700 hover:text-amber-600' 
                                     : 'text-gray-200 hover:text-white'}`}>
             
              Home
            </Link>
        
          
          <Link to="/recharge" className={`flex items-center gap-2 font-medium transition
                                          ${scrolled 
                                            ? 'text-gray-700 hover:text-amber-600' 
                                            : 'text-gray-200 hover:text-white'}`}>
              
              Recharge
            </Link>
            
            <Link to="/plans" className={`flex items-center gap-2 font-medium transition
                                       ${scrolled 
                                         ? 'text-gray-700 hover:text-amber-600' 
                                         : 'text-gray-200 hover:text-white'}`}>
             
              Plans
            </Link>
            
            <Link to="/offers" className={`flex items-center gap-2 font-medium transition
                                        ${scrolled 
                                          ? 'text-gray-700 hover:text-amber-600' 
                                          : 'text-gray-200 hover:text-white'}`}>
              
              Offers
            </Link>
            <Link 
              to="/recharge"
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 
                       text-white font-semibold rounded-3xl hover:shadow-lg 
                       hover:from-amber-600 hover:to-orange-600 
                       transition-all duration-300"
            >
              Quick Recharge
            </Link>
          
        </div>

        <div className="flex items-center gap-4">
            {!loggedIn ? (
              <>
                <Link
                  to="/login"
                  className={`hidden sm:block px-5 py-2 rounded-3xl border font-medium
                            ${scrolled 
                              ? 'border-gray-300 text-gray-700 hover:bg-gray-50' 
                              : 'border-white/30 text-white hover:bg-white/10'}`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 
                           text-white font-semibold rounded-3xl hover:shadow-lg 
                           hover:from-amber-600 hover:to-orange-600 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 ${scrolled ? 'text-gray-700' : 'text-white'}`}
                >
                  <span className="text-lg">👤</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-3xl bg-gray-100 text-gray-700 
                           font-medium hover:bg-gray-200 transition"
                >
                  Logout
                </button>
              </div>
          )}
        </div>
      </div>
    </nav>
  );
}
