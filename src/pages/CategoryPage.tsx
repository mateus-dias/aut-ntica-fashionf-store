import { useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getProductsByCategory, products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const [showFilters, setShowFilters] = useState(false);
  const [filterSize, setFilterSize] = useState<number | null>(null);
  const [filterPrice, setFilterPrice] = useState<string>("");
  const [filterColor, setFilterColor] = useState<string>("");

  const categoryName = categories.find((c) => c.slug === slug)?.name || "Todos os Produtos";

  const baseProducts = slug && slug !== "todos" ? getProductsByCategory(slug) : products;

  const filtered = useMemo(() => {
    let result = baseProducts;
    if (query) result = result.filter((p) => p.name.toLowerCase().includes(query));
    if (filterSize) result = result.filter((p) => p.sizes.includes(filterSize));
    if (filterColor) result = result.filter((p) => p.colors.some((c) => c.toLowerCase() === filterColor.toLowerCase()));
    if (filterPrice === "0-150") result = result.filter((p) => p.price <= 150);
    if (filterPrice === "150-300") result = result.filter((p) => p.price > 150 && p.price <= 300);
    if (filterPrice === "300+") result = result.filter((p) => p.price > 300);
    return result;
  }, [baseProducts, query, filterSize, filterColor, filterPrice]);

  const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes))).sort((a, b) => a - b);
  const allColors = Array.from(new Set(products.flatMap((p) => p.colors)));

  const clearFilters = () => {
    setFilterSize(null);
    setFilterPrice("");
    setFilterColor("");
  };

  const hasFilters = filterSize || filterPrice || filterColor;

  const FilterPanel = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-body font-semibold text-sm uppercase tracking-wider text-foreground">Filtros</h3>
        {hasFilters && (
          <button onClick={clearFilters} className="text-xs text-primary font-body hover:underline">Limpar</button>
        )}
      </div>

      {/* Size */}
      <div>
        <h4 className="font-body font-medium text-sm mb-2 text-foreground">Tamanho</h4>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button
              key={s}
              onClick={() => setFilterSize(filterSize === s ? null : s)}
              className={`w-10 h-10 rounded border text-xs font-body font-medium transition-colors ${
                filterSize === s
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-foreground hover:border-primary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="font-body font-medium text-sm mb-2 text-foreground">Preço</h4>
        <div className="flex flex-col gap-2">
          {[
            { label: "Até R$ 150", value: "0-150" },
            { label: "R$ 150 - R$ 300", value: "150-300" },
            { label: "Acima de R$ 300", value: "300+" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-sm font-body text-foreground">
              <input
                type="radio"
                name="price"
                checked={filterPrice === opt.value}
                onChange={() => setFilterPrice(filterPrice === opt.value ? "" : opt.value)}
                className="accent-primary"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <h4 className="font-body font-medium text-sm mb-2 text-foreground">Cor</h4>
        <div className="flex flex-col gap-2">
          {allColors.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer text-sm font-body text-foreground">
              <input
                type="radio"
                name="color"
                checked={filterColor === c}
                onChange={() => setFilterColor(filterColor === c ? "" : c)}
                className="accent-primary"
              />
              {c}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <p className="text-xs text-muted-foreground font-body mb-4">
        Home / <span className="text-foreground">{categoryName}</span>
      </p>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl md:text-3xl text-foreground">{categoryName}</h1>
        <button
          className="lg:hidden flex items-center gap-1.5 text-sm font-body text-foreground border border-border rounded px-3 py-1.5"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={16} />
          Filtros
        </button>
      </div>

      <div className="flex gap-8">
        {/* Desktop filters */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <FilterPanel />
        </aside>

        {/* Mobile filters drawer */}
        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-foreground/30" onClick={() => setShowFilters(false)} />
            <div className="absolute right-0 top-0 h-full w-72 bg-background p-6 overflow-auto shadow-xl">
              <button onClick={() => setShowFilters(false)} className="absolute top-4 right-4">
                <X size={20} />
              </button>
              <FilterPanel />
            </div>
          </div>
        )}

        {/* Products */}
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-body mb-4">{filtered.length} produto(s) encontrado(s)</p>
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground font-body py-16">Nenhum produto encontrado.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
