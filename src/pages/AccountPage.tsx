import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { User, Package, MapPin, LogOut } from "lucide-react";

const mockOrders = [
  { id: "#1042", date: "10/03/2026", status: "Entregue", total: 349.90 },
  { id: "#1038", date: "02/03/2026", status: "Enviado", total: 189.90 },
  { id: "#1025", date: "20/02/2026", status: "Entregue", total: 529.80 },
];

export default function AccountPage() {
  const { user, logoutCustomer } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="container py-10 max-w-4xl">
      <h1 className="font-display text-3xl mb-8 text-foreground">Minha Conta</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="space-y-2">
          <div className="border border-border rounded-md p-4 bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="text-primary" size={24} />
              </div>
              <div>
                <p className="font-semibold text-foreground capitalize">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <button
              onClick={logoutCustomer}
              className="flex items-center gap-2 text-sm text-destructive hover:underline w-full"
            >
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Dados */}
          <div className="border border-border rounded-md p-6 bg-card">
            <h2 className="font-display text-lg mb-4 flex items-center gap-2 text-foreground">
              <User size={18} /> Dados Pessoais
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground">Nome:</span> <p className="font-medium capitalize">{user.name}</p></div>
              <div><span className="text-muted-foreground">E-mail:</span> <p className="font-medium">{user.email}</p></div>
              <div><span className="text-muted-foreground">Telefone:</span> <p className="font-medium">(11) 99999-0000</p></div>
              <div><span className="text-muted-foreground">CPF:</span> <p className="font-medium">***.***.***-00</p></div>
            </div>
          </div>

          {/* Endereço */}
          <div className="border border-border rounded-md p-6 bg-card">
            <h2 className="font-display text-lg mb-4 flex items-center gap-2 text-foreground">
              <MapPin size={18} /> Endereço
            </h2>
            <div className="text-sm space-y-1">
              <p>Rua Exemplo, 123 - Apto 45</p>
              <p>Bairro Centro - São Paulo/SP</p>
              <p>CEP: 01000-000</p>
            </div>
          </div>

          {/* Pedidos */}
          <div className="border border-border rounded-md p-6 bg-card">
            <h2 className="font-display text-lg mb-4 flex items-center gap-2 text-foreground">
              <Package size={18} /> Meus Pedidos
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="py-2 pr-4">Pedido</th>
                    <th className="py-2 pr-4">Data</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((o) => (
                    <tr key={o.id} className="border-b border-border last:border-0">
                      <td className="py-3 pr-4 font-medium">{o.id}</td>
                      <td className="py-3 pr-4">{o.date}</td>
                      <td className="py-3 pr-4">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${o.status === "Entregue" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">R$ {o.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
