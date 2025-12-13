// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const userType = localStorage.getItem("userType") || "user";
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  
  const navItems = [
    { to: "/", label: "Home" },
    ...(isLoggedIn ? [{ to: "/dashboard", label: userType === "admin" ? "Admin Dashboard" : "Dashboard" }] : []),
    { to: "/recharge", label: "Recharge Now"},
    { to: "/plans", label: "Browse Plans" },
    { to: "/offers", label: "Special Offers"},
    { to: "/history", label: "Recharge History"},
    { to: "/profile", label: "My Account" },
  ];
  return (
     <aside className="w-64 bg-white border-r border-gray-100 h-screen p-6 fixed left-0 top-16">
       <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all
              ${isActive 
                ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border-l-4 border-amber-500' 
                : 'text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      
    </aside>
  );
}
