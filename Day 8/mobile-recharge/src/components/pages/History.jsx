// src/components/pages/History.jsx
export default function History() {
  const history = JSON.parse(localStorage.getItem("history") || "[]");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Recharge History</h2>

      {!history.length ? (
        <div className="bg-white p-6 rounded-xl shadow-md">No recharges yet.</div>
      ) : (
        <div className="space-y-4">
          {history.map((h) => (
            <div key={h.id} className="bg-white p-4 rounded-xl shadow-md border border-gray-100 flex justify-between">
              <div>
                <div className="font-semibold">{h.phone} • {h.operator}</div>
                <div className="text-sm text-gray-500">{h.plan}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-indigo-600">₹{h.amount}</div>
                <div className="text-sm text-gray-500">{new Date(h.date).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
