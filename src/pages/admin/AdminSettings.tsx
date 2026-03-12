import { useState } from "react";
import { toast } from "sonner";

export default function AdminSettings() {
  const [storeName, setStoreName] = useState("Autêntica FashionF");
  const [email, setEmail] = useState("contato@autenticafashionf.com");
  const [phone, setPhone] = useState("(11) 3000-0000");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Configurações salvas!");
  };

  return (
    <div>
      <h1 className="font-display text-2xl text-foreground mb-6">Configurações</h1>

      <form onSubmit={handleSave} className="bg-card border border-border rounded-lg p-6 max-w-lg space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Nome da Loja</label>
          <input value={storeName} onChange={(e) => setStoreName(e.target.value)}
            className="w-full border border-border rounded py-2 px-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">E-mail de Contato</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
            className="w-full border border-border rounded py-2 px-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Telefone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-border rounded py-2 px-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <button type="submit" className="btn-gold w-full">Salvar Configurações</button>
      </form>
    </div>
  );
}
