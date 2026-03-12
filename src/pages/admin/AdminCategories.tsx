import { useState } from "react";
import { categories } from "@/data/products";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

export default function AdminCategories() {
  const [cats, setCats] = useState(categories.map((c) => ({ ...c })));
  const [newName, setNewName] = useState("");

  const addCategory = () => {
    if (!newName.trim()) return;
    const slug = newName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
    setCats([...cats, { name: newName.trim(), slug }]);
    setNewName("");
    toast.success("Categoria adicionada!");
  };

  const removeCategory = (slug: string) => {
    setCats(cats.filter((c) => c.slug !== slug));
    toast.success("Categoria removida!");
  };

  return (
    <div>
      <h1 className="font-display text-2xl text-foreground mb-6">Categorias</h1>

      <div className="bg-card border border-border rounded-lg p-6 max-w-lg">
        <div className="flex gap-2 mb-6">
          <input
            value={newName} onChange={(e) => setNewName(e.target.value)}
            placeholder="Nome da categoria"
            className="flex-1 border border-border rounded py-2 px-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button onClick={addCategory} className="btn-gold flex items-center gap-1 text-sm"><Plus size={16} /> Adicionar</button>
        </div>

        <ul className="space-y-2">
          {cats.map((c) => (
            <li key={c.slug} className="flex items-center justify-between py-2 px-3 bg-secondary/50 rounded">
              <span className="text-sm font-medium text-foreground">{c.name}</span>
              <button onClick={() => removeCategory(c.slug)} className="text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
