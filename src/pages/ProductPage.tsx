import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/ProductCard";
import { ShoppingBag, Check } from "lucide-react";
import { toast } from "sonner";

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground font-body">Produto não encontrado.</p>
        <Link to="/" className="btn-gold inline-block mt-4">Voltar</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id && p.gender === product.gender).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Selecione um tamanho");
      return;
    }
    addItem(product, selectedSize);
    toast.success("Adicionado ao carrinho!");
  };

  return (
    <div className="container py-8">
      <p className="text-xs text-muted-foreground font-body mb-6">
        <Link to="/" className="hover:text-primary">Home</Link> / <Link to={`/categoria/${product.gender}`} className="hover:text-primary capitalize">{product.gender}</Link> / <span className="text-foreground">{product.name}</span>
      </p>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="aspect-square bg-secondary rounded-md overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-body">{product.gender}</p>
          <h1 className="font-display text-2xl md:text-3xl mt-1 text-foreground">{product.name}</h1>
          
          <div className="mt-4 flex items-center gap-3">
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through font-body">{formatPrice(product.originalPrice)}</span>
            )}
            <span className="text-2xl font-body font-bold text-foreground">{formatPrice(product.price)}</span>
          </div>
          <p className="text-xs text-muted-foreground font-body mt-1">
            ou 6x de {formatPrice(product.price / 6)} sem juros
          </p>

          {/* Size */}
          <div className="mt-8">
            <h3 className="font-body font-medium text-sm mb-3 text-foreground">Tamanho</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-12 h-12 rounded border text-sm font-body font-medium transition-colors ${
                    selectedSize === s
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-foreground hover:border-primary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button onClick={handleAddToCart} className="btn-gold mt-8 flex items-center justify-center gap-2 text-base">
            <ShoppingBag size={18} />
            Adicionar ao Carrinho
          </button>

          {/* Description */}
          <div className="mt-8 border-t border-border pt-6">
            <h3 className="font-body font-semibold text-sm uppercase tracking-wider mb-3 text-foreground">Descrição</h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">{product.description}</p>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground font-body">
            <Check size={14} className="text-primary" /> Frete grátis acima de R$ 299
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16 pb-8">
          <h2 className="font-display text-xl md:text-2xl text-center mb-8 text-foreground">Você Também Pode Gostar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
