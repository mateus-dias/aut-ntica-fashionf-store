import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-display text-lg mb-4">Autêntica Fashion</h3>
          <p className="text-sm opacity-70 leading-relaxed font-body">
            Luxo e sofisticação em calçados para todos os momentos. Qualidade e estilo que você merece.
          </p>
          <a
            href="https://www.instagram.com/autentica_fashionof"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            <Instagram size={18} />
            @autentica_fashionof
          </a>
        </div>
        <div>
          <h4 className="font-body font-semibold text-sm uppercase tracking-wider mb-4">Categorias</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70 font-body">
            <Link to="/categoria/feminino" className="hover:opacity-100 transition-opacity">Feminino</Link>
            <Link to="/categoria/masculino" className="hover:opacity-100 transition-opacity">Masculino</Link>
            <Link to="/categoria/tenis" className="hover:opacity-100 transition-opacity">Tênis</Link>
            <Link to="/categoria/sandalias" className="hover:opacity-100 transition-opacity">Sandálias</Link>
          </div>
        </div>
        <div>
          <h4 className="font-body font-semibold text-sm uppercase tracking-wider mb-4">Institucional</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70 font-body">
            <span>Sobre nós</span>
            <span>Política de trocas</span>
            <span>Termos de uso</span>
            <span>Privacidade</span>
          </div>
        </div>
        <div>
          <h4 className="font-body font-semibold text-sm uppercase tracking-wider mb-4">Atendimento</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70 font-body">
            <span>(11) 99999-0000</span>
            <span>contato@autenticafashion.com</span>
            <span>Seg-Sex: 9h às 18h</span>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 py-4">
        <p className="text-center text-xs opacity-50 font-body">
          © 2026 Autêntica Fashion. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
