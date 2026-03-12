import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginCustomer } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginCustomer(email, password);
    toast.success(isLogin ? "Login realizado com sucesso!" : "Cadastro realizado com sucesso!");
    navigate("/conta");
  };

  return (
    <div className="container py-12 max-w-md">
      <div className="text-center mb-8">
        <span className="font-display text-2xl font-semibold tracking-[0.25em] uppercase text-foreground">— Autêntica —</span>
        <h1 className="font-display text-xl text-muted-foreground mt-2">{isLogin ? "Entrar" : "Criar Conta"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="border border-border rounded-md p-6 bg-card space-y-4">
        {!isLogin && (
          <input required placeholder="Nome completo" className="w-full border border-border rounded py-2.5 px-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
        )}
        <input required placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-border rounded py-2.5 px-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
        <input required placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-border rounded py-2.5 px-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
        {!isLogin && (
          <input required placeholder="Confirmar senha" type="password" className="w-full border border-border rounded py-2.5 px-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
        )}
        <button type="submit" className="btn-gold w-full">{isLogin ? "Entrar" : "Cadastrar"}</button>
      </form>

      <p className="text-center text-sm text-muted-foreground font-body mt-4">
        {isLogin ? "Não tem conta?" : "Já tem conta?"}{" "}
        <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline font-medium">
          {isLogin ? "Cadastre-se" : "Faça login"}
        </button>
      </p>
    </div>
  );
}
