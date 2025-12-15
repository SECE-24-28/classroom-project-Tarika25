import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

export default function Navbar() {
  const { isLoggedIn, user, logout, theme, toggleTheme } = useAppContext();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg border-b border-gray-100' : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'
    }`}>
      
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className={`text-2xl lg:text-3xl font-bold tracking-tight ${
          scrolled ? 'bg-clip-text bg-gradient-to-r from-indigo-900 to-black' : 'bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-white'
        }`}>
          <Link to="/">Power Up</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className={`font-medium transition ${
            scrolled ? 'text-gray-700 hover:text-amber-600' : 'text-gray-200 hover:text-white'
          }`}>
            Home
          </Link>
          <Link to="/recharge" className={`font-medium transition ${
            scrolled ? 'text-gray-700 hover:text-amber-600' : 'text-gray-200 hover:text-white'
          }`}>
            Recharge
          </Link>
          <Link to="/plans" className={`font-medium transition ${
            scrolled ? 'text-gray-700 hover:text-amber-600' : 'text-gray-200 hover:text-white'
          }`}>
            Plans
          </Link>
          <Link to="/offers" className={`font-medium transition ${
            scrolled ? 'text-gray-700 hover:text-amber-600' : 'text-gray-200 hover:text-white'
          }`}>
            Offers
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className={`px-5 py-2 rounded-3xl border font-medium transition-all ${
                    scrolled ? 'border-gray-300 text-gray-700 hover:bg-gray-50' : 'border-white/30 text-white hover:bg-white/10'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-3xl hover:shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 font-medium ${
                    scrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-300'
                  }`}
                >
                  <span className="text-lg">👤</span>
                  <span className="hidden xl:block">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 rounded-3xl font-medium transition-all ${
                    scrolled ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden absolute top-full left-0 w-full ${
          scrolled ? 'bg-white border-b border-gray-200' : 'bg-gray-900'
        } shadow-lg`}>
          <div className="px-4 py-6 space-y-4">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`block py-2 font-medium transition ${
              scrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-300'
            }`}>
              Home
            </Link>
            <Link to="/recharge" onClick={() => setMobileMenuOpen(false)} className={`block py-2 font-medium transition ${
              scrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-300'
            }`}>
              Recharge
            </Link>
            <Link to="/plans" onClick={() => setMobileMenuOpen(false)} className={`block py-2 font-medium transition ${
              scrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-300'
            }`}>
              Plans
            </Link>
            <Link to="/offers" onClick={() => setMobileMenuOpen(false)} className={`block py-2 font-medium transition ${
              scrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-300'
            }`}>
              Offers
            </Link>
            
            {!isLoggedIn ? (
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-3 text-center border border-amber-500 text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-3 text-center bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 font-medium transition ${
                    scrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-300'
                  }`}
                >
                  👤 Profile ({user?.name})
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full py-3 text-center bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}