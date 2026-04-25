"use client";

import React from "react";
import type { Category } from "../api/LaffLabApi";
import "../styles/CategoryList.css";

type CategoryCardProps = {
  category: Category;
  onSelect?: (category: Category) => void;
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect }) => {
  return (
    <button className="lafflab-category-card" onClick={() => onSelect?.(category)}>
      <div className="lafflab-category-card__name">{category.name}</div>
      {category.description && (
        <div className="lafflab-category-card__description">{category.description}</div>
      )}
    </button>
  );
};
