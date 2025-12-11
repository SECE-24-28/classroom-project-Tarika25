import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Offers from "./components/Offers";
import Plans from "./components/plan";

import Login from "./components/Login";
import Signup from "./components/Signup";

import Recharge from "./components/pages/Recharge";
import History from "./components/pages/History";
import Profile from "./components/pages/Profile";

function Home() {
  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-10 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold mb-4">Fast & Secure Mobile Recharge</h1>
        <p className="text-lg opacity-90">
          Recharge your prepaid mobile instantly with safe payment options.
        </p>
      </div>

      <div className="mt-10">
        <Plans />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Instant Recharge</h2>
          <p className="text-gray-700">No waiting! Recharge instantly.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Best Plans</h2>
          <p className="text-gray-700">Browse top plans from all operators.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Safe Payments</h2>
          <p className="text-gray-700">100% secure & trusted methods.</p>
        </div>
      </div>

      <div className="mt-12 bg-white p-8 rounded-3xl shadow-lg flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Get Exclusive Offers</h2>
          <p className="text-gray-600 mt-2">Sign up to receive the latest recharge offers.</p>
        </div>

        <a
          href="/offers"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:scale-105 transition"
        >
          Explore Offers
        </a>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>

        {/* SHOW LOGIN PAGE ALONE — NO NAVBAR/SIDEBAR */}
        <Route path="/login" element={<Login />} />

        {/* SHOW SIGNUP PAGE ALONE */}
        <Route path="/signup" element={<Signup />} />

        {/* MAIN LAYOUT WITH NAVBAR + SIDEBAR */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen flex flex-col bg-gray-100">

              <Navbar />

              <div className="flex pt-16">
                <Sidebar />

                <div className="p-8 flex-1 bg-gray-50 min-h-screen ml-60">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/plans" element={<Plans />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/recharge" element={<Recharge />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </div>
              </div>

              <Footer />
            </div>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
