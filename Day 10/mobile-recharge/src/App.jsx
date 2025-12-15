import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider, useAppContext } from "./context/AppContext";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Loader from "./components/ui/Loader";

import Home from "./components/pages/home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Recharge from "./components/pages/Recharge";
import Plans from "./components/plan";
import Offers from "./components/Offers";
import History from "./components/pages/History";
import Profile from "./components/pages/Profile";
import UserDashboard from "./components/pages/Dashboard/UserDashboard";

function AppContent() {
  const { loading } = useAppContext();

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-orange-100 via-pink-100 to-purple-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/*" element={
            <>
              <Navbar />
              <div className="flex pt-16">
                <Sidebar />
                <div className="flex-1 min-h-screen ml-0 lg:ml-64 p-4 lg:p-8">
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
            </>
          } />
        </Routes>
        
        {loading && <Loader fullScreen text="Processing..." />}
      </div>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;