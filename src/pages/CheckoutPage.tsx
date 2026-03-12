import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CreditCard, QrCode, Check } from "lucide-react";

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<"pix" | "card">("pix");
  const [submitted, setSubmitted] = useState(false);

  if (items.length === 0 && !submitted) {
    navigate("/carrinho");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
    toast.success("Pedido realizado com sucesso!");
  };

  if (submitted) {
    return (
      <div className="container py-20 text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Check size={32} className="text-primary" />
        </div>
        <h1 className="font-display text-2xl text-foreground mb-2">Pedido Confirmado!</h1>
        <p className="text-sm text-muted-foreground font-body mb-6">
          Obrigado pela sua compra. Você receberá um e-mail com os detalhes do pedido.
        </p>
        <button onClick={() => navigate("/")} className="btn-gold">Voltar à Loja</button>
      </div>
    );
  }

  const shipping = totalPrice >= 299 ? 0 : 19.9;
  const total = totalPrice + shipping;

  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="font-display text-2xl md:text-3xl mb-8 text-foreground">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3 space-y-6">
          {/* Info */}
          <div className="border border-border rounded-md p-6 bg-card">
            <h2 className="font-body font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">Dados Pessoais</h2>
            <div className="space-y-3">
              <input required placeholder="Nome completo" className="w-full border border-border rounded py-2.5 px-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              <input required placeholder="Telefone" type="tel" className="w-full border border-border rounded py-2.5 px-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              <input required placeholder="E-mail" type="email" className="w-full border border-border rounded py-2.5 px-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          {/* Address */}
          <div className="border border-border rounded-md p-6 bg-card">
            <h2 className="font-body font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">Endereço</h2>
            <div className="space-y-3">
              <input required placeholder="CEP" className="w-full border border-border rounded py-2.5 px-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              <input required placeholder="Endereço" className="w-full border border-border rounded py-2.5 px-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              <div className="grid grid-cols-3 gap-3">
                <input required placeholder="Número" className="border border-border rounded py-2.5 px-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
                <input placeholder="Complemento" className="col-span-2 border border-border rounded py-2.5 px-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input required placeholder="Cidade" className="border border-border rounded py-2.5 px-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
                <input required placeholder="Estado" className="border border-border rounded py-2.5 px-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="border border-border rounded-md p-6 bg-card">
            <h2 className="font-body font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">Pagamento</h2>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPayment("pix")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded border text-sm font-body font-medium transition-colors ${
                  payment === "pix" ? "border-primary bg-primary/5 text-primary" : "border-border text-foreground hover:border-primary"
                }`}
              >
                <QrCode size={18} /> Pix
              </button>
              <button
                type="button"
                onClick={() => setPayment("card")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded border text-sm font-body font-medium transition-colors ${
                  payment === "card" ? "border-primary bg-primary/5 text-primary" : "border-border text-foreground hover:border-primary"
                }`}
              >
                <CreditCard size={18} /> Cartão
              </button>
            </div>
            {payment === "card" && (
              <div className="space-y-3 mt-4">
                <input placeholder="Número do cartão" className="w-full border border-border rounded py-2.5 px-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Validade" className="border border-border rounded py-2.5 px-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
                  <input placeholder="CVV" className="border border-border rounded py-2.5 px-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <input placeholder="Nome no cartão" className="w-full border border-border rounded py-2.5 px-3 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            )}
            {payment === "pix" && (
              <p className="text-xs text-muted-foreground font-body mt-4">
                Após confirmar o pedido, um QR Code Pix será gerado para pagamento.
              </p>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="md:col-span-2">
          <div className="border border-border rounded-md p-6 bg-card sticky top-24">
            <h2 className="font-body font-semibold text-sm uppercase tracking-wider mb-4 text-foreground">Resumo</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm font-body">
                  <span className="text-foreground">{item.product.name} <span className="text-muted-foreground">x{item.quantity}</span></span>
                  <span className="text-foreground">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2">
              <div className="flex justify-between text-sm font-body">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm font-body">
                <span className="text-muted-foreground">Frete</span>
                <span className="text-primary font-medium">{shipping === 0 ? "Grátis" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-body font-bold pt-2 border-t border-border mt-2">
                <span className="text-foreground">Total</span>
                <span className="text-foreground text-lg">{formatPrice(total)}</span>
              </div>
            </div>
            <button type="submit" className="btn-gold w-full mt-6">
              Confirmar Pedido
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
