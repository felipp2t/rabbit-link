import { Category } from "@/@types/category";

export async function getCategories() {
  try {
    const response = await fetch(`http://localhost:80/api/categories`);
    const categories: Category[] = await response.json();
    return categories;
  } catch (error) {
    console.error(error);
  }
}
