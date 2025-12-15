import { useState } from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  { 
    id: 1, 
    operator: "Jio", 
    price: 199, 
    title: "Jio Popular", 
    data: "1GB/day", 
    validity: "28 days",
    ott: "JioCinema Premium (1 year)"
  },
  { 
    id: 2, 
    operator: "Jio", 
    price: 239, 
    title: "Jio Value", 
    data: "1.5GB/day", 
    validity: "28 days",
    ott: "JioCinema Premium (1 year)"
  },
  { 
    id: 3, 
    operator: "Jio", 
    price: 299, 
    title: "Jio Best", 
    data: "2GB/day", 
    validity: "28 days",
    ott: "Disney+ Hotstar (3 months) + JioCinema"
  },

  { 
    id: 4, 
    operator: "Airtel", 
    price: 179, 
    title: "Airtel Lite", 
    data: "1GB/day", 
    validity: "24 days",
    ott: "Airtel Xstream (1 month)"
  },
  { 
    id: 5, 
    operator: "Airtel", 
    price: 265, 
    title: "Airtel Smart", 
    data: "1.5GB/day", 
    validity: "28 days",
    ott: "Disney+ Hotstar (3 months)"
  },
  { 
    id: 6, 
    operator: "Airtel", 
    price: 359, 
    title: "Airtel Combo", 
    data: "2GB/day", 
    validity: "28 days",
    ott: "Amazon Prime (3 months) + Disney+ Hotstar"
  },

  { 
    id: 7, 
    operator: "VI", 
    price: 199, 
    title: "VI Max", 
    data: "1GB/day", 
    validity: "28 days",
    ott: "VI Movies & TV (1 year)"
  },
  { 
    id: 8, 
    operator: "VI", 
    price: 299, 
    title: "VI Ultra", 
    data: "1.5GB/day", 
    validity: "28 days",
    ott: "Netflix Basic (1 month) + VI Movies"
  },

  { 
    id: 9, 
    operator: "BSNL", 
    price: 187, 
    title: "BSNL Basic", 
    data: "1GB/day", 
    validity: "28 days",
    ott: "No OTT benefits"
  },
  { 
    id: 10, 
    operator: "BSNL", 
    price: 247, 
    title: "BSNL Extra", 
    data: "2GB/day", 
    validity: "30 days",
    ott: "ShemarooMe (6 months)"
  },
];

export default function Plans() {
  const [selectedOperator, setSelectedOperator] = useState("All");
  const nav = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  // Get unique operators for filter buttons
  const operators = ["All", ...new Set(plans.map(plan => plan.operator))];

  // Filter plans based on selected operator
  const filteredPlans = selectedOperator === "All" 
    ? plans 
    : plans.filter(plan => plan.operator === selectedOperator);

  return (
    <div className="px-4 md:px-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Browse Recharge Plans
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Exclusive plans with OTT platform benefits
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {operators.map((operator) => (
            <button
              key={operator}
              onClick={() => setSelectedOperator(operator)}
              className={`
                px-4 py-2 md:px-5 md:py-2.5 rounded-full font-medium text-sm md:text-base
                transition-all duration-300
                ${selectedOperator === operator 
                  ? operator === "All" 
                    ? "bg-amber-500 text-white shadow-lg" 
                    : operator === "Jio"
                    ? "bg-red-500 text-white shadow-lg"
                    : operator === "Airtel"
                    ? "bg-red-500 text-white shadow-lg"
                    : operator === "VI"
                    ? "bg-purple-500 text-white shadow-lg"
                    : "bg-orange-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {operator} {operator !== "All" && `(${plans.filter(p => p.operator === operator).length})`}
            </button>
          ))}
        </div>
        
        {/* Active filter indicator */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Showing {filteredPlans.length} {filteredPlans.length === 1 ? "plan" : "plals"}
            {selectedOperator !== "All" && ` for ${selectedOperator}`}
          </p>
        </div>
      </div>

      {/* Plans Grid */}
      {filteredPlans.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No plans found for {selectedOperator}</p>
          <button
            onClick={() => setSelectedOperator("All")}
            className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
          >
            View All Plans
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((p) => (
            <div
              key={p.id}
              className={`
                group relative bg-white rounded-2xl p-6 shadow-lg 
                hover:shadow-2xl transition-all duration-300 
                border border-gray-100 hover:border-amber-200
              `}
            >
              {/* Operator Badge */}
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4
                ${p.operator === "Jio" ? 'bg-red-100 text-red-700' :
                  p.operator === "Airtel" ? 'bg-red-100 text-red-700' :
                  p.operator === "VI" ? 'bg-purple-100 text-purple-700' :
                  'bg-orange-100 text-orange-700'}`}
              >
                {p.operator}
              </div>

              {/* Plan Title */}
              <h4 className="text-xl font-bold text-gray-900 mb-2">{p.title}</h4>

              {/* Price */}
              <div className="mb-4">
                <div className="text-3xl font-bold text-gray-900">
                  ₹{p.price}
                </div>
              </div>

              {/* Plan Details */}
              <div className="space-y-3 mb-6">
                <div>
                  <p className="font-medium text-gray-900">Data</p>
                  <p className="text-gray-600">{p.data}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Validity</p>
                  <p className="text-gray-600">{p.validity}</p>
                </div>
                
                {/* OTT Benefits */}
                <div className="pt-3 border-t border-gray-100">
                  <p className="font-medium text-gray-900">OTT Benefits</p>
                  <p className="text-sm text-gray-600 mt-1">{p.ott}</p>
                </div>
              </div>

              {/* Recharge Button */}
              <button
                onClick={() => {
                  if (isLoggedIn) {
                    nav("/recharge", {
                      state: {
                        prefillAmount: p.price,
                        planTitle: p.title,
                        operator: p.operator,
                      },
                    });
                  } else {
                    nav("/login");
                  }
                }}
                className="
                  w-full py-3 rounded-3xl text-white font-semibold
                  bg-gradient-to-r from-amber-500 to-orange-500 
                  hover:from-amber-600 hover:to-orange-600 
                  hover:shadow-xl transition-all duration-300
                "
              >
                {isLoggedIn ? "Recharge Now" : "Login for Recharge"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Operator Categories */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Browse by Operator
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { name: "Jio", plans: 3, color: "bg-red-50 border-red-200" },
            { name: "Airtel", plans: 3, color: "bg-red-50 border-red-200" },
            { name: "VI", plans: 2, color: "bg-purple-50 border-purple-200" },
            { name: "BSNL", plans: 2, color: "bg-orange-50 border-orange-200" }
          ].map((operator) => (
            <div 
              key={operator.name}
              className={`${operator.color} border rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer`}
              onClick={() => {
                setSelectedOperator(operator.name);
                // Scroll to top of plans grid
                window.scrollTo({ top: 200, behavior: 'smooth' });
              }}
            >
              <h4 className="text-xl font-bold text-gray-900 mb-2">{operator.name}</h4>
              <p className="text-gray-600">{operator.plans} plans available</p>
              <button className="mt-4 text-amber-600 hover:text-orange-600 font-medium">
                View Plans →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}