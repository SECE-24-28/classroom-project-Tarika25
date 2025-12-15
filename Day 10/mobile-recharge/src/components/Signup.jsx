import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppContext } from "../context/AppContext";
import Button from "./ui/Button";
import Toast from "./ui/Toast";

const schema = yup.object({
  name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required("Please confirm password"),
  userType: yup.string().oneOf(['user', 'admin']).required(),
  agreedToTerms: yup.boolean().oneOf([true], "You must agree to the terms")
});

export default function Signup() {
  const navigate = useNavigate();
  const { login, showLoader, hideLoader } = useAppContext();
  const [toast, setToast] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userType: 'user',
      agreedToTerms: false
    }
  });

  const userType = watch('userType');

  const onSubmit = async (data) => {
    showLoader();
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        name: data.name,
        email: data.email,
        type: data.userType
      };
      
      login(userData);
      
      setToast({
        type: 'success',
        message: `Account created successfully! Welcome ${data.name}!`
      });
      
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setToast({
        type: 'error',
        message: 'Registration failed. Please try again.'
      });
    } finally {
      hideLoader();
    }
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="text-gray-300 font-semibold flex items-center mb-2">
              <i className="fas fa-user text-amber-400 mr-2"></i>
              Full Name
            </label>
            <input
              {...register("name")}
              type="text"
              placeholder="Enter your full name"
              className="w-full px-5 py-4 rounded-xl border border-white/10 
              focus:ring-3 focus:ring-amber-500/30 focus:border-amber-500 outline-none 
              transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-400"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-2">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-300 font-semibold flex items-center mb-2">
              <i className="fas fa-envelope text-amber-400 mr-2"></i>
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full px-5 py-4 rounded-xl border border-white/10 
              focus:ring-3 focus:ring-amber-500/30 focus:border-amber-500 outline-none 
              transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-400"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>
            )}
          </div>

          {/* User Type Selection */}
          <div>
            <label className="text-gray-300 font-semibold flex items-center mb-2">
              <i className="fas fa-user-tag text-amber-400 mr-2"></i>
              Register as
            </label>
            <div className="flex gap-3">
              <label className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 border-2 cursor-pointer ${
                userType === "user"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105 border-transparent"
                  : "bg-gray-800/50 text-gray-300 hover:bg-white/5 border-white/10"
              }`}>
                <input {...register("userType")} type="radio" value="user" className="sr-only" />
                <i className="fas fa-user mr-2"></i> Regular User
              </label>
              <label className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 border-2 cursor-pointer ${
                userType === "admin"
                  ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg transform scale-105 border-transparent"
                  : "bg-gray-800/50 text-gray-300 hover:bg-white/5 border-white/10"
              }`}>
                <input {...register("userType")} type="radio" value="admin" className="sr-only" />
                <i className="fas fa-shield-alt mr-2"></i> Administrator
              </label>
            </div>
          </div>

          {/* Admin Registration Note */}
          {userType === "admin" && (
            <div className="p-4 bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-xl">
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
          <div>
            <label className="text-gray-300 font-semibold flex items-center mb-2">
              <i className="fas fa-lock text-amber-400 mr-2"></i>
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                className="w-full px-5 py-4 rounded-xl border border-white/10 
                focus:ring-3 focus:ring-amber-500/30 focus:border-amber-500 outline-none 
                transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-400 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400"
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-2">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-300 font-semibold flex items-center mb-2">
              <i className="fas fa-lock text-amber-400 mr-2"></i>
              Confirm Password
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                className="w-full px-5 py-4 rounded-xl border border-white/10 
                focus:ring-3 focus:ring-amber-500/30 focus:border-amber-500 outline-none 
                transition-all duration-300 bg-gray-800/50 text-white placeholder-gray-400 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400"
              >
                <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-2">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div>
            <label className="flex items-start cursor-pointer">
              <input
                {...register("agreedToTerms")}
                type="checkbox"
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
            {errors.agreedToTerms && (
              <p className="text-red-400 text-sm mt-2">{errors.agreedToTerms.message}</p>
            )}
          </div>

          {/* Signup Button */}
          <Button
            type="submit"
            loading={isSubmitting}
            className="w-full py-4 text-lg"
          >
            <i className="fas fa-user-plus"></i>
            Create Account as {userType === "admin" ? "Admin" : "User"}
            <i className="fas fa-arrow-right"></i>
          </Button>
        </form>

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