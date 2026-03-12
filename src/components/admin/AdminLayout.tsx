import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminSidebar from "./AdminSidebar";
import { Menu, X, Store } from "lucide-react";

export default function AdminLayout() {
  const { adminUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!adminUser) return <Navigate to="/admin/login" replace />;

  return (
    <div className="flex min-h-screen bg-secondary">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-50 w-60 h-full animate-in slide-in-from-left duration-300">
            <AdminSidebar onNavigate={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 rounded hover:bg-secondary transition-colors">
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <Store size={18} className="text-primary" />
            <span className="font-display text-sm font-semibold text-foreground">Autêntica Admin</span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
