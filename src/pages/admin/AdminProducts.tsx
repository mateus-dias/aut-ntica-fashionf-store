import { useState } from "react";
import { getAdminProducts, addAdminProduct, updateAdminProduct, deleteAdminProduct } from "@/data/adminStore";
import { Product } from "@/data/products";
import { Pencil, Trash2, Plus, X, ImagePlus } from "lucide-react";
import { toast } from "sonner";

const emptyForm = {
  name: "", description: "", price: "", category: "sandálias",
  gender: "feminino" as "feminino" | "masculino" | "unissex",
  sizes: "34,35,36,37,38,39", colors: "Preto", stock: "10",
};

export default function AdminProducts() {
  const [products, setProducts] = useState(getAdminProducts());
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const refresh = () => setProducts([...getAdminProducts()]);

  const openNew = () => {
    setEditId(null);
    setForm(emptyForm);
    setImagePreviews([]);
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditId(p.id);
    setForm({
      name: p.name, description: p.description, price: String(p.price),
      category: p.category, gender: p.gender,
      sizes: p.sizes.join(","), colors: p.colors.join(","), stock: "10",
    });
    setImagePreviews(p.images);
    setShowForm(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => setImagePreviews((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (idx: number) => setImagePreviews((prev) => prev.filter((_, i) => i !== idx));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      category: form.category,
      gender: form.gender,
      sizes: form.sizes.split(",").map(Number),
      colors: form.colors.split(",").map((c) => c.trim()),
      image: imagePreviews[0] || "/placeholder.svg",
      images: imagePreviews.length ? imagePreviews : ["/placeholder.svg"],
    };

    if (editId) {
      updateAdminProduct(editId, data);
      toast.success("Produto atualizado!");
    } else {
      addAdminProduct(data as Omit<Product, "id">);
      toast.success("Produto adicionado ao catálogo!");
    }
    refresh();
    setShowForm(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Excluir "${name}"?`)) {
      deleteAdminProduct(id);
      refresh();
      toast.success("Produto excluído!");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-foreground">Produtos</h1>
        <button onClick={openNew} className="btn-gold flex items-center gap-2 text-sm">
          <Plus size={16} /> Adicionar Produto
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-foreground/40 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-lg text-foreground">{editId ? "Editar Produto" : "Novo Produto"}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Nome</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-border rounded py-2 px-3 text-sm bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Descrição</label>
                <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3} className="w-full border border-border rounded py-2 px-3 text-sm bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Preço (R$)</label>
                  <input required type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full border border-border rounded py-2 px-3 text-sm bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Estoque</label>
                  <input required type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="w-full border border-border rounded py-2 px-3 text-sm bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Categoria</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-border rounded py-2 px-3 text-sm bg-background focus:ring-2 focus:ring-primary focus:outline-none">
                    <option value="sandálias">Sandálias</option>
                    <option value="tênis">Tênis</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Gênero</label>
                  <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value as any })}
                    className="w-full border border-border rounded py-2 px-3 text-sm bg-background focus:ring-2 focus:ring-primary focus:outline-none">
                    <option value="feminino">Feminino</option>
                    <option value="masculino">Masculino</option>
                    <option value="unissex">Unissex</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Tamanhos (separados por vírgula)</label>
                  <input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                    className="w-full border border-border rounded py-2 px-3 text-sm bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Cores (separadas por vírgula)</label>
                  <input value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })}
                    className="w-full border border-border rounded py-2 px-3 text-sm bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
              </div>

              {/* Image upload */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Imagens</label>
                <div className="flex flex-wrap gap-3 mb-2">
                  {imagePreviews.map((src, i) => (
                    <div key={i} className="relative w-20 h-20 rounded border border-border overflow-hidden group">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeImage(i)}
                        className="absolute inset-0 bg-foreground/50 text-background opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  <label className="w-20 h-20 rounded border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                    <ImagePlus size={20} className="text-muted-foreground" />
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <button type="submit" className="btn-gold w-full">Salvar Produto</button>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50 text-left text-muted-foreground">
                <th className="py-3 px-4">Imagem</th>
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">Preço</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-4">
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded object-cover" />
                  </td>
                  <td className="py-3 px-4 font-medium text-foreground">{p.name}</td>
                  <td className="py-3 px-4">R$ {p.price.toFixed(2)}</td>
                  <td className="py-3 px-4 capitalize">{p.category}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-green-100 text-green-700">Ativo</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(p.id, p.name)} className="p-1.5 rounded hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
