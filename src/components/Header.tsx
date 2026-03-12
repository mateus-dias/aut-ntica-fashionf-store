import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { categories } from "@/data/products";
import logo from "@/assets/logo.jpg";

export default function Header() {
  const { totalItems } = useCart();
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/categoria/todos?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <>
      {/* Top bar */}
      <div className="top-bar">FRETE GRÁTIS ACIMA DE R$ 299 | PARCELE EM ATÉ 6X SEM JUROS</div>

      <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="container flex items-center justify-between gap-4 py-3">
          {/* Mobile menu toggle */}
          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Autêntica FashionF" className="h-12 w-12 rounded-full object-cover" />
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg">
            <div className="relative w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full border border-border rounded-full py-2 px-4 pr-10 text-sm font-body bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-foreground hover:text-primary transition-colors">
              <User size={22} />
            </Link>
            <Link to="/carrinho" className="relative text-foreground hover:text-primary transition-colors">
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:block border-t border-border">
          <div className="container flex items-center justify-center gap-8 py-2.5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/categoria/${cat.slug}`}
                className="text-sm font-medium tracking-wide text-foreground hover:text-primary transition-colors uppercase"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-border bg-background">
            <form onSubmit={handleSearch} className="px-4 pt-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full border border-border rounded-full py-2 px-4 text-sm font-body bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </form>
            <div className="flex flex-col py-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/categoria/${cat.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium tracking-wide text-foreground hover:bg-surface-warm transition-colors uppercase"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
