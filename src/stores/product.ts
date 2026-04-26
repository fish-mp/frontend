import { defineStore } from "pinia";
import { ref } from "vue";
import type { Product, ProductDetail, Category, Brand } from "../types/Product";

export const useProductStore = defineStore("product", () => {
  const products = ref<Product[]>([]);
  const currentProduct = ref<ProductDetail | null>(null);
  const brands = ref<Brand[]>([]);
  const categories = ref<Category[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchProducts = async (params?: Record<string, any>) => {
    loading.value = true;
    error.value = null;
    try {
      const query = new URLSearchParams(params).toString();
      const url = `${BACKEND_URL}/api/products/${query ? `?${query}` : ""}`;
      const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Не удалось загрузить товары");
      products.value = await response.json();
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchProductById = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${BACKEND_URL}/api/products/${id}/`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Не удалось загрузить товар");
      currentProduct.value = await response.json();
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/brands/`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Не удалось загрузить бренды");
      brands.value = await response.json();
    } catch (e: any) {
      console.error(e);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/categories/`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Не удалось загрузить категории");
      categories.value = await response.json();
    } catch (e: any) {
      console.error(e);
    }
  };

  const addReview = async (productId: string, score: number, text: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/reviews/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product: productId, score, text }),
      });
      if (!response.ok) throw new Error("Не удалось оставить отзыв");
      return await response.json();
    } catch (e: any) {
      throw e;
    }
  };

  return {
    products,
    currentProduct,
    brands,
    categories,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    fetchBrands,
    fetchCategories,
    addReview,
  };
});