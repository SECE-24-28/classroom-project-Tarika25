import { useState } from "react";
import { useLocation } from "react-router-dom";
import Login from "../Login";

export default function Recharge() {
  const location = useLocation();

  const prefillAmount = location.state?.prefillAmount || "";
  const planTitle = location.state?.planTitle || "";
  const preOperator = location.state?.operator || "";

  const [phone, setPhone] = useState("");
  const [operator, setOperator] = useState(preOperator);
  const [amount, setAmount] = useState(prefillAmount);
  const [success, setSuccess] = useState(false);
  const [lastEntry, setLastEntry] = useState(null);

  const handleRecharge = () => {
    if (!/^\d{10}$/.test(phone)) return alert("Enter a valid 10-digit phone number");
    if (!operator) return alert("Select operator");
    if (!amount) return alert("Enter amount");

    const entry = {
      id: Date.now(),
      phone: "+91" + phone,
      operator,
      amount,
      plan: planTitle || "Custom Recharge",
      date: new Date().toISOString(),
    };

    const prev = JSON.parse(localStorage.getItem("history") || "[]");
    prev.unshift(entry);
    localStorage.setItem("history", JSON.stringify(prev));

    setLastEntry(entry);
    setSuccess(true);
  };

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-md w-full border border-gray-100">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl text-white">✓</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Recharge Successful!</h2>
            <p className="mt-2 text-gray-600">Your recharge has been processed successfully</p>
          </div>
          
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-6 border border-amber-200">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 mb-1">Phone Number</p>
              <p className="text-xl font-bold text-gray-900">{lastEntry.phone}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Operator</p>
                <p className="text-lg font-semibold text-gray-900">{lastEntry.operator}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Amount</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  ₹{lastEntry.amount}
                </p>
              </div>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 mb-1">Plan</p>
              <p className="text-lg font-semibold text-gray-900">{lastEntry.plan}</p>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-sm mb-6">
            <p>Transaction Time: {new Date(lastEntry.date).toLocaleString()}</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setSuccess(false)}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 
                       text-white font-semibold hover:from-amber-600 hover:to-orange-600 
                       transition-all duration-300"
            >
              New Recharge
            </button>
            <button
              onClick={() => window.location.href = "/history"}
              className="flex-1 py-3 rounded-xl bg-white text-gray-700 font-semibold 
                       border border-gray-300 hover:bg-gray-50 transition-all duration-300"
            >
              View History
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 max-w-lg w-full border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Recharge Mobile
          </h1>
          <p className="text-gray-600 mt-2">Quick & secure mobile recharge</p>
        </div>

        {/* Phone Number */}
        <div className="mb-6">
          <label className="text-gray-700 font-semibold flex items-center mb-2">
            
            Phone Number
          </label>
          <div className="flex mt-2">
            <span className="px-4 py-4 bg-gradient-to-r from-amber-50 to-orange-50 
                           rounded-l-xl border border-r-0 border-gray-300 text-gray-700 font-medium">
              +91
            </span>
            <input
              type="text"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              className="flex-1 p-4 border border-gray-300 rounded-r-xl focus:ring-3 
                       focus:ring-amber-500/30 focus:border-amber-500 outline-none 
                       transition-all duration-300"
              placeholder="Enter 10-digit number"
              maxLength={10}
            />
          </div>
          {phone.length === 10 && (
            <p className="text-green-500 text-sm mt-2">✓ Valid number</p>
          )}
        </div>

        {/* Operator */}
        <div className="mb-6">
          <label className="text-gray-700 font-semibold flex items-center mb-2">
            
            Select Operator
          </label>
          <select
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-3 
                     focus:ring-amber-500/30 focus:border-amber-500 outline-none 
                     transition-all duration-300 bg-gray-50/50"
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
          >
            <option value="" className="text-gray-500">Select your operator</option>
            <option value="Jio" className="text-gray-700">Reliance Jio</option>
            <option value="Airtel" className="text-gray-700">Airtel</option>
            <option value="VI" className="text-gray-700">VI (Vodafone Idea)</option>
            <option value="BSNL" className="text-gray-700">BSNL</option>
          </select>
        </div>

        {/* Amount */}
        <div className="mb-8">
          <label className="text-gray-700 font-semibold flex items-center mb-2">
            
            Recharge Amount
          </label>
          <div className="relative">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-3 
                       focus:ring-amber-500/30 focus:border-amber-500 outline-none 
                       transition-all duration-300 bg-gray-50/50 pl-12"
              placeholder="Enter amount or choose a plan"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 
                           text-gray-500 font-medium">
              ₹
            </span>
          </div>
          {planTitle && (
            <p className="text-sm text-gray-600 mt-2">
              Selected plan: <span className="font-semibold text-amber-600">{planTitle}</span>
            </p>
          )}
        </div> 

        {/* Recharge Button */}
        <button
          className="w-full py-4 rounded-xl text-white font-bold text-lg
                   bg-gradient-to-r from-amber-500 to-orange-500 
                   hover:from-amber-600 hover:to-orange-600 
                   hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300
                   flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleRecharge}
          disabled={!phone || !operator || !amount ||!Login}
        >
          Recharge Now
          <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
        </button>

        {/* Back to Plans */}
        <div className="text-center mt-8">
          <a 
            href="/plans" 
            className="text-amber-600 hover:text-orange-600 font-medium 
                     hover:underline transition-colors inline-flex items-center gap-2"
          >
            ← Browse more plans
          </a>
        </div>
      </div>
    </div>
  );
}