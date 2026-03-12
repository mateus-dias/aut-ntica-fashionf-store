import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" />
        <h1 className="font-display text-2xl text-foreground mb-2">Seu carrinho está vazio</h1>
        <p className="text-sm text-muted-foreground font-body mb-6">Explore nossos produtos e encontre o calçado perfeito.</p>
        <Link to="/" className="btn-gold inline-block">Continuar Comprando</Link>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="font-display text-2xl md:text-3xl mb-8 text-foreground">Meu Carrinho</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={`${item.product.id}-${item.size}`} className="flex gap-4 border border-border rounded-md p-4 bg-card">
            <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-body font-medium text-sm text-foreground">{item.product.name}</h3>
                <p className="text-xs text-muted-foreground font-body mt-1">Tamanho: {item.size}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                  className="w-7 h-7 rounded border border-border flex items-center justify-center text-foreground hover:bg-secondary"
                >
                  <Minus size={14} />
                </button>
                <span className="font-body text-sm font-medium text-foreground w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                  className="w-7 h-7 rounded border border-border flex items-center justify-center text-foreground hover:bg-secondary"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <button
                onClick={() => removeItem(item.product.id, item.size)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 size={16} />
              </button>
              <span className="font-body font-semibold text-foreground">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 border-t border-border pt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground font-body">Subtotal</span>
          <span className="font-body font-medium text-foreground">{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground font-body">Frete</span>
          <span className="font-body text-sm text-primary font-medium">
            {totalPrice >= 299 ? "Grátis" : formatPrice(19.9)}
          </span>
        </div>
        <div className="flex justify-between items-center border-t border-border pt-4 mt-4">
          <span className="font-body font-semibold text-foreground">Total</span>
          <span className="font-body font-bold text-xl text-foreground">
            {formatPrice(totalPrice + (totalPrice >= 299 ? 0 : 19.9))}
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Link to="/" className="btn-gold-outline text-center flex-1">Continuar Comprando</Link>
        <Link to="/checkout" className="btn-gold text-center flex-1">Finalizar Compra</Link>
      </div>
    </div>
  );
}
