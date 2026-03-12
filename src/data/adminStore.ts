import { Product, products as initialProducts, categories } from "./products";

// Mutable store for admin demo
let _products = [...initialProducts];
let _nextId = 13;

export function getAdminProducts(): Product[] {
  return _products;
}

export function addAdminProduct(data: Omit<Product, "id">): Product {
  const product: Product = { ...data, id: String(_nextId++) };
  _products = [product, ..._products];
  return product;
}

export function updateAdminProduct(id: string, data: Partial<Product>): void {
  _products = _products.map((p) => (p.id === id ? { ...p, ...data } : p));
}

export function deleteAdminProduct(id: string): void {
  _products = _products.filter((p) => p.id !== id);
}

// Mock orders
export interface Order {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: "Em preparo" | "Enviado" | "Entregue";
  date: string;
  items: number;
}

export const mockOrders: Order[] = [
  { id: "#1050", customer: "Maria Silva", email: "maria@email.com", total: 349.90, status: "Em preparo", date: "12/03/2026", items: 2 },
  { id: "#1049", customer: "João Santos", email: "joao@email.com", total: 229.90, status: "Enviado", date: "11/03/2026", items: 1 },
  { id: "#1048", customer: "Ana Costa", email: "ana@email.com", total: 489.80, status: "Entregue", date: "10/03/2026", items: 3 },
  { id: "#1047", customer: "Pedro Lima", email: "pedro@email.com", total: 179.90, status: "Entregue", date: "09/03/2026", items: 1 },
  { id: "#1046", customer: "Carla Oliveira", email: "carla@email.com", total: 599.70, status: "Enviado", date: "08/03/2026", items: 2 },
  { id: "#1045", customer: "Lucas Ferreira", email: "lucas@email.com", total: 299.90, status: "Entregue", date: "07/03/2026", items: 1 },
  { id: "#1044", customer: "Juliana Alves", email: "juliana@email.com", total: 419.80, status: "Entregue", date: "06/03/2026", items: 2 },
  { id: "#1043", customer: "Rafael Souza", email: "rafael@email.com", total: 149.90, status: "Entregue", date: "05/03/2026", items: 1 },
];

export const mockClients = [
  { name: "Maria Silva", email: "maria@email.com", phone: "(11) 98765-4321", orders: 5 },
  { name: "João Santos", email: "joao@email.com", phone: "(21) 97654-3210", orders: 3 },
  { name: "Ana Costa", email: "ana@email.com", phone: "(31) 96543-2109", orders: 8 },
  { name: "Pedro Lima", email: "pedro@email.com", phone: "(41) 95432-1098", orders: 2 },
  { name: "Carla Oliveira", email: "carla@email.com", phone: "(51) 94321-0987", orders: 6 },
  { name: "Lucas Ferreira", email: "lucas@email.com", phone: "(61) 93210-9876", orders: 1 },
  { name: "Juliana Alves", email: "juliana@email.com", phone: "(71) 92109-8765", orders: 4 },
  { name: "Rafael Souza", email: "rafael@email.com", phone: "(81) 91098-7654", orders: 2 },
];
