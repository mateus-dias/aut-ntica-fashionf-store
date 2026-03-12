import { mockClients } from "@/data/adminStore";
import { Mail, Phone } from "lucide-react";

export default function AdminClients() {
  return (
    <div>
      <h1 className="font-display text-xl sm:text-2xl text-foreground mb-4 sm:mb-6">Clientes</h1>

      {/* Desktop Table */}
      <div className="hidden md:block bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50 text-left text-muted-foreground">
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">E-mail</th>
                <th className="py-3 px-4">Telefone</th>
                <th className="py-3 px-4 text-center">Pedidos</th>
              </tr>
            </thead>
            <tbody>
              {mockClients.map((c) => (
                <tr key={c.email} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">{c.name}</td>
                  <td className="py-3 px-4 flex items-center gap-1.5"><Mail size={14} className="text-muted-foreground" />{c.email}</td>
                  <td className="py-3 px-4"><span className="flex items-center gap-1.5"><Phone size={14} className="text-muted-foreground" />{c.phone}</span></td>
                  <td className="py-3 px-4 text-center font-semibold">{c.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {mockClients.map((c) => (
          <div key={c.email} className="bg-card border border-border rounded-lg p-4 space-y-1.5">
            <p className="font-medium text-foreground text-sm">{c.name}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Mail size={13} />{c.email}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Phone size={13} />{c.phone}</p>
            <p className="text-xs text-muted-foreground">{c.orders} pedidos</p>
          </div>
        ))}
      </div>
    </div>
  );
}
