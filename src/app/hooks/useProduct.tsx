import { productService } from "../../api/services/firestore/productService";

export const useProduct = () => {
  const getProduct = async (id: string) => {
    try {
      const result = await productService.get(id);
      return result;
    } catch (error) {
      console.error("Error during signup:", error);

      return null;
    }
  };

  const findProduct = async (field: string, value: string) => {
    try {
      const result = await productService.find(field, value);
      return result;
    } catch (error) {
      console.error("Error during signup:", error);

      return null;
    }
  };

  const getProducts = async () => {
    try {
      const result = await productService.getAll();

      return result;
    } catch (error) {
      console.error("Error during signup:", error);

      return null;
    }
  };

  const createProduct = async (data: any) => {
    try {
      const result = await productService.create(data);
      return result;
    } catch (error) {
      console.error("Error during signup:", error);
      return null;
    }
  };

  const updateProduct = async (id: string, data: any) => {
    try {
      const result = await productService.update(id, data);
      return result;
    } catch (error) {
      console.error("Error during signup:", error);
      return null;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const result = await productService.delete(id);
      return result;
    } catch (error) {
      console.error("Error during signup:", error);
      return null;
    }
  };

  return {
    getProduct,
    findProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
