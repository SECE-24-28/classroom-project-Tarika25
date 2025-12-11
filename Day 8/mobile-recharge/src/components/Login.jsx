import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    localStorage.setItem("loggedIn", "true");
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center 
      bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-4">

      <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Welcome Back</h2>
        <p className="text-gray-500 text-center mt-1 mb-6">Login to continue</p>

        {/* Email */}
        <div className="mt-4">
          <label className="text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 
            focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 
            focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full mt-6 py-3 rounded-xl text-white font-semibold 
          bg-gradient-to-r from-indigo-600 to-blue-600 
          hover:brightness-110 transition"
        >
          Login
        </button>

        {/* Divider */}
        <div className="text-center mt-6 text-gray-500">or</div>

        {/* Link */}
        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
