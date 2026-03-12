import { ShoppingCart, Package, DollarSign, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { label: "Total de Pedidos", value: "156", icon: ShoppingCart, color: "text-blue-600 bg-blue-50" },
  { label: "Produtos Ativos", value: "48", icon: Package, color: "text-green-600 bg-green-50" },
  { label: "Vendas do Mês", value: "R$ 24.580", icon: DollarSign, color: "text-primary bg-primary/10" },
  { label: "Clientes", value: "312", icon: Users, color: "text-purple-600 bg-purple-50" },
];

const chartData = [
  { month: "Set", vendas: 12400 },
  { month: "Out", vendas: 18200 },
  { month: "Nov", vendas: 22800 },
  { month: "Dez", vendas: 31500 },
  { month: "Jan", vendas: 19600 },
  { month: "Fev", vendas: 21300 },
  { month: "Mar", vendas: 24580 },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-2xl text-foreground mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <div className={`p-2 rounded-lg ${s.color}`}>
                <s.icon size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-display text-lg text-foreground mb-4">Vendas dos Últimos 7 Meses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, "Vendas"]}
              contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))" }}
            />
            <Bar dataKey="vendas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
