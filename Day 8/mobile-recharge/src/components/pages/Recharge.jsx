// src/components/pages/Recharge.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Recharge() {
  const location = useLocation();
  const prefillAmount = location.state?.prefillAmount || "";
  const planTitle = location.state?.planTitle || "";

  const [phone, setPhone] = useState("");
  const [operator, setOperator] = useState("");
  const [amount, setAmount] = useState(prefillAmount);
  const [success, setSuccess] = useState(false);
  const [lastEntry, setLastEntry] = useState(null);

  useEffect(() => {
  if (prefillAmount) setAmount(prefillAmount);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [prefillAmount]);

  const handleRecharge = () => {
    if (!/^\d{10}$/.test(phone)) { alert("Enter a valid 10-digit phone number"); return; }
    if (!operator) { alert("Select operator"); return; }
    if (!amount || Number(amount) <= 0) { alert("Enter valid amount"); return; }

    const entry = {
      id: Date.now(),
      phone: `+91${phone}`,
      operator,
      amount: Number(amount),
      plan: planTitle || "Custom",
      date: new Date().toISOString(),
    };

    const prev = JSON.parse(localStorage.getItem("history") || "[]");
    prev.unshift(entry);
    localStorage.setItem("history", JSON.stringify(prev));
    setLastEntry(entry);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl p-8 shadow-md text-center">
          <h2 className="text-3xl font-bold text-green-600">Recharge Successful!</h2>
          <p className="mt-3">Number: {lastEntry.phone}</p>
          <p>Operator: {lastEntry.operator}</p>
          <p>Amount: ₹{lastEntry.amount}</p>
          <p className="text-sm text-gray-500 mt-3">{new Date(lastEntry.date).toLocaleString()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl p-6 shadow-md max-w-xl">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">Recharge Mobile</h2>

        <label className="text-sm text-gray-600">Phone number</label>
        <div className="flex mt-2">
          <span className="px-3 py-2 bg-gray-100 rounded-l-md border border-r-0 border-gray-200">+91</span>
          <input
            className="flex-1 p-3 border border-gray-200 rounded-r-md"
            placeholder="Enter 10-digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
          />
        </div>

        <label className="text-sm text-gray-600 mt-4 block">Operator</label>
        <select className="w-full p-3 border border-gray-200 rounded-xl mt-2" value={operator} onChange={(e)=>setOperator(e.target.value)}>
          <option value="">Select operator</option>
          <option value="Jio">Jio</option>
          <option value="Airtel">Airtel</option>
          <option value="VI">VI</option>
          <option value="BSNL">BSNL</option>
        </select>

        <label className="text-sm text-gray-600 mt-4 block">Amount (₹)</label>
        <input value={amount} onChange={(e)=>setAmount(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl mt-2" placeholder="Enter amount or choose a plan" />

        <div className="flex gap-3 mt-5">
          <button onClick={handleRecharge} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold">
            Recharge Now
          </button>
        </div>
      </div>
    </div>
  );
}
