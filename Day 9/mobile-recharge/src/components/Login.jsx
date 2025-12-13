import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Check for admin credentials
    const isAdmin = email === "admin@quickrecharge.com" && password === "admin123";
    
    // Store login info
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userType", isAdmin ? "admin" : "user");
    localStorage.setItem("userName", isAdmin ? "Admin" : "User");
    
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    }

    // Show success message
    alert(`Login successful! Welcome ${isAdmin ? "Admin" : "User"}`);
    
    // Navigate to home
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center 
      bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 relative overflow-hidden">

      {/* Background Pattern - Similar to Home page */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), 
                          radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Animated orbs - Adjusted colors to match home page */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-orange-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-amber-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-lg 
        shadow-2xl rounded-3xl p-10 w-full max-w-lg border border-white/10 relative z-10 
        transform transition-all duration-300 hover:shadow-3xl">
        
        {/* Logo - Matching Home page theme */}
        <div className="flex items-center justify-center mb-8">
          
          <h1 className="text-4xl font-extrabold">
            <span className="text-white">Power Up</span>
            <span className="block text-transparent bg-clip-text 
                           bg-gradient-to-r from-amber-400 to-orange-400">
              Redefined
            </span>
          </h1>
        </div>

        <h2 className="text-3xl font-bold text-white text-center mb-2">Welcome Back!</h2>
        <p className="text-gray-300 text-center mb-8">Sign in to your premium account</p>

        {/* Email */}
        <div className="mt-6">
          <label className="text-gray-300 font-semibold flex items-center">
            <i className="fas fa-envelope text-amber-400 mr-2"></i>
            Email Address
          </label>
          <div className="relative mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-4 rounded-3xl border border-white/10 
              focus:ring-3 focus:ring-amber-500/30 focus:border-amber-500 outline-none 
              transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mt-6">
          <label className="text-gray-300 font-semibold flex items-center">
            <i className="fas fa-lock text-amber-400 mr-2"></i>
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2 px-5 py-4 rounded-3xl border border-white/10 
              focus:ring-3 focus:ring-amber-500/30 focus:border-amber-500 outline-none 
              transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-400 pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400"
            >
              <i className="fas fa-eye"></i>
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between items-center mt-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500/50 bg-gray-800 border-white/20"
            />
            <span className="ml-2 text-gray-300">Remember me</span>
          </label>
          <a href="#" className="text-amber-400 font-medium hover:text-amber-300 transition-colors">
            Forgot Password?
          </a>
        </div>

        {/* Login Button - Matching Home page button style */}
        <button
          onClick={handleLogin}
          className="w-full mt-8 py-4 rounded-3xl text-white font-bold text-lg
          bg-gradient-to-r from-amber-500 to-orange-500 
          hover:from-amber-600 hover:to-orange-600 
          hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300
          flex items-center justify-center gap-3 group shadow-lg"
        >
          <i className="fas fa-sign-in-alt"></i>
          Sign In
          <i className="fas fa-arrow-right transition-transform group-hover:translate-x-2"></i>
        </button>
        {/* Sign Up Link */}
        <p className="text-center mt-8 text-gray-400">
          Don't have an account?{" "}
          <Link 
            to="/signup" 
            className="text-amber-400 font-semibold hover:text-amber-300 transition-colors hover:underline"
          >
            Sign up here
          </Link>
        </p>

        {/* Terms */}
        <p className="text-center mt-6 text-gray-500 text-sm">
          By continuing, you agree to our{" "}
          <a href="#" className="text-amber-400 hover:text-amber-300 transition-colors">Terms & Conditions</a>
        </p>
      </div>

      {/* Back to Home Link - Matching Home page style */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-gray-300 hover:text-white transition-colors
        flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10
        hover:bg-white/10 hover:border-white/20"
      >
        <i className="fas fa-arrow-left"></i>
        Back to Home
      </Link>

      {/* Corner accent similar to Home page features */}
      <div className="absolute top-0 right-0 w-32 h-32 
                     bg-gradient-to-br from-amber-500/10 to-orange-500/10 
                     rounded-bl-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 
                     bg-gradient-to-tr from-amber-500/10 to-orange-500/10 
                     rounded-tr-3xl"></div>
    </div>
  );
}