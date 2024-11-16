import { orderService } from "../../api/services/firestore/orderService";

export const useOrders = () => {
  const getOrder = async (id: string) => {
    try {
      const result = await orderService.get(id);
      return result;
    } catch (error) {
      console.error("Error during signup:", error);

      return null;
    }
  };

  const findOrder = async (field: string, value: string) => {
    try {
      const result = await orderService.find(field, value);
      return result;
    } catch (error) {
      console.error("Error during signup:", error);

      return null;
    }
  };

  const getOrders = async () => {
    try {
      const result = await orderService.getAll();

      return result;
    } catch (error) {
      console.error("Error during signup:", error);

      return null;
    }
  };

  const createOrder = async (data: any) => {
    try {
      const result = await orderService.create(data);
      return result;
    } catch (error) {
      console.error("Error during signup:", error);
      return null;
    }
  };

  const updateOrder = async (id: string, data: any) => {
    try {
      const result = await orderService.update(id, data);
      return result;
    } catch (error) {
      console.error("Error during signup:", error);
      return null;
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      const result = await orderService.delete(id);
      return result;
    } catch (error) {
      console.error("Error during signup:", error);
      return null;
    }
  };

  return {
    getOrder,
    findOrder,
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
  };
};
