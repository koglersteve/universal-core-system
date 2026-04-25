import { cache } from "react";
import { CATEGORIES, getCategoryById } from "@/lib/data";
import { Category } from "@/lib/models";

export const getCategoriesServer = cache(async (): Promise<Category[]> => {
  return CATEGORIES;
});

export const getCategoryByIdServer = cache(
  async (id: string): Promise<Category | undefined> => {
    return getCategoryById(id);
  }
);
