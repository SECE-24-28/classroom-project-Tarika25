import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const handleSignup = () => {
    if (!name || !email || !pass1 || !pass2) {
      alert("Please fill all fields");
      return;
    }
    if (pass1 !== pass2) {
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem("loggedIn", "true");
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center 
      bg-gradient-to-tr from-purple-500 to-indigo-500 p-4">

      <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
          Create Account
        </h2>

        {/* Name */}
        <div className="mt-6">
          <label className="text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Full name"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 
            focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mt-4">
          <label className="text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Email address"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 
            focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Create password"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 
            focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            value={pass1}
            onChange={(e) => setPass1(e.target.value)}
          />
        </div>

        {/* Confirm Password */}
        <div className="mt-4">
          <label className="text-gray-700">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 
            focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSignup}
          className="w-full mt-6 py-3 rounded-xl text-white font-semibold 
          bg-gradient-to-r from-purple-600 to-indigo-600 
          hover:brightness-110 transition"
        >
          Create Account
        </button>

        {/* Link */}
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
