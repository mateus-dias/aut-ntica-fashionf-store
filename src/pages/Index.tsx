import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import heroBanner from "@/assets/hero-banner.jpg";

// Use first 6 product images as fake Instagram posts
const instagramPosts = products.slice(0, 6);

const Index = () => {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img src={heroBanner} alt="Coleção de calçados" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="font-display text-4xl md:text-6xl text-background font-bold mb-3 tracking-[0.15em] uppercase">
              Autêntica
            </h1>
            <p className="font-body text-background/90 text-lg md:text-xl mb-8 tracking-wide">
              Estilo e Conforto para Todos os Momentos
            </p>
            <Link to="/categoria/todos" className="btn-gold text-base">
              Ver Coleção
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Feminino", slug: "feminino" },
            { label: "Masculino", slug: "masculino" },
            { label: "Tênis", slug: "tenis" },
            { label: "Promoções", slug: "promocoes" },
          ].map((cat) => (
            <Link
              key={cat.slug}
              to={`/categoria/${cat.slug}`}
              className="bg-secondary hover:bg-surface-hover transition-colors rounded-md py-8 text-center"
            >
              <span className="font-body font-semibold text-sm uppercase tracking-wider text-foreground">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="container pb-16">
        <h2 className="font-display text-2xl md:text-3xl text-center mb-8 text-foreground">Destaques</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Instagram Section */}
      <section className="bg-secondary py-14">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Instagram size={24} className="text-primary" />
            <h2 className="font-display text-2xl md:text-3xl text-foreground">Siga a Autêntica no Instagram</h2>
          </div>
          <p className="text-sm text-muted-foreground font-body mb-8">
            Acompanhe as novidades, lançamentos e inspirações de estilo.
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mb-8">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href="https://www.instagram.com/autentica_fashionof"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square overflow-hidden rounded-md group"
              >
                <img
                  src={post.images[0]}
                  alt={post.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </a>
            ))}
          </div>
          <a
            href="https://www.instagram.com/autentica_fashionof"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-outline inline-flex items-center gap-2 rounded-full text-sm"
          >
            <Instagram size={16} />
            Ver Instagram
          </a>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12">
        <div className="container text-center max-w-lg">
          <h2 className="font-display text-2xl mb-3 text-foreground">Receba Novidades</h2>
          <p className="text-sm text-muted-foreground font-body mb-6">
            Cadastre-se e receba ofertas exclusivas e lançamentos.
          </p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Seu e-mail"
              className="flex-1 border border-border rounded-full py-2.5 px-4 text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="btn-gold rounded-full text-sm">
              Assinar
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Index;
