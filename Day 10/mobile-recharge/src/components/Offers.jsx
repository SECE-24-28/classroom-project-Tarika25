import { useNavigate } from "react-router-dom";

export default function Offers() {
  const nav = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  const offers = [
    {
      title: "₹50 Cashback",
      description: "Get ₹50 cashback on recharge above ₹399.",
      code: "CASH50",
      amount: 399,
     
    },
    {
      title: "Free 2GB Data",
      description: "Get extra 2GB data on ₹249 recharge.",
      code: "FREE2GB",
      amount: 249,
      
    },
    {
      title: "Weekend Special",
      description: "Enjoy 10% OFF on all weekend recharges.",
      code: "WEEKEND10",
      amount: 299,
    },
     
    {
      title: "First Recharge Bonus",
      description: "Get 20% extra value on your first recharge.",
      code: "FIRST20",
      amount: 199,
     
    },
    {
      title: "Festive Offer",
      description: "Flat ₹100 OFF on recharge above ₹599.",
      code: "FEST100",
      amount: 599,
      
    },
    {
      title: "Data Boost",
      description: "Extra 5GB data on monthly plans.",
      code: "BOOST5GB",
      amount: 349,
      
    },
  ];

  return (
    <div className="px-4 md:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Exclusive Offers
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Limited time offers for our valued customers
        </p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {offers.map((offer, idx) => (
          <div
            key={idx}
            className={`
              relative bg-white rounded-2xl p-6 shadow-lg 
              hover:shadow-2xl transition-all duration-300 
              border border-gray-100 hover:border-amber-200
            `}
          >
          
            

            {/* Offer Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {offer.title}
            </h2>
            
            {/* Offer Description */}
            <p className="text-gray-700 mb-4">
              {offer.description}
            </p>

            {/* Offer Details */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-900">Minimum Recharge:</p>
                <p className="text-xl font-bold text-gray-900">₹{offer.amount}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-900">Promo Code:</p>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 
                              px-4 py-2 rounded-lg border border-amber-200">
                  <p className="font-bold text-amber-600">{offer.code}</p>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => {
                if (isLoggedIn) {
                  nav("/recharge", {
                    state: {
                      prefillAmount: offer.amount,
                      planTitle: offer.title,
                    },
                  });
                } else {
                  nav("/login");
                }
              }}
              className="
                w-full py-3 rounded-3xl text-white font-semibold
                bg-gradient-to-r from-amber-500 to-orange-500 
                hover:from-amber-600 hover:to-orange-800
                hover:shadow-xl transition-all duration-300
              "
            >
              {isLoggedIn ? "Apply This Offer" : "Login for Recharge"}
            </button>
          </div>
        ))}
      </div>

      
      
          
    </div>
  );
}