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
import Home from "./components/pages/home";
import UserDashboard from "./components/pages/Dashboard/UserDashboard"; 


function App() {
  return (
    <Router>
      <Routes>

    
        <Route path="/login" element={<Login />} />

       
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/*"
          element={
            <div
              className="min-h-screen flex flex-col 
                         bg-gradient-to-b from-orange-100 via-pink-100 to-purple-100"
            >
              <Navbar />

              <div className="flex pt-16">
                <Sidebar />

                <div className="p-8 flex-1 min-h-screen ml-60">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<UserDashboard />} />
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
