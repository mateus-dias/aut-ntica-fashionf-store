import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/produto/${product.id}`} className="product-card group block">
      <div className="relative aspect-square bg-secondary overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.badge === "sale" && (
          <span className="badge-sale absolute top-3 left-3">SALE</span>
        )}
        {product.badge === "new" && (
          <span className="badge-new absolute top-3 left-3">NOVO</span>
        )}
        <div className="product-card-actions absolute bottom-3 right-3">
          <span className="bg-primary text-primary-foreground p-2.5 rounded-full flex items-center justify-center shadow-md">
            <ShoppingBag size={16} />
          </span>
        </div>
      </div>
      <div className="p-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-body">{product.gender}</p>
        <h3 className="font-body font-medium text-sm mt-1 text-foreground leading-tight">{product.name}</h3>
        <div className="mt-2 flex items-center gap-2">
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through font-body">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="font-body font-semibold text-foreground">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}
