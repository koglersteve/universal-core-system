import React, { useEffect, useState } from "react";

export const CategoryList: React.FC<{ onSelect: (id: string) => void }> = ({ onSelect }) => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("/lafflab/categories")
      .then(r => r.json())
      .then(setCategories);
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Categories</h2>
      {categories.map(cat => (
        <button
          key={cat.id}
          style={{ display: "block", marginBottom: 8 }}
          onClick={() => onSelect(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};
