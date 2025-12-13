import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

export default function Dashboard() {
  const userType = localStorage.getItem("userType") || "user";

  return userType === "admin" ? <AdminDashboard /> : <UserDashboard />;
}