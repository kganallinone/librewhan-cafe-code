import { franchiseService } from "./../../api/services/firestore/franchiseService";

export const useFranchise = () => {
  const getFranchise = async (id: string) => {
    try {
      const result = await franchiseService.get(id);
      return result;
    } catch (error) {
      console.error("Error during signup:", error);

      return null;
    }
  };

  const findFranchise = async (field: string, value: string) => {
    try {
      const result = await franchiseService.find(field, value);
      return result;
    } catch (error) {
      console.error("Error during signup:", error);

      return null;
    }
  };

  const getFranchises = async () => {
    try {
      const result = await franchiseService.getAll();

      return result;
    } catch (error) {
      console.error("Error during signup:", error);

      return null;
    }
  };

  const createFranchise = async (data: any) => {
    try {
      const result = await franchiseService.create(data);
      return result;
    } catch (error) {
      console.error("Error during signup:", error);
      return null;
    }
  };

  const updateFranchise = async (id: string, data: any) => {
    try {
      const result = await franchiseService.update(id, data);
      return result;
    } catch (error) {
      console.error("Error during signup:", error);
      return null;
    }
  };

  const deleteFranchise = async (id: string) => {
    try {
      const result = await franchiseService.delete(id);
      return result;
    } catch (error) {
      console.error("Error during signup:", error);
      return null;
    }
  };

  return {
    getFranchise,
    findFranchise,
    getFranchises,
    createFranchise,
    updateFranchise,
    deleteFranchise,
  };
};
