import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import logo from "@/assets/logo.jpg";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(email, password)) {
      toast.success("Login administrativo realizado!");
      navigate("/admin/dashboard");
    } else {
      toast.error("Credenciais inválidas. Use admin@admin / 123456");
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <img src={logo} alt="Autêntica FashionF" className="h-16 w-16 rounded-full object-cover mx-auto mb-3" />
          <h1 className="font-display text-xl text-foreground">Painel Administrativo</h1>
          <p className="text-sm text-muted-foreground mt-1">Faça login para continuar</p>
        </div>
        <form onSubmit={handleSubmit} className="border border-border rounded-md p-6 bg-card space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">E-mail</label>
            <input
              required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@admin"
              className="w-full border border-border rounded py-2.5 px-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Senha</label>
            <input
              required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="123456"
              className="w-full border border-border rounded py-2.5 px-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button type="submit" className="btn-gold w-full">Entrar</button>
          <p className="text-xs text-muted-foreground text-center">Demo: admin@admin / 123456</p>
        </form>
      </div>
    </div>
  );
}
