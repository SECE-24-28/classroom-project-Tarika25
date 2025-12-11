// src/components/plan.jsx
import { useNavigate } from "react-router-dom";

const plans = [
  { id: 1, price: 199, title: "Popular", data: "1GB/day", validity: "28 days" },
  { id: 2, price: 249, title: "Value", data: "1.5GB/day", validity: "28 days" },
  { id: 3, price: 299, title: "Best", data: "2GB/day", validity: "28 days" },
  { id: 4, price: 509, title: "Long", data: "1.5GB/day", validity: "84 days" },
  { id: 5, price: 99, title: "Light", data: "500MB/day", validity: "14 days" },
];

export default function Plans() {
  const nav = useNavigate();
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Top Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-indigo-600 font-medium bg-gradient-to-r from-indigo-50 to-purple-50 inline-block px-3 py-1 rounded-full">{p.title}</div>
                <h3 className="text-xl font-bold text-gray-800 mt-3">₹{p.price}</h3>
                <p className="text-sm text-gray-500 mt-1">{p.data} • {p.validity}</p>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-500">per recharge</div>
              </div>
            </div>

            <button
              onClick={() => nav("/recharge", { state: { prefillAmount: p.price, planTitle: `${p.price} - ${p.title}` } })}
              className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium"
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
