import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Toast from "./ui/Toast";

export default function Offers() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();
  const [toast, setToast] = useState(null);

  const offers = [
    {
      title: "₹50 Cashback",
      description: "Get ₹50 cashback on recharge above ₹399.",
      code: "CASH50",
      amount: 399,
      discount: "₹50 OFF",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Free 2GB Data",
      description: "Get extra 2GB data on ₹249 recharge.",
      code: "FREE2GB",
      amount: 249,
      discount: "2GB FREE",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Weekend Special",
      description: "Enjoy 10% OFF on all weekend recharges.",
      code: "WEEKEND10",
      amount: 299,
      discount: "10% OFF",
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "First Recharge Bonus",
      description: "Get 20% extra value on your first recharge.",
      code: "FIRST20",
      amount: 199,
      discount: "20% EXTRA",
      color: "from-amber-500 to-orange-600"
    },
    {
      title: "Festive Offer",
      description: "Flat ₹100 OFF on recharge above ₹599.",
      code: "FEST100",
      amount: 599,
      discount: "₹100 OFF",
      color: "from-rose-500 to-red-600"
    },
    {
      title: "Data Boost",
      description: "Extra 5GB data on monthly plans.",
      code: "BOOST5GB",
      amount: 349,
      discount: "5GB FREE",
      color: "from-cyan-500 to-blue-600"
    }
  ];

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setToast({ type: 'success', message: `Promo code ${code} copied!` });
  };

  const applyOffer = (offer) => {
    if (isLoggedIn) {
      navigate("/recharge", {
        state: {
          prefillAmount: offer.amount,
          planTitle: offer.title,
          promoCode: offer.code
        }
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
          Exclusive Offers
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Limited time offers for our valued customers
        </p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {offers.map((offer, idx) => (
          <Card key={idx} hover className="relative overflow-hidden">
            {/* Discount Badge */}
            <div className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${offer.color} text-white text-sm font-bold rounded-full`}>
              {offer.discount}
            </div>

            <Card.Body className="p-6">
              {/* Offer Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {offer.title}
              </h2>
              
              {/* Offer Description */}
              <p className="text-gray-700 mb-6">
                {offer.description}
              </p>

              {/* Offer Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Minimum Recharge:</span>
                  <span className="text-xl font-bold text-gray-900">₹{offer.amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Promo Code:</span>
                  <button
                    onClick={() => copyCode(offer.code)}
                    className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-2 rounded-lg border border-amber-200 hover:from-amber-100 hover:to-orange-100 transition-all duration-300"
                  >
                    <span className="font-bold text-amber-600">{offer.code}</span>
                  </button>
                </div>
              </div>

              {/* Apply Button */}
              <Button
                onClick={() => applyOffer(offer)}
                className="w-full"
              >
                {isLoggedIn ? "Apply This Offer" : "Login for Recharge"}
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Terms & Conditions */}
      <Card className="max-w-4xl mx-auto">
        <Card.Header>
          <h3 className="text-xl font-bold text-gray-900">Terms & Conditions</h3>
        </Card.Header>
        <Card.Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">General Terms:</h4>
              <ul className="space-y-1">
                <li>• Offers valid for limited time only</li>
                <li>• Cannot be combined with other offers</li>
                <li>• Applicable on successful transactions only</li>
                <li>• Subject to availability</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Usage Guidelines:</h4>
              <ul className="space-y-1">
                <li>• One offer per user per day</li>
                <li>• Valid for all operators</li>
                <li>• Cashback credited within 24 hours</li>
                <li>• Company reserves right to modify terms</li>
              </ul>
            </div>
          </div>
        </Card.Body>
      </Card>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}