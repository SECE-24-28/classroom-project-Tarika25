import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [userType, setUserType] = useState("user"); // "user" or "admin"
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSignup = () => {
    if (!name || !email || !pass1 || !pass2) {
      alert("Please fill all fields");
      return;
    }
    if (pass1 !== pass2) {
      alert("Passwords do not match");
      return;
    }
    if (!agreedToTerms) {
      alert("Please agree to the Terms & Conditions");
      return;
    }

    // Store user information
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userType", userType);
    
    // Show success message
    alert(`Account created successfully! Welcome ${name} as ${userType === "admin" ? "Admin" : "User"}`);
    
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center 
      bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 relative overflow-hidden">

      {/* Background Pattern - Matching Home page */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), 
                          radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Animated orbs - Matching theme */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-orange-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-amber-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-lg 
        shadow-2xl rounded-3xl p-10 w-full max-w-lg border border-white/10 relative z-10 
        transform transition-all duration-300 hover:shadow-3xl">
        
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-4xl font-extrabold">
            <span className="text-white">Power Up</span>
            <span className="block text-transparent bg-clip-text 
                           bg-gradient-to-r from-amber-400 to-orange-400">
              Redefined
            </span>
          </h1>
        </div>

        <h2 className="text-3xl font-bold text-white text-center mb-2">Create Your Account</h2>
        <p className="text-gray-300 text-center mb-8">Join our premium recharge service</p>

        {/* Name */}
        <div className="mt-6">
          <label className="text-gray-300 font-semibold flex items-center">
            <i className="fas fa-user text-amber-400 mr-2"></i>
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full mt-2 px-5 py-4 rounded-xl border border-white/10 
            focus:ring-3 focus:ring-amber-500/30 focus:border-amber-500 outline-none 
            transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mt-6">
          <label className="text-gray-300 font-semibold flex items-center">
            <i className="fas fa-envelope text-amber-400 mr-2"></i>
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-2 px-5 py-4 rounded-xl border border-white/10 
            focus:ring-3 focus:ring-amber-500/30 focus:border-amber-500 outline-none 
            transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* User Type Selection */}
        <div className="mt-6">
          <label className="text-gray-300 font-semibold flex items-center mb-2">
            <i className="fas fa-user-tag text-amber-400 mr-2"></i>
            Register as
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setUserType("user")}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 border-2 ${
                userType === "user"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105 border-transparent"
                  : "bg-gray-800/50 text-gray-300 hover:bg-white/5 border-white/10"
              }`}
            >
              <i className="fas fa-user mr-2"></i> Regular User
            </button>
            <button
              onClick={() => setUserType("admin")}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 border-2 ${
                userType === "admin"
                  ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg transform scale-105 border-transparent"
                  : "bg-gray-800/50 text-gray-300 hover:bg-white/5 border-white/10"
              }`}
            >
              <i className="fas fa-shield-alt mr-2"></i> Administrator
            </button>
          </div>
        </div>

        {/* Admin Registration Note */}
        {userType === "admin" && (
          <div className="mt-4 mb-2 p-4 bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-xl">
            <div className="flex items-start">
              <i className="fas fa-key text-amber-400 mt-1 mr-3"></i>
              <div>
                <p className="text-amber-300 font-medium">Admin Registration</p>
                <p className="text-amber-200/80 text-sm mt-1">
                  Administrator accounts require additional verification. You'll receive an email with verification steps after registration.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Password */}
        <div className="mt-6">
          <label className="text-gray-300 font-semibold flex items-center">
            <i className="fas fa-lock text-amber-400 mr-2"></i>
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Create a strong password"
              className="w-full mt-2 px-5 py-4 rounded-xl border border-white/10 
              focus:ring-3 focus:ring-amber-500/30 focus:border-amber-500 outline-none 
              transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-400 pr-12"
              value={pass1}
              onChange={(e) => setPass1(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400"
            >
              <i className="fas fa-eye"></i>
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mt-6">
          <label className="text-gray-300 font-semibold flex items-center">
            <i className="fas fa-lock text-amber-400 mr-2"></i>
            Confirm Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Re-enter your password"
              className="w-full mt-2 px-5 py-4 rounded-xl border border-white/10 
              focus:ring-3 focus:ring-amber-500/30 focus:border-[#667eea] outline-none 
              transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-400 pr-12"
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
            />
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mt-6">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500/50 bg-gray-800 border-white/20 mt-1"
            />
            <span className="ml-2 text-gray-300 text-sm">
              I agree to the{" "}
              <a href="#" className="text-amber-400 font-medium hover:text-amber-300 transition-colors">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-amber-400 font-medium hover:text-amber-300 transition-colors">
                Privacy Policy
              </a>
            </span>
          </label>
        </div>

        {/* Signup Button - Matching Home page style */}
        <button
          onClick={handleSignup}
          className="w-full mt-8 py-4 rounded-xl text-white font-bold text-lg
          bg-gradient-to-r from-amber-500 to-orange-500 
          hover:from-amber-600 hover:to-orange-600 
          hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300
          flex items-center justify-center gap-3 group shadow-lg disabled:opacity-50 
          disabled:cursor-not-allowed disabled:hover:transform-none"
          disabled={!agreedToTerms}
        >
          <i className="fas fa-user-plus"></i>
          Create Account as {userType === "admin" ? "Admin" : "User"}
          <i className="fas fa-arrow-right transition-transform group-hover:translate-x-2"></i>
        </button>

        {/* Login Link */}
        <p className="text-center mt-8 text-gray-400">
          Already have an account?{" "}
          <Link 
            to="/login" 
            className="text-amber-400 font-semibold hover:text-amber-300 transition-colors hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>

      {/* Back to Home Link - Matching theme */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-gray-300 hover:text-white transition-colors
        flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10
        hover:bg-white/10 hover:border-white/20"
      >
        <i className="fas fa-arrow-left"></i>
        Back to Home
      </Link>

      {/* Corner accents similar to Home page */}
      <div className="absolute top-0 right-0 w-32 h-32 
                     bg-gradient-to-br from-amber-500/10 to-orange-500/10 
                     rounded-bl-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 
                     bg-gradient-to-tr from-amber-500/10 to-orange-500/10 
                     rounded-tr-3xl"></div>
    </div>
  );
}