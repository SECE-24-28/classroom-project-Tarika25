import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppContext } from "../context/AppContext";
import Button from "./ui/Button";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
});

export default function Login() {
  const navigate = useNavigate();
  const { login, showLoader, hideLoader } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    showLoader();
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const isAdmin = data.email === "admin@quickrecharge.com" && data.password === "admin123";
      
      const userData = {
        name: isAdmin ? "Admin" : "User",
        email: data.email,
        type: isAdmin ? "admin" : "user"
      };
      
      login(userData);
      navigate("/dashboard");
    } catch (error) {
      alert('Login failed. Please try again.');
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), 
                          radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 backdrop-blur-lg shadow-2xl rounded-3xl p-6 lg:p-10 w-full max-w-lg border border-white/10 relative z-10">
        
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold">
            <span className="text-white">Power Up</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              Redefined
            </span>
          </h1>
        </div>

        <h2 className="text-2xl lg:text-3xl font-bold text-white text-center mb-2">Welcome Back!</h2>
        <p className="text-gray-300 text-center mb-8">Sign in to your premium account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="text-gray-300 font-semibold flex items-center mb-2">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-4 rounded-3xl border border-white/10 focus:ring-3 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-400"
            />
            {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-gray-300 font-semibold flex items-center mb-2">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-5 py-4 rounded-3xl border border-white/10 focus:ring-3 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-400 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-2">{errors.password.message}</p>}
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500/50 bg-gray-800 border-white/20" />
              <span className="ml-2 text-gray-300">Remember me</span>
            </label>
            <a href="#" className="text-amber-400 font-medium hover:text-amber-300 transition-colors">
              Forgot Password?
            </a>
          </div>

          <Button type="submit" loading={isSubmitting} className="w-full py-4 text-lg">
            Sign In
          </Button>
        </form>

        <p className="text-center mt-8 text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-amber-400 font-semibold hover:text-amber-300 transition-colors hover:underline">
            Sign up here
          </Link>
        </p>
      </div>

      <Link
        to="/"
        className="absolute top-6 left-6 text-gray-300 hover:text-white transition-colors flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10"
      >
        ← Back to Home
      </Link>
    </div>
  );
}