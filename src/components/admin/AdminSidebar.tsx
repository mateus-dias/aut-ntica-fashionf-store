import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users, Tags, Settings, LogOut, Store } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Produtos", path: "/admin/produtos", icon: Package },
  { label: "Pedidos", path: "/admin/pedidos", icon: ShoppingCart },
  { label: "Clientes", path: "/admin/clientes", icon: Users },
  { label: "Categorias", path: "/admin/categorias", icon: Tags },
  { label: "Configurações", path: "/admin/configuracoes", icon: Settings },
];

export default function AdminSidebar() {
  const location = useLocation();
  const { logoutAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <aside className="w-60 min-h-screen bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <Store size={20} className="text-primary" />
          <span className="font-display text-sm font-semibold text-foreground">Autêntica Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <Link to="/" className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-1">
          <Store size={18} /> Ver Loja
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md w-full transition-colors"
        >
          <LogOut size={18} /> Sair
        </button>
      </div>
    </aside>
  );
}
