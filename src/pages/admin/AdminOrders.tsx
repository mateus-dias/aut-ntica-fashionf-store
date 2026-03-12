import { useState } from "react";
import { mockOrders, Order } from "@/data/adminStore";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  "Em preparo": "bg-yellow-100 text-yellow-700",
  "Enviado": "bg-blue-100 text-blue-700",
  "Entregue": "bg-green-100 text-green-700",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const changeStatus = (id: string, newStatus: Order["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
    toast.success(`Pedido ${id} atualizado para "${newStatus}"`);
  };

  return (
    <div>
      <h1 className="font-display text-xl sm:text-2xl text-foreground mb-4 sm:mb-6">Pedidos</h1>

      {/* Desktop Table */}
      <div className="hidden md:block bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50 text-left text-muted-foreground">
                <th className="py-3 px-4">Pedido</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Valor</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Data</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">{o.id}</td>
                  <td className="py-3 px-4">{o.customer}</td>
                  <td className="py-3 px-4">R$ {o.total.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${statusColors[o.status]}`}>{o.status}</span>
                  </td>
                  <td className="py-3 px-4">{o.date}</td>
                  <td className="py-3 px-4 text-right">
                    <select
                      value={o.status}
                      onChange={(e) => changeStatus(o.id, e.target.value as Order["status"])}
                      className="border border-border rounded py-1 px-2 text-xs bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option>Em preparo</option>
                      <option>Enviado</option>
                      <option>Entregue</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="bg-card border border-border rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground text-sm">{o.id}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${statusColors[o.status]}`}>{o.status}</span>
            </div>
            <div className="text-sm text-muted-foreground">{o.customer}</div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">R$ {o.total.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground">{o.date}</span>
            </div>
            <select
              value={o.status}
              onChange={(e) => changeStatus(o.id, e.target.value as Order["status"])}
              className="w-full border border-border rounded py-1.5 px-2 text-xs bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Em preparo</option>
              <option>Enviado</option>
              <option>Entregue</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
