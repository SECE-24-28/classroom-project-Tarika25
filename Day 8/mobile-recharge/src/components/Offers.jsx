import React from "react";

function Offers() {
  const offers = [
    {
      title: "₹50 Cashback",
      description: "Get ₹50 cashback on recharge above ₹399.",
      code: "CASH50",
    },
    {
      title: "Free 2GB Data",
      description: "Get extra 2GB data on ₹249 recharge.",
      code: "FREE2GB",
    },
    {
      title: "Weekend Offer",
      description: "Enjoy 10% OFF on all weekend recharges.",
      code: "WEEKEND10",
    },
  ];

  return (
    <div className="p-10 ml-60 pt-20">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6">Exclusive Offers</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((offer, idx) => (
          <div key={idx} className="p-6 bg-white rounded-2xl shadow-xl border hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold text-blue-600">{offer.title}</h2>
            <p className="text-gray-700 mt-2">{offer.description}</p>
            <p className="mt-4 font-bold text-indigo-600">Use Code: {offer.code}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offers;
