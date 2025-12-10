import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logged in as: ${email}`);
  };

  return (
    <div className="flex justify-center items-center h-full mt-8">
      <form 
        onSubmit={handleLogin} 
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-gray-700">Login</h1>
        <div>
          <label className="block text-gray-600 mb-2">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition transform duration-300">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
