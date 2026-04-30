import { apiGet } from "./client";

export function fetchCategories() {
  return apiGet("/categories");
}
