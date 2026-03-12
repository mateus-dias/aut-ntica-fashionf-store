import shoe1 from "@/assets/products/shoe-1.jpg";
import shoe2 from "@/assets/products/shoe-2.jpg";
import shoe3 from "@/assets/products/shoe-3.jpg";
import shoe4 from "@/assets/products/shoe-4.jpg";
import shoe5 from "@/assets/products/shoe-5.jpg";
import shoe6 from "@/assets/products/shoe-6.jpg";
import shoe7 from "@/assets/products/shoe-7.jpg";
import shoe8 from "@/assets/products/shoe-8.jpg";
import shoe9 from "@/assets/products/shoe-9.jpg";
import shoe10 from "@/assets/products/shoe-10.jpg";
import shoe11 from "@/assets/products/shoe-11.jpg";
import shoe12 from "@/assets/products/shoe-12.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  gender: "feminino" | "masculino" | "unissex";
  sizes: number[];
  colors: string[];
  description: string;
  badge?: "sale" | "new";
}

export const products: Product[] = [
  {
    id: "1",
    name: "Scarpin Nude Elegance",
    price: 189.9,
    originalPrice: 249.9,
    image: shoe1,
    images: [shoe1],
    category: "sandálias",
    gender: "feminino",
    sizes: [34, 35, 36, 37, 38, 39],
    colors: ["Nude", "Preto"],
    description: "Scarpin clássico em couro sintético com acabamento premium. Salto fino de 10cm ideal para ocasiões especiais.",
    badge: "sale",
  },
  {
    id: "2",
    name: "Tênis Urban White",
    price: 229.9,
    image: shoe2,
    images: [shoe2],
    category: "tênis",
    gender: "masculino",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ["Branco"],
    description: "Tênis casual em couro sintético branco. Design minimalista perfeito para o dia a dia.",
    badge: "new",
  },
  {
    id: "3",
    name: "Bota Chelsea Preta",
    price: 349.9,
    image: shoe3,
    images: [shoe3],
    category: "sandálias",
    gender: "feminino",
    sizes: [34, 35, 36, 37, 38, 39],
    colors: ["Preto"],
    description: "Bota Chelsea em couro legítimo com elástico lateral. Salto bloco de 6cm. Sofisticação para todas as estações.",
  },
  {
    id: "4",
    name: "Sandália Rasteira Dourada",
    price: 119.9,
    originalPrice: 159.9,
    image: shoe4,
    images: [shoe4],
    category: "sandálias",
    gender: "feminino",
    sizes: [34, 35, 36, 37, 38, 39],
    colors: ["Dourado"],
    description: "Sandália rasteira metalizada com tiras delicadas. Conforto e elegância para os dias quentes.",
    badge: "sale",
  },
  {
    id: "5",
    name: "Oxford Social Marrom",
    price: 299.9,
    image: shoe5,
    images: [shoe5],
    category: "sandálias",
    gender: "masculino",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ["Marrom"],
    description: "Sapato Oxford em couro legítimo com acabamento polido. Clássico e sofisticado para ocasiões formais.",
  },
  {
    id: "6",
    name: "Scarpin Vermelho Passion",
    price: 199.9,
    image: shoe6,
    images: [shoe6],
    category: "sandálias",
    gender: "feminino",
    sizes: [34, 35, 36, 37, 38],
    colors: ["Vermelho"],
    description: "Scarpin em camurça vermelha com salto stiletto de 12cm. Ousadia e sofisticação em cada passo.",
    badge: "new",
  },
  {
    id: "7",
    name: "Tênis Runner Sport",
    price: 279.9,
    originalPrice: 349.9,
    image: shoe7,
    images: [shoe7],
    category: "tênis",
    gender: "masculino",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ["Preto"],
    description: "Tênis esportivo com tecnologia de amortecimento e solado em EVA. Performance e estilo.",
    badge: "sale",
  },
  {
    id: "8",
    name: "Sandália Plataforma Branca",
    price: 159.9,
    image: shoe8,
    images: [shoe8],
    category: "sandálias",
    gender: "feminino",
    sizes: [34, 35, 36, 37, 38, 39],
    colors: ["Branco"],
    description: "Sandália plataforma em couro branco com fivela ajustável. Altura e conforto em um só calçado.",
  },
  {
    id: "9",
    name: "Slip-On Canvas Azul",
    price: 149.9,
    image: shoe9,
    images: [shoe9],
    category: "tênis",
    gender: "masculino",
    sizes: [38, 39, 40, 41, 42, 43],
    colors: ["Azul Marinho"],
    description: "Slip-on em canvas azul marinho com solado em borracha. Praticidade para o dia a dia.",
    badge: "new",
  },
  {
    id: "10",
    name: "Sapatilha Ballet Rosa",
    price: 99.9,
    originalPrice: 139.9,
    image: shoe10,
    images: [shoe10],
    category: "sandálias",
    gender: "feminino",
    sizes: [34, 35, 36, 37, 38],
    colors: ["Rosa"],
    description: "Sapatilha ballet em couro sintético com laço decorativo. Delicadeza e conforto no seu dia a dia.",
    badge: "sale",
  },
  {
    id: "11",
    name: "Mule Animal Print",
    price: 179.9,
    image: shoe11,
    images: [shoe11],
    category: "sandálias",
    gender: "feminino",
    sizes: [34, 35, 36, 37, 38, 39],
    colors: ["Leopardo"],
    description: "Mule em material sintético com estampa animal print. Tendência e personalidade em cada look.",
  },
  {
    id: "12",
    name: "Mocassim Cinza Casual",
    price: 219.9,
    image: shoe12,
    images: [shoe12],
    category: "sandálias",
    gender: "masculino",
    sizes: [38, 39, 40, 41, 42, 43],
    colors: ["Cinza"],
    description: "Mocassim em camurça cinza com solado em couro. Elegância casual para diversas ocasiões.",
  },
];

export const categories = [
  { name: "Feminino", slug: "feminino" },
  { name: "Masculino", slug: "masculino" },
  { name: "Tênis", slug: "tenis" },
  { name: "Sandálias", slug: "sandalias" },
  { name: "Promoções", slug: "promocoes" },
];

export function getProductsByCategory(slug: string): Product[] {
  if (slug === "feminino") return products.filter((p) => p.gender === "feminino");
  if (slug === "masculino") return products.filter((p) => p.gender === "masculino");
  if (slug === "tenis") return products.filter((p) => p.category === "tênis");
  if (slug === "sandalias") return products.filter((p) => p.category === "sandálias");
  if (slug === "promocoes") return products.filter((p) => p.badge === "sale");
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
