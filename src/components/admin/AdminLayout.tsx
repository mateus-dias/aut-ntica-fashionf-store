import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  const { adminUser } = useAuth();

  if (!adminUser) return <Navigate to="/admin/login" replace />;

  return (
    <div className="flex min-h-screen bg-secondary">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
