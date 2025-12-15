import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Sidebar() {
  const { isLoggedIn, user } = useAppContext();
  
  const navItems = [
    { to: "/", label: "Home", icon: "🏠" },
    ...(isLoggedIn ? [{ to: "/dashboard", label: user?.type === "admin" ? "Admin Dashboard" : "Dashboard", icon: "📊" }] : []),
    { to: "/recharge", label: "Recharge Now", icon: "⚡" },
    { to: "/plans", label: "Browse Plans", icon: "💳" },
    { to: "/offers", label: "Special Offers", icon: "🏷️" },
    { to: "/history", label: "Recharge History", icon: "📋" },
    { to: "/profile", label: "My Account", icon: "👤" },
  ];

  return (
    <aside className="hidden lg:block w-64 bg-white border-r border-gray-100 h-screen p-6 fixed left-0 top-16">
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