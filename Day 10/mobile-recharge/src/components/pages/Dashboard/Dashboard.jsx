import { DashboardLayout, UserDashboard, AdminDashboard } from ".";

export default function Dashboard() {
  const userType = localStorage.getItem("userType") || "user";

  return (
    <DashboardLayout>
      {userType === "admin" ? <AdminDashboard /> : <UserDashboard />}
    </DashboardLayout>
  );
}