export default function History() {
  const history = JSON.parse(localStorage.getItem("history") || "[]");

  
  return (
    <div className="px-4 md:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Recharge History
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Track all your mobile recharge transactions
        </p>
      </div>

      

      {/* History List */}
      {!history.length ? (
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center 
                      border border-gray-100 max-w-2xl mx-auto">
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No Recharges Yet
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            You haven't made any recharges yet. Start by browsing our plans.
          </p>
          <a
            href="/plans"
            className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 
                     text-white font-semibold rounded-xl hover:from-amber-600 
                     hover:to-orange-600 transition-all duration-300"
          >
            Browse Plans
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 
                        bg-gradient-to-r from-gray-900 to-gray-800 
                        rounded-2xl text-white font-semibold">
            <div className="col-span-3">Phone Number</div>
            <div className="col-span-2">Operator</div>
            <div className="col-span-3">Plan</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Date & Time</div>
          </div>

          {/* History Items */}
          {history.map((h, index) => (
            <div 
              key={h.id} 
              className={`
                bg-white rounded-2xl shadow-lg hover:shadow-xl 
                transition-all duration-300 border border-gray-100 
                hover:border-amber-200 p-6 md:p-4
                ${index === 0 ? 'ring-2 ring-amber-500/20' : ''}
              `}
            >
              {/* Mobile View */}
              <div className="md:hidden">
                {index === 0 && (
                  <div className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 
                                text-white px-3 py-1 rounded-full text-sm font-bold mb-4">
                    LATEST
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{h.phone}</div>
                    <div className="text-gray-600 mt-1">{h.operator}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">₹{h.amount}</div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="text-gray-700 mb-2">{h.plan}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(h.date).toLocaleString()}
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    // Navigate to recharge with this plan's details
                    window.location.href = `/recharge?phone=${h.phone.replace('+91', '')}&operator=${h.operator}&amount=${h.amount}`;
                  }}
                  className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 
                           text-white font-semibold hover:from-amber-600 hover:to-orange-600 
                           transition-all duration-300"
                >
                  Recharge Again
                </button>
              </div>

              {/* Desktop View */}
              <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3">
                  <div className="font-bold text-gray-900">{h.phone}</div>
                </div>
                
                <div className="col-span-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                    ${h.operator === "Jio" ? 'bg-red-100 text-red-700' :
                      h.operator === "Airtel" ? 'bg-red-100 text-red-700' :
                      h.operator === "VI" ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'}`}
                  >
                    {h.operator}
                  </span>
                </div>
                
                <div className="col-span-3">
                  <div className="text-gray-700">{h.plan}</div>
                </div>
                
                <div className="col-span-2">
                  <div className="text-xl font-bold text-gray-900">₹{h.amount}</div>
                </div>
                
                <div className="col-span-2">
                  <div className="text-gray-600">
                    {new Date(h.date).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(h.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Actions Section */}
      {history.length > 0 && (
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to clear all history?")) {
                localStorage.removeItem("history");
                window.location.reload();
              }
            }}
            className="px-8 py-3 bg-white text-gray-700 font-semibold 
                     rounded-xl border border-gray-300 hover:bg-gray-50 
                     transition-all duration-300"
          >
            Clear History
          </button>
          <a
            href="/plans"
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 
                     text-white font-semibold rounded-xl hover:from-amber-600 
                     hover:to-orange-600 transition-all duration-300 text-center"
          >
            Make New Recharge
          </a>
        </div>
      )}

      
          </div>
  );
}