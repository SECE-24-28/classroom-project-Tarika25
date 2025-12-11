// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const common = "block px-4 py-2 rounded-lg hover:text-blue-600 transition relative";
  const active = "before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-sky-500 before:to-indigo-600";

  return (
    <aside className="w-60 bg-white shadow-md h-screen p-6 fixed left-0 top-16">
      <ul className="space-y-4">
        <li><NavLink to="/" className={({isActive}) => common + (isActive? " " + active : "")}>Home</NavLink></li>
        <li><NavLink to="/recharge" className={({isActive}) => common + (isActive? " " + active : "")}>Recharge</NavLink></li>
        <li><NavLink to="/plan" className={({isActive}) => common + (isActive? " " + active : "")}>Plans</NavLink></li>
        <li><NavLink to="/offers" className={({isActive}) => common + (isActive? " " + active : "")}>Offers</NavLink></li>
        <li><NavLink to="/history" className={({isActive}) => common + (isActive? " " + active : "")}>History</NavLink></li>
        <li><NavLink to="/profile" className={({isActive}) => common + (isActive? " " + active : "")}>Profile</NavLink></li>
      </ul>
    </aside>
  );
}
