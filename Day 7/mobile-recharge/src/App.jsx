import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Plans from "./components/plan";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* NAVBAR */}
      <Navbar />

      <div className="flex pt-24"> {/* Push content below Navbar */}
        
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <div className="p-8 flex-1 bg-gray-50 min-h-screen">

          {/* HERO SECTION */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-10 rounded-3xl shadow-xl">
            <h1 className="text-4xl font-bold mb-4">
              Fast & Secure Mobile Recharge
            </h1>
            <p className="text-lg opacity-90">
              Recharge your prepaid mobile instantly with safe payment options.
            </p>
          </div>

          {/* PLANS SECTION */}
          <div className="mt-10">
            <Plans />
          </div>

          {/* FEATURES SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                Instant Recharge
              </h2>
              <p className="text-gray-700">
                No waiting! Get your mobile recharged instantly with one click.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                Best Plans
              </h2>
              <p className="text-gray-700">
                Browse top plans from all operators in one place.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                Safe Payments
              </h2>
              <p className="text-gray-700">
                100% secure & trusted payment methods for all recharges.
              </p>
            </div>
          </div>
          

          {/* OFFERS SECTION */}
          <div className="mt-12 bg-white p-8 rounded-3xl shadow-lg flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Get Exclusive Offers
              </h2>
              <p className="text-gray-600 mt-2">
                Sign up to receive the latest recharge offers.
              </p>
            </div>

            <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:scale-105 transition">
              Explore Offers
            </button>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}

export default App;
